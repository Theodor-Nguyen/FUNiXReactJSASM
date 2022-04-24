import React, { Component } from "react";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

/* const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  }
} */

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    }
    this.addStaff = this.addStaff.bind(this);
  }

addStaff(staff) {
const id = Math.floor(Math.random()*1000 + 1)
const newStaff = { id, ...staff};
this.setState({
  staffs: [...this.state.staffs, newStaff]
});
}  

  render() {

  const StaffWithID = ({ match }) => {
    return (
      <StaffDetail
        staff={this.state.staffs.filter((item) => item.id === parseInt(match.params.staffID, 10))[0]}
      />
    );
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/staff" component={() => <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />} />
        <Route exact path="/department" component={() => <Department departments={this.state.departments} />} />
        <Route path="/staff/:staffID" component={StaffWithID} />
        <Route path="/salary" component={() => <Salary staffs={this.state.staffs} />} />
        <Redirect to="/staff" />
      </Switch>
      <Footer />
    </div>
  );
 }
}

export default (Main);
