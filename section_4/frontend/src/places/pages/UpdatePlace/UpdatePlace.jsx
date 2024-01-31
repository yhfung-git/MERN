import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import "./UpdatePlace.css";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [place, setPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await sendRequest(
        `http://localhost:5000/api/places/show/${placeId}`
      );

      if (response !== null) {
        setPlace(response.place);

        setFormData(
          {
            title: { value: response.place.title, isValid: true },
            description: { value: response.place.description, isValid: true },
          },
          true
        );
      }
    };
    fetchPlace();
  }, [setFormData, sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await sendRequest(
      `http://localhost:5000/api/places/update/${placeId}`,
      "PATCH",
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      }
    );

    if (response !== null) navigate(`/${auth.userId}/places`);
  };

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="update-place-form" onSubmit={placeUpdateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter at least 5 characters"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </>
  );
};

export default UpdatePlace;
