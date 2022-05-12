import React, { useState } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const basicSalary = 3000000;
const hourlySalary = 200000 / 8;

function RenderSalary({ obj }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Stagger in>
        <Card>
          <CardTitle className="p-3 bg-white rounded m-2">{obj.name}</CardTitle>
          <Fade in>
            <CardBody>
              <CardText>Mã nhân viên: {obj.id}</CardText>
              <CardText>Hệ số lương: {obj.salaryScale}</CardText>
              <CardText>Số giờ làm thêm: {obj.overTime}</CardText>
              <CardText className="bg-light p-2 shadow">
                Lương:{" "}
                {(
                  obj.salaryScale * basicSalary +
                  obj.overTime * hourlySalary
                ).toFixed(0)}
              </CardText>
            </CardBody>
          </Fade>
        </Card>
      </Stagger>
    </FadeTransform>
  );
}

const Salary = (props) => {
  const [sortSalary, setSortSalary] = useState(false);

  const salary = props.salary
    .sort((a, b) =>
      sortSalary ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale
    )
    .map((obj) => {
      return (
        <div key={obj.id} className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
          <RenderSalary obj={obj} />
        </div>
      );
    });

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-5 mt-3">
          <h3>Bảng Lương</h3>
        </div>
        <div className="col-5 mt-3">
          <button
            className="btn btn-primary btn-salary"
            onClick={() => setSortSalary(!sortSalary)}
          >
            Sắp xếp theo Hệ số lương
          </button>
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
