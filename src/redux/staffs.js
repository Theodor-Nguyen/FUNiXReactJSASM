import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFFS_RENDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };

    case ActionTypes.UPDATED_STAFFS:
      const updatedStaffs = action.payload;
      return { ...state, staffs: updatedStaffs };

    default:
      return state;
  }
};
