import React, { Component } from "react";
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

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {

  const StaffWithID = ({ match }) => {
    return (
      <StaffDetail
        staff={this.props.staffs.filter((item) => item.id === parseInt(match.params.staffID, 10))[0]}
      />
    );
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/staff" component={() => <StaffList staffs={this.props.staffs} />} />
        <Route exact path="/department" component={() => <Department departments={this.props.departments} />} />
        <Route path="/staff/:staffID" component={StaffWithID} />
        <Route path="/salary" component={() => <Salary staffs={this.props.staffs} />} />
        <Redirect to="/staff" />
      </Switch>
      <Footer />
    </div>
  );
 }
}

export default withRouter(connect(mapStateToProps)(Main));
