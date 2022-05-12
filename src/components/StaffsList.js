import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  Col,
  Row,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./Loading";
import { FadeTransform } from "react-animation-components";

const RenderStaffItem = ({ staff, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <Link to={`/staffs/${staff.id}`}>
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Card className="staff-info">
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardTitle className="staff-name">{staff.name}</CardTitle>
          </Card>
        </FadeTransform>
      </Link>
    );
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

// Container Component
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "/assets/images/alberto.png",
      nameS: "",
      modalOpen: false,
    };
    this.searchName = this.searchName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDeptId = this.getDeptId.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  //Get departmentId
  getDeptId(value) {
    let deptWithId = "";
    switch (value) {
      case "Sale":
        deptWithId = "Dept01";
        break;
      case "HR":
        deptWithId = "Dept02";
        break;
      case "Marketing":
        deptWithId = "Dept03";
        break;
      case "IT":
        deptWithId = "Dept04";
        break;
      case "Finance":
        deptWithId = "Dept05";
        break;

      default:
        deptWithId = "Dept01";
        break;
    }
    return deptWithId;
  }
  //Set State nameS Function
  searchName(event) {
    event.preventDefault();
    const staffName = event.target.staffName.value;
    this.setState({ nameS: staffName });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  handleSubmit(values) {
    let deptId = this.getDeptId(values.department);
    var newStaff = {
      name: values.name,
      doB: values.doB,
      salaryScale: values.salaryScale,
      startDate: values.startDate,
      departmentId: deptId,
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      image: this.state.image,
    };
    this.props.postNewStaff(newStaff);
    this.toggleModal();
  }

  handleDelete(id) {
    if (window.confirm("Do you really want to delete this staff?!")) {
      this.props.deleteStaff(id);
    } else return;
  }

  render() {
    /* Map staffList */
    const staffList = this.props.staffs
      .filter((staff) => {
        if (this.state.nameS === "") return staff;
        else if (
          staff.name.toLowerCase().includes(this.state.nameS.toLowerCase())
        )
          return staff;
      })
      .map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-3 mb-3">
            <RenderStaffItem
              staff={staff}
              isLoading={this.props.staffsLoading}
              errMess={this.props.staffsErrMess}
            />
            <Row className="justify-content-center">
              <Button
                className="mt-3"
                color="danger"
                onClick={() => this.handleDelete(staff.id)}
              >
                Delete
              </Button>
            </Row>
          </div>
        );
      });

    //Render giao diện Stafflist
    return (
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-10 col-md-3 mt-3">
            <h3>Nhân Viên</h3>
          </div>
          <div className="col-2 col-md-2 mt-3">
            <button
              className="btn btn-success btn-add"
              onClick={this.toggleModal}
            >
              <span className="fa fa-plus fa-lg"></span>
            </button>
          </div>

          {/* Ô tìm kiếm theo dữ liệu nhân viên */}
          <div className="col-12 col-md-6 mt-3">
            <form onSubmit={this.searchName} className="form-group row">
              <div className="col-10 col-md-10">
                <input
                  type="text"
                  name="staffName"
                  className="form-control"
                  placeholder="Tìm kiếm nhân viên..."
                />
              </div>
              <div className="col-2 col-md-2">
                <button className="btn btn-success" type="submit">
                  Tìm
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>

        <div className="row shadow mb-3 mt-3">{staffList}</div>

        {/* Modal Add New Staff */}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
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
                    defaultValue={"default"}
                    validators={{
                      required,
                    }}
                  >
                    <option value={"default"} disabled>
                      Choose an option
                    </option>
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
              <Row className="justify-content-center">
                <Button
                  className="mt-3"
                  type="submit"
                  value="submit"
                  color="primary"
                >
                  Thêm
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
