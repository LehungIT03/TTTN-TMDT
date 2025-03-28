import React from "react";
import "../Css/sidebar.css";
import { Link } from "react-router-dom";

const Sidebar =() =>{
    return(
        <aside className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/dashboard">Thống kê</Link></li>
                <li><Link to="/productAdmin">Quản lý sản phẩm</Link></li>
                <li><Link to="/orderAdmin">Quản lý đơn hàng</Link></li>
                <li><Link to="/userAdmin">Người dùng</Link></li>
            </ul>
        </aside>
  
    );
}
export default Sidebar;