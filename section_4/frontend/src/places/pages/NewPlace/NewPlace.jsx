import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "../../../shared/components/FormElements/Input/Input";
import "./NewPlace.css";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload/ImageUpload";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const { title, description, address, image } = formState.inputs;
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("address", address.value);
    formData.append("image", image.value);

    const response = await sendRequest(
      "http://localhost:5000/api/places/new",
      "POST",
      formData
    );

    if (response !== null) navigate(`/${auth.userId}/places`);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Enter a title..."
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          placeholder="Enter an address..."
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="Enter a description..."
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at least 5 characters"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
