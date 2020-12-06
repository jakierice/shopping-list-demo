import React from "react";
import * as R from "ramda";

export function makeListThunks(lazyFn) {
  return {
    newItem: R.pipe(R.append, R.thunkify(lazyFn)),

    withoutItem: R.pipe(R.propEq("key"), R.reject, R.thunkify(lazyFn)),

    withoutLastItem: () => lazyFn(R.dropLast(1)),

    clear: () => lazyFn([]),
  };
}

export function useList(initialState) {
  const [list, setList] = React.useState(initialState);

  return [list, makeListThunks(setList)];
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
