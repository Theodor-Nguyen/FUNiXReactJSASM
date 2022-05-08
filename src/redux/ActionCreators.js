import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// Add New Staff
export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postNewStaff = (newStaff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addStaff(response)))
    .catch((error) => {
      console.log("Post comments ", error.message);
      alert("Your submit could not be posted\nError: " + error.message);
    });
};

// Fetch Staffs
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((reponse) => reponse.json())
    .then((staffs) => dispatch(staffsRender(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const staffsRender = (staffs) => ({
  type: ActionTypes.STAFFS_RENDER,
  payload: staffs,
});

// Fetch Departments
export const fetchDepartments = () => (dispatch) => {
  dispatch(deptsLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((reponse) => reponse.json())
    .then((depts) => dispatch(deptsRender(depts)))
    .catch((error) => dispatch(deptsFailed(error.message)));
};

export const deptsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const deptsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const deptsRender = (depts) => ({
  type: ActionTypes.DEPARTMENTS_RENDER,
  payload: depts,
});

// Fetch Salary
export const fetchStaffSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((reponse) => reponse.json())
    .then((salary) => dispatch(salaryRender(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.STAFFSALARY_LOADING,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.STAFFSALARY_FAILED,
  payload: errmess,
});

export const salaryRender = (salary) => ({
  type: ActionTypes.STAFFSALARY_RENDER,
  payload: salary,
});
