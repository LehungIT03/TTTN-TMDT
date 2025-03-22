import React, { useState, useEffect } from "react";
import { users } from "../../data/userData";
import { products } from "../../data/products";
import "../Assets/dashboard.css";
<<<<<<< HEAD
import { CgUser, CgShoppingCart, CgBox, CgDollar } from "react-icons/cg";
=======
import Sidebar from "../../Components/layout/sidebar";

>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)

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

<<<<<<< HEAD
  const AdminDashboard = () => (
    <div className="admin-dashboard">
      <h2>Bảng điều khiển Admin</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CgUser />
          </div>
          <div className="stat-info">
=======
  const itemsPerPage = 5; // Số sản phẩm hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Lọc danh sách sản phẩm cho trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
      <div className="dashboard-container">
      <Sidebar/>
      <main className="dashboard-content">
        <h1>Thông tin chung</h1>
        <div className="stats">
          <div className="card">
            <h3>Doanh thu</h3>
            <p>{statistics.totalRevenue.toLocaleString()} VND</p>
          </div>
          <div className="card">
            <h3>Tổng sản phẩm</h3>
            <p>{statistics.totalProducts}</p>
          </div>
          <div className="card">
            <h3>Tổng đơn hàng</h3>
            <p>{statistics.totalOrders}</p>
          </div>
          <div className="card">
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
            <h3>Tổng người dùng</h3>
            <p>{statistics.totalUsers}</p>
          </div>
        </div>

<<<<<<< HEAD
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
=======
        <div className="dashboard-sections">
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
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
<<<<<<< HEAD

=======
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
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
<<<<<<< HEAD
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
=======
      
      <div className="recent-section">
          <h3>Sản phẩm </h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Hình ảnh</th>
                <th>Loại</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product)=>(
               <tr key={product.id}>
               <td>{product.id}</td>
               <td>{product.name}</td>
               <td>{product.price.toLocaleString()} VNĐ</td>
               <td><img src={product.image} alt={product.name} width="50"/></td>
               <td>{product.category}</td>
               <td>
                 {product.inventory}
               </td>
             </tr>))}
            </tbody>
          </table>
           {/* Nút chuyển trang */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
        </div>
    </main>
    
      </div>
  );

  // const CustomerDashboard = () => (
  //   <div className="customer-dashboard">
  //     <h2>Trang cá nhân</h2>

  //     <div className="profile-section">
  //       <div className="profile-header">
  //         <img src={currentUser?.avatar} alt={currentUser?.fullName} />
  //         <div className="profile-info">
  //           <h3>{currentUser?.fullName}</h3>
  //           <p>{currentUser?.email}</p>
  //           <p>{currentUser?.phoneNumber}</p>
  //         </div>
  //       </div>

  //       <div className="order-history">
  //         <h3>Lịch sử đơn hàng</h3>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Mã đơn hàng</th>
  //               <th>Ngày mua</th>
  //               <th>Sản phẩm</th>
  //               <th>Tổng tiền</th>
  //               <th>Trạng thái</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td>#1001</td>
  //               <td>20/03/2024</td>
  //               <td>Áo thun nam</td>
  //               <td>250,000 VND</td>
  //               <td>
  //                 <span className="status-completed">Hoàn thành</span>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>

  //       <div className="address-section">
  //         <h3>Địa chỉ giao hàng</h3>
  //         <p>{currentUser?.address}</p>
  //       </div>
  //     </div>
  //   </div>
  // );

  // if (!currentUser) return <div>Loading...</div>;

  // return (
  //   <div className="dashboard-container">
  //     {currentUser.role === "admin" ? (
  //       <AdminDashboard />
  //     ) : (
  //       <CustomerDashboard />
  //     )}
  //   </div>
  // );
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
};

export default Dashboard;
