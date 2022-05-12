import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const RenderDepartment = ({ dept }) => {
  return (
    <Link to={`/departments/${dept.id}`}>
      <Card>
        <CardTitle className="m-2">
          <strong>{dept.name}</strong>
        </CardTitle>
        <CardBody>
          <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

const Department = (props) => {
  const departments = props.departments.map((dept) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={dept.id}>
        <RenderDepartment dept={dept} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          <h3>Phòng Ban</h3>
          <hr />
        </div>
      </div>
      <div className="row shadow m-3">{departments}</div>
    </div>
  );
};

export default Department;
