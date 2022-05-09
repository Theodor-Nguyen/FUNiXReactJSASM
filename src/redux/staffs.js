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

    case ActionTypes.ADD_STAFF:
      var staff = action.payload;
      return { ...state, staffs: state.staffs.concat(staff) };

    case ActionTypes.STAFFS_PATCHED:
      var updatedStaff = action.payload;
      var newStaffs = state.staffs
        .filter((staff) => staff.id !== updatedStaff.id)
        .push(updatedStaff);
      return { ...state, staffs: newStaffs };

    default:
      return state;
  }
};