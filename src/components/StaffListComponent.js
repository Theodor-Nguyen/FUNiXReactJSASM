import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridDefault: "col-12 col-md-6 col-lg-4 mt-2",
      selectedStaff: null,
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }
  onColumnSelect(col) {
    this.setState({ gridDefault: col });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className={this.state.gridDefault}>
          <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardBody>
              <CardTitle>Họ và tên: {staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {staff.department.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="col-12 col-md-6 col-lg-4 mt-3">
          <p>Bấm vào tên nhân viên để xem thông tin.</p>
        </div>
      );
    }
  }

  render() {
    const staffsList = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className={this.state.gridDefault}>
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row m-3">
          <button
            className="btn btn-success mr-3"
            onClick={() => this.onColumnSelect("col-md-2 mt-2")}
          >
            6 cột
          </button>
          <button
            className="btn btn-success mr-3"
            onClick={() => this.onColumnSelect("col-md-3 mt-2")}
          >
            4 cột
          </button>
          <button
            className="btn btn-success mr-3"
            onClick={() => this.onColumnSelect("col-md-4 mt-2")}
          >
            3 cột
          </button>
          <button
            className="btn btn-success mr-3"
            onClick={() => this.onColumnSelect("col-md-6 mt-2")}
          >
            2 cột
          </button>
          <button
            className="btn btn-success mr-3"
            onClick={() => this.onColumnSelect("col-md-12 mt-2")}
          >
            1 cột
          </button>
        </div>
        <div className="row">{staffsList}</div>
        <div className="row">{this.renderStaff(this.state.selectedStaff)}</div>
      </div>
    );
  }
}

export default StaffList;
