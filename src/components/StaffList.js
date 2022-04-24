import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  Form,
  FormGroup,
  Col,
  Row,
  Button,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
} from "reactstrap";

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
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
      nameS: "",
      modalOpen: false,
    };
    this.searchName = this.searchName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleSubmit(event) {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      salary: this.state.salary,
      image: this.state.image,
    };
    this.props.onAdd(newStaff);
    event.preventDefault();
    this.toggleModal();
  }
  validate(
    name,
    doB,
    salaryScale,
    startDate,
    department,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: "",
      overTime: "",
    };
    if (this.state.touched.name && name.length < 3)
      errors.name = "Yêu cầu nhiều hơn 3 ký tự";
    else if (this.state.touched.name && name.length > 30)
      errors.name = "Yêu cầu ít hơn 30 ký tự";
    if (this.state.touched.department && department.length < 1)
      errors.department = "Yêu cầu nhập đầy đủ thông tin";
    if (this.state.touched.salaryScale && salaryScale.length < 1)
      errors.salaryScale = "Yêu cầu nhập đầy đủ thông tin";
    if (this.state.touched.annualLeave && annualLeave.length < 1)
      errors.annualLeave = "Yêu cầu nhập đầy đủ thông tin";
    if (this.state.touched.overTime && overTime.length < 1)
      errors.overTime = "Yêu cầu nhập đầy đủ thông tin";
    if (this.state.touched.doB && doB.length < 1)
      errors.doB = "Yêu cầu nhập đầy đủ thông tin";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Yêu cầu nhập đầy đủ thông tin";
    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.salaryScale,
      this.state.startDate,
      this.state.department,
      this.state.annualLeave,
      this.state.overTime,
      this.state.salary
    );
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
            <RenderStaffItem staff={staff} />
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
            <Form onSubmit={this.handleSubmit}>
            <Row className="control-group mt-4">
                <Label htmlFor="name" md={4}>
                  Họ và tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mt-4">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    className="form-control"
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mt-4">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    className="form-control"
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mt-4">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    className="form-control"
                    type="select"
                    name="department"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onBlur={this.handleBlur("department")}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mt-4">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    className="form-control"
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mt-4">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    className="form-control"
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    className="form-control"
                    type="text"
                    id="overTime"
                    name="overTime"
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    value={this.state.overTime}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("overTime")}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </Row>
              <Button className="mt-3" type="submit" value="submit" color="primary">
                Thêm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
