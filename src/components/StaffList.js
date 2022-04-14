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
  const [searchName, setSearchName] = useState("");
  const [sortId, setSortID] = useState(false);

  const staffList = props.staffs.sort((a,b) => sortId ? a.id - b.id : b.id - a.id)
  .filter((staff) => {
      if(searchName === "")
          return staff;
      else if(staff.name.toLowerCase().includes(searchName.toLowerCase()))
          return staff;        
  }).map((staff) => {
      return(
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-3 mb-3">
              <RenderStaffItem staff={staff} />
          </div>
      );
  });

  //Render giao diện Stafflist
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-4 mt-3">
          <h3>Nhân Viên</h3>
        </div>
        {/* Nút bấm chức năng sắp xếp theo mã số nhân viên */}
        <div className="col-4 mt-3">
          <button
            className="btn btn-success"
            onClick={() => setSortID(!sortId)}
          >
            Sắp xếp theo MSNV
          </button>
        </div>
        {/* Ô tìm kiếm theo dữ liệu  nhân viên */}
        <div className="col-4 mt-3">
          <input
            className="form-control"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Tìm kiếm nhân viên ..."
          />
        </div>
      </div>
      <div className="col-12">
        <hr />
      </div>

      <div className="row shadow mb-3 mt-3">
      {staffList}
      </div>
    </div>
  );
}

export default StaffList;
