import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import StaffList from './components/StaffListComponent';

class App extends Component {
render() {
  return (
    <div>
     <Navbar dark color="primary">
       <div className='container'>
         <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
       </div>
     </Navbar>
     <StaffList/>
    </div>
  );
 }
}

export default App;