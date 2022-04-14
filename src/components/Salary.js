import React, { useState } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

const basicSalary = 3000000;
const hourlySalary = 200000 / 8;

function RenderSalary({ staff }) {
  return (
    <Card>
      <CardTitle className="p-3 bg-white rounded m-2">{staff.name}</CardTitle>
      <CardBody>
        <CardText>Mã nhân viên: {staff.id}</CardText>
        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
        <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
        <CardText className="bg-light p-2 shadow">Lương: {(staff.salaryScale * basicSalary + staff.overTime*hourlySalary).toFixed(0)}</CardText>
      </CardBody>
    </Card>
  );
}

const Salary = (props) => {

  const [sortSalary,setSortSalary]=useState(false)

  const salary = props.staffs.sort((a,b)=> sortSalary ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale).map((staff) => {
    return(
        <div  key={staff.id} className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
            <RenderSalary staff={staff} />
        </div>
    )
});

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-5 mt-3">
          <h3>Bảng Lương</h3>
        </div>
        <div className="col-5 mt-3">
        <button className="btn btn-primary btn-salary" onClick={()=>setSortSalary(!sortSalary)}>Sắp xếp theo Hệ số lương</button>
        </div>
        <div className="col-12">
        <hr />
        </div>

      </div>
      <div className="row shadow mb-3 mt-3">{salary}</div>
    </div>
  );
};

export default Salary;
