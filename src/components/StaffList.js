import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle } from "reactstrap";

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

function StaffList(props) {
  
  const [column, setColumn] = useState("col-6 col-md-4 col-lg-2 mt-3 mb-3");

  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className={column}>
        <RenderStaffItem staff={staff} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          <h3>Nhân Viên</h3>
          <hr />
        </div>
      </div>
      <div className="row shadow mb-3 mt-3">
      {staffList}
      </div>
    </div>
  );
}

export default StaffList;
