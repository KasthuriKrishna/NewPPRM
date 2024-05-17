import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import Table1 from './Table1';
import Table2 from './Table2';
import pic from './Acp.jpg';
import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css'

function Customers() {
  
  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <Space size={20} direction="vertical">
      <h1>RESOURCES ALLOCATION</h1>
      <Table1/>
      <h1>RESOURCES ACROSS VARIOUS SUB STATIONS</h1>
      <img src={pic} width="100%" />
    </Space>

    </div>
    <AppFooter />
  </div>
   
  );
}
export default Customers;