import * as ActionTypes from "./ActionTypes";

export const addStaff = (name, doB, salaryScale, salary, startDate, department, annualLeave, overTime, image) => ({
  type: ActionTypes.ADD_STAFF,
  payload: {
    name: name,
    doB: doB,
    salaryScale: salaryScale,
    startDate: startDate,
    department: department,
    annualLeave: annualLeave,
    overTime: overTime,
    salary: salary,
    image: image,
  },
});
