import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import Anekal from './Anekal'

import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css'
import TableComponent from "./ReportTable";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);
  const [selectedUnit, setSelectedUnit] = useState('Anekal PS');

  const handleChange = (e) => {
    setSelectedUnit(e.target.value);
  };
  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <Space size={20} direction="vertical">
      <Typography.Title level={4}>Unit Analysis</Typography.Title>
      <div>
      <h2>ANEKAL PS</h2>
      <div>
       <Anekal />
      </div>
      
    </div>
    </Space>
    
    </div>
    <AppFooter />
  </div>

   
  );
}
export default Customers;