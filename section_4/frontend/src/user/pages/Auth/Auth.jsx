import { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload/ImageUpload";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      delete formState.inputs.name;
      delete formState.inputs.image;
      setFormData(
        { ...formState.inputs },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsLoginMode((preMode) => !preMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      const response = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        { "Content-Type": "application/json" }
      );

      if (response !== null) auth.login(response.userId, response.token);
    } else {
      const formData = new FormData();
      const { name, email, password, image } = formState.inputs;

      formData.append("name", name.value);
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("image", image.value);

      const response = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        formData
      );

      if (response !== null) auth.login(response.userId, response.token);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login" : "Signup"}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <ImageUpload
                id="image"
                center
                onInput={inputHandler}
                errorText="Please provide an image"
              />
              <Input
                id="name"
                element="input"
                type="text"
                label="Your Name"
                placeholder="Enter your name..."
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name"
                onInput={inputHandler}
              />
            </>
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            placeholder="Enter your email..."
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            placeholder="Enter your password..."
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter at least 8 characters"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
