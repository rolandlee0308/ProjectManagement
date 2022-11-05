import createDataContext from "./createDataContext";

const globalReducer = (state: any, action: any) => {
  switch (action.type) {
    case "toggleColor":
      return { ...state, color: state.color === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

const toggleColor = (dispatch: Function) => () => {
  dispatch({ type: "toggleColor" });
};

export const { Provider, Context } = createDataContext(
  globalReducer,
  { toggleColor },
  { color: "light" }
);
