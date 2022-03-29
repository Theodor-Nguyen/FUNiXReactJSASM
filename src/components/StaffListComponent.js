import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from "reactstrap";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridDefault: "col-12 col-md-6 col-lg-4 mt-2"
        };
    }
    
    render() {
        const staffsList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className={this.state.gridDefault}>
                    <Card>
                        <CardBody>
                            <CardTitle>{staff.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                {staffsList}
                </div>
                <p>Bấm vào tên nhân viên để xem thông tin.</p>
            </div>
        );
    }
}

export default StaffList;