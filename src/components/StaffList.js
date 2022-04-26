import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  Card,  CardImg,  CardTitle,  Col,  Row,  Button,  Label,  Modal,  ModalHeader,  ModalBody} from "reactstrap";
import { Control, LocalForm, Errors} from 'react-redux-form';

const RenderStaffItem = ({ staff }) => {
  return (
    <Link to={`/staff/${staff.id}`}>
      <Card className="staff-info">
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle className="staff-name">{staff.name}</CardTitle>
      </Card>
    </Link>
  );
};

class StaffList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        nameS: "",
        modalOpen: false,
    }
    this.searchName = this.searchName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* Set State nameS Function */
  searchName(event) {
    event.preventDefault();
    const staffName = event.target.staffName.value;
    this.setState({ nameS: staffName });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  handleSubmit(values) {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };
    this.props.addStaff(newStaff);
    this.toggleModal();
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
            <RenderStaffItem staff={staff} 
            />
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
            <button className="btn btn-success" onClick={this.toggleModal}>
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
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
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
              <Button className="mt-3" type="submit" value="submit" color="primary">
                Thêm
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
