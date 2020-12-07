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

const setStateWithLogger = (setState) => (update) => {
  return setState((prevState) => {
    const next = typeof update === "function" ? update(prevState) : update;
    console.log({
      previousState: prevState,
      nextState: next,
    });

    return next;
  });
};

export function useList(initialState) {
  const [list, setList] = React.useState(initialState);

  return [list, makeListThunks(setStateWithLogger(setList))];
}

export function useForm({ onSubmit, initialValues, validations }) {
  const [values, setValues] = React.useState(initialValues);
  const isValid = R.allPass(
    R.map(([field, rule]) => R.propSatisfies(rule, field), validations)
  )(values);

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
    handleOnChange: (field) =>
      R.pipe(R.path(["target", "value"]), R.set(R.lensProp(field)), setValues),
  };
}
