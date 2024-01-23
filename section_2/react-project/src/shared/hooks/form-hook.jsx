import { useCallback, useReducer } from "react";

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

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", inputId: id, value, isValid });
  }, []);

  return [formState, inputHandler];
};
