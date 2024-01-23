import { useCallback, useReducer } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "../../../shared/components/FormElements/Input/Input";
import "./NewPlace.css";

const formReducer = (state, action) => {
  let formIsValid = true;

  switch (action.type) {
    case "INPUT_CHANGE":
      for (const inputId in state.inputs) {
        inputId === action.inputId
          ? (formIsValid = formIsValid && action.isValid)
          : (formIsValid = formIsValid && state.inputs[inputId].isValid);
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: { value: "", isValid: false },
      address: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", inputId: id, value, isValid });
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Form Submitted:", formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
  );
};

export default NewPlace;
