import React, { Component } from "react";
import StaffList from "./StaffsList";
import StaffDetail from "./StaffDetail";
import Department from "./Departments";
import DepartmentDetail from "./DepartmentDetail";
import Salary from "./StaffSalary";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepartments,
  fetchStaffSalary,
  postNewStaff,
  patchStaffInfo,
  deleteStaff,
} from "../redux/ActionCreators";
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsalary: state.staffsalary,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchStaffSalary: () => {
    dispatch(fetchStaffSalary());
  },
  postNewStaff: (newStaff) => {
    dispatch(postNewStaff(newStaff));
  },
  patchStaffInfo: (infoStaff) => {
    dispatch(patchStaffInfo(infoStaff));
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffSalary();
  }

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (item) => item.id === parseInt(match.params.staffID, 10)
            )[0]
          }
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          depts={this.props.departments.departments}
          patchStaffInfo={this.props.patchStaffInfo}
        />
      );
    };

    const DeptWithID = ({ match }) => {
      return (
        <DepartmentDetail
          staffs={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.deptID
          )}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          dept={this.props.departments.departments.find(
            (item) => item.id === match.params.deptID
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route
                exact
                path="/staffs"
                component={() => (
                  <StaffList
                    staffs={this.props.staffs.staffs}
                    staffsLoading={this.props.staffs.isLoading}
                    staffsErrMess={this.props.staffs.errMess}
                    postNewStaff={this.props.postNewStaff}
                    deleteStaff={this.props.deleteStaff}
                  />
                )}
              />
              <Route
                exact
                path="/departments"
                component={() => (
                  <Department
                    departments={this.props.departments.departments}
                  />
                )}
              />
              <Route path="/staffs/:staffID" component={StaffWithID} />
              <Route path="/departments/:deptID" component={DeptWithID} />
              <Route
                path="/staffsalary"
                component={() => (
                  <Salary salary={this.props.staffsalary.staffsalary} />
                )}
              />
              <Redirect to="/staffs" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
