import React, { useState } from "react";
import {
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Loading } from "./Loading";

function RenderStaff({ staff, isLoading, errMess, dept }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-md-4">
            <CardImg width="100%" src={staff.image} alt={staff.name} />
          </div>
          <div className="col-12 col-md-8">
            <CardTitle>Họ và tên: {staff.name}</CardTitle>
            <CardText>
              Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Phòng ban: {dept.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>

            <div className="col-3 col-md-3 mt-3">
              <button className="btn btn-info">
                <span className="fa fa-pencil-square-o fa-lg"></span> Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staff.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row mb-3">
          <RenderStaff
            staff={props.staff}
            dept={props.depts.find(
              (dept) => dept.id === props.staff.departmentId
            )}
            isLoading={props.staffsLoading}
            errMess={props.staffsErrMess}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
