import React, { useState } from "react";
import Sidebar from "../../Components/layout/sidebar";
import "../Assets/orderAdmin.css";

// Dữ liệu đơn hàng mẫu
const initialOrders = [
  { id: 1001, customer: "Nguyễn Văn A", product: "Áo thun nam", total: 250000, status: "pending" },
  { id: 1002, customer: "Trần Thị B", product: "Điện thoại XYZ", total: 5000000, status: "completed" },
  { id: 1003, customer: "Lê Văn C", product: "Laptop ABC", total: 15000000, status: "pending" },
  { id: 1004, customer: "Phạm Thị D", product: "Giày thể thao", total: 800000, status: "completed" },
];

const OrderAdmin = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState(initialOrders);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => (order.id === id ? { ...order, status: newStatus } : order)));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="recent-section">
        <h3>Quản lý đơn hàng</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.total.toLocaleString()} VND</td>
                <td>
                  <span className={order.status === "pending" ? "status-pending" : "status-completed"}>
                    {order.status === "pending" ? "Đang xử lý" : "Hoàn thành"}
                  </span>
                </td>
                <td>
                  {order.status === "pending" ? (
                    <button className="complete-btn" onClick={() => updateStatus(order.id, "completed")}>
                      Hoàn thành
                    </button>
                  ) : (
                    <button className="pending-btn" onClick={() => updateStatus(order.id, "pending")}>
                      Đặt lại
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nút chuyển trang */}
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Trang trước
          </button>
          <span>Trang {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderAdmin;
