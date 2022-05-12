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

    case ActionTypes.ADD_NEWSTAFF:
      const addStaffs = action.payload;
      return { ...state, staffs: addStaffs };

    case ActionTypes.UPDATED_STAFFS:
      const updatedStaffs = action.payload;
      return { ...state, staffs: updatedStaffs };

    case ActionTypes.DELETED_STAFFS:
      const deletedStaffs = action.payload;
      return { ...state, staffs: deletedStaffs };

    default:
      return state;
  }
};
