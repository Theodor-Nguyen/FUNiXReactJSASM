import React, { useState } from "react";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import Header from "./Header";
import Footer from "./Footer";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';


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
        <Route exact path="/staff" component={() => <StaffList staffs={staffList} />} />
        <Route exact path="/department" component={() => <Department departments={departments} />} />
        <Route path="/staff/:staffID" component={StaffWithID} />
        <Route path="/salary" component={() => <Salary staffs={staffList} />} />
        <Redirect to="/staff" />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
