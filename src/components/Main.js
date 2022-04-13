import React, { useState } from "react";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Header from "./Header";
import Footer from "./Footer";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";

function Main() {

  const [staffList, setStaffList] = useState(STAFFS);
  const [departments, setDepartments] = useState(DEPARTMENTS);

  const StaffWithID = ({ match }) => {
    return (
      <StaffDetail
        staff={staffList.filter((item) => item.id === parseInt(match.params.staffID, 10))[0]}
      />
    );
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/staffs" component={() => <StaffList staffs={staffList} />} />
        <Route path="/staffs/:staffID" component={StaffWithID} />
        <Redirect to="/staffs" />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
