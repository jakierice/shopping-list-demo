import React from "react";
import * as R from "ramda";

export function useList(initialState) {
  const [list, setList] = React.useState(initialState);

  const thunks = {
    newItem: (item) => () => setList(R.append(item)),

    withoutItem: (itemKey) => () =>
      setList(R.filter((item) => item.key !== itemKey)),

    withoutLastItem: () => setList(R.dropLast(1)),

    clear: () => setList([]),
  };

  return [list, thunks];
}

export function useForm({ onSubmit, initialValues, validations }) {
  const [values, setValues] = React.useState(initialValues);
  const isValid = R.allPass(validations)(values);

  const resetForm = () => {
    setValues(initialValues);
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (isValid) {
      onSubmit(values)();
      resetForm();
    }
  }

  return {
    values,
    isValid,
    handleSubmit,
    handleOnChange: (field) => (e) =>
      setValues(R.set(R.lensProp(field), e.target.value)),
  };
}
