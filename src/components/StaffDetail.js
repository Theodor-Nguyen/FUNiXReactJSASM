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
import { Control, LocalForm } from "react-redux-form";
import dateFormat from "dateformat";
import { Loading } from "./Loading";

function RenderStaff({
  staff,
  isLoading,
  errMess,
  dept,
  depts,
  patchStaffInfo,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState("/assets/images/alberto.png");

  const toggleModal = () => setModalOpen(!modalOpen);
  const getDeptId = (value, depts) => {
    const deptWithId = depts.find((dept) => dept.name === value);
    return deptWithId.id;
  };

  const handleUpdate = (values) => {
    var infoStaff = {
      id: staff.id,
      name: values.name,
      doB: values.doB,
      salaryScale: values.salaryScale,
      startDate: values.startDate,
      departmentId: getDeptId(values.department, depts),
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      image: image,
    };
    patchStaffInfo(infoStaff);
    toggleModal();
  };

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
                      >
                        <option>Sale</option>
                        <option>HR</option>
                        <option>Marketing</option>
                        <option>IT</option>
                        <option>Finance</option>
                      </Control.select>
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
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Button
                      className="mt-3"
                      type="submit"
                      value="submit"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
}

//Container Component
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
            depts={props.depts}
            dept={props.depts.find(
              (dept) => dept.id === props.staff.departmentId
            )}
            isLoading={props.staffsLoading}
            errMess={props.staffsErrMess}
            patchStaffInfo={props.patchStaffInfo}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
