// Inspired by "Reducing Boilerplate" chapter in redux documentation
// http://redux.js.org/docs/recipes/ReducingBoilerplate.html

const identity = a => a;
const argsTransformer = propNames => function resultFn() {
  const [...args] = arguments;
  return propNames.reduce((acc, p, idx) => {
    const result = acc;
    result[p] = args[idx];
    return result;
  }, {});
};

export const createAction = (type, paramList) => {
  if (Array.isArray(paramList) && paramList.length) {
    const transformer = argsTransformer(paramList);
    return function action() {
      return { type, payload: transformer(...arguments) };
    };
  }
  return (payload) => ({ type, payload });
};

export const createReducer = (initialState, handlers) =>
  (state = initialState, { type, payload }) =>
    (handlers[type] || identity)(state, payload);
