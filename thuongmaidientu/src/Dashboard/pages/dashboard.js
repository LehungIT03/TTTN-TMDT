import React, { useState, useEffect } from "react";
import { users } from "../../data/userData";
import { products } from "../../data/products";
import "../Assets/dashboard.css";
import { CgUser, CgShoppingCart, CgBox, CgDollar } from "react-icons/cg";

const Dashboard = () => {
  // Simulating logged-in user - In real app, this would come from authentication
  const [currentUser, setCurrentUser] = useState(null);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Simulate getting logged in user - replace with actual auth
    setCurrentUser(users.find((user) => user.role === "admin"));

    // Calculate statistics
    setStatistics({
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: 150, // Example static data
      totalRevenue: 1500000000, // Example static data
    });
  }, []);

  const AdminDashboard = () => (
    <div className="admin-dashboard">
      <h2>Bảng điều khiển Admin</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CgUser />
          </div>
          <div className="stat-info">
            <h3>Tổng người dùng</h3>
            <p>{statistics.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CgBox />
          </div>
          <div className="stat-info">
            <h3>Tổng sản phẩm</h3>
            <p>{statistics.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CgShoppingCart />
          </div>
          <div className="stat-info">
            <h3>Tổng đơn hàng</h3>
            <p>{statistics.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CgDollar />
          </div>
          <div className="stat-info">
            <h3>Doanh thu</h3>
            <p>{statistics.totalRevenue.toLocaleString()} VND</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="recent-section">
          <h3>Đơn hàng gần đây</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>Nguyễn Văn A</td>
                <td>Áo thun nam</td>
                <td>250,000 VND</td>
                <td>
                  <span className="status-pending">Đang xử lý</span>
                </td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>Trần Thị B</td>
                <td>Điện thoại XYZ</td>
                <td>5,000,000 VND</td>
                <td>
                  <span className="status-completed">Hoàn thành</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="recent-section">
          <h3>Người dùng mới</h3>
          <div className="user-list">
            {users.slice(-3).map((user) => (
              <div key={user.id} className="user-card">
                <img src={user.avatar} alt={user.fullName} />
                <div className="user-info">
                  <h4>{user.fullName}</h4>
                  <p>{user.email}</p>
                  <span>Tham gia: {user.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CustomerDashboard = () => (
    <div className="customer-dashboard">
      <h2>Trang cá nhân</h2>

      <div className="profile-section">
        <div className="profile-header">
          <img src={currentUser?.avatar} alt={currentUser?.fullName} />
          <div className="profile-info">
            <h3>{currentUser?.fullName}</h3>
            <p>{currentUser?.email}</p>
            <p>{currentUser?.phoneNumber}</p>
          </div>
        </div>

        <div className="order-history">
          <h3>Lịch sử đơn hàng</h3>
          <table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày mua</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>20/03/2024</td>
                <td>Áo thun nam</td>
                <td>250,000 VND</td>
                <td>
                  <span className="status-completed">Hoàn thành</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="address-section">
          <h3>Địa chỉ giao hàng</h3>
          <p>{currentUser?.address}</p>
        </div>
      </div>
    </div>
  );

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      {currentUser.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </div>
  );
};

export default Dashboard;
