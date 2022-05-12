import * as ActionTypes from "./ActionTypes";

export const StaffSalary = (
  state = { isLoading: true, errMess: null, staffsalary: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFFSALARY_RENDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffsalary: action.payload,
      };

    case ActionTypes.STAFFSALARY_LOADING:
      return { ...state, isLoading: true, errMess: null, staffsalary: [] };

    case ActionTypes.STAFFSALARY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffsalary: [],
      };

    default:
      return state;
  }
};
