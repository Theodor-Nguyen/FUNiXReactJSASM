import React, { useState } from "react";
import {
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Row,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import { Loading } from "./Loading";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

function RenderStaff({ staff, isLoading, errMess, dept }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const getDeptId = (value, depts) => {
    const deptWithId = depts.find((dept) => dept.name === value);
    return deptWithId.id;
  };

  const handleUpdate = (values) => {};

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
              <button className="btn btn-info" onClick={toggleModal}>
                <span className="fa fa-pencil-square-o fa-lg"></span> Cập nhật
              </button>
            </div>

            {/* Update info staff */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>
                Cập nhật thông tin nhân viên
              </ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => handleUpdate(values)}>
                  <Row className="form-group mt-4">
                    <Label htmlFor="name" md={4}>
                      Họ và tên
                    </Label>
                    <Col md={8}>
                      <Control.text
                        model=".name"
                        className="form-control"
                        id="name"
                        name="name"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(30),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                          minLength: "Yêu cầu nhiều hơn 2 ký tự. ",
                          maxLength: "Yêu cầu ít hơn 30 ký tự. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mt-4">
                    <Label htmlFor="doB" md={4}>
                      Ngày sinh
                    </Label>
                    <Col md={8}>
                      <Control.text
                        type="date"
                        model=".doB"
                        className="form-control"
                        id="doB"
                        name="doB"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".doB"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mt-4">
                    <Label htmlFor="startDate" md={4}>
                      Ngày vào công ty
                    </Label>
                    <Col md={8}>
                      <Control.text
                        model=".startDate"
                        className="form-control"
                        type="date"
                        id="startDate"
                        name="startDate"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".startDate"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mt-4">
                    <Label htmlFor="department" md={4}>
                      Phòng ban
                    </Label>
                    <Col md={8}>
                      <Control.select
                        model=".department"
                        className="form-control"
                        id="department"
                        name="department"
                        validators={{
                          required,
                        }}
                      >
                        <option>Sale</option>
                        <option>HR</option>
                        <option>Marketing</option>
                        <option>IT</option>
                        <option>Finance</option>
                      </Control.select>
                      <Errors
                        className="text-danger"
                        model=".department"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mt-4">
                    <Label htmlFor="salaryScale" md={4}>
                      Hệ số lương
                    </Label>
                    <Col md={8}>
                      <Control.text
                        className="form-control"
                        model=".salaryScale"
                        id="salaryScale"
                        name="salaryScale"
                        validators={{
                          required,
                          isNumber,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".salaryScale"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                          isNumber: "Yêu cầu nhập đúng định dạng số. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mt-4">
                    <Label htmlFor="annualLeave" md={4}>
                      Số ngày nghỉ còn lại
                    </Label>
                    <Col md={8}>
                      <Control.text
                        className="form-control"
                        model=".annualLeave"
                        id="annualLeave"
                        name="annualLeave"
                        validators={{
                          required,
                          isNumber,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".annualLeave"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                          isNumber: "Yêu cầu nhập đúng định dạng số. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mt-4">
                    <Label htmlFor="overTime" md={4}>
                      Số ngày đã làm thêm
                    </Label>
                    <Col md={8}>
                      <Control.text
                        className="form-control"
                        model=".overTime"
                        id="overTime"
                        name="overTime"
                        validators={{
                          required,
                          isNumber,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".overTime"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập đầy đủ thông tin. ",
                          isNumber: "Yêu cầu nhập đúng định dạng số. ",
                        }}
                      />
                    </Col>
                  </Row>
                  <Button
                    className="mt-3"
                    type="submit"
                    value="submit"
                    color="primary"
                  >
                    Thêm
                  </Button>
                </LocalForm>
              </ModalBody>
            </Modal>
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
            dept={
              props.depts.filter(
                (dept) => dept.id === props.staff.departmentId
              )[0]
            }
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
