import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Loading } from "./Loading";
import { Link } from "react-router-dom";

const RenderStaffDept = ({ staff, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <Link to={`/staffs/${staff.id}`}>
        <Card className="staff-info">
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardTitle className="staff-name">{staff.name}</CardTitle>
        </Card>
      </Link>
    );
};

//Container Component
const DepartmentDetail = (props) => {
  console.log(props);
  const staffsDept = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-3 mb-3">
        <RenderStaffDept
          staff={staff}
          isLoading={props.staffsLoading}
          errMess={props.staffsErrMess}
        />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/departments">Phòng Ban</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dept.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dept.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">{staffsDept}</div>
    </div>
  );
};

export default DepartmentDetail;
