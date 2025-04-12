import React, { useState } from "react";
import { users as initialUsers } from "../../data/userData";
import Sidebar from "./sidebar";
import "../Assets/userAdmin.css";

const UserManager = () => {
  const itemsPerPage = 5;
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    avatar: "",
    createdAt: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (user) => setEditingUser(user);
  const handleDelete = (id) => setUsers(users.filter((user) => user.id !== id));
  const handleSave = () => {
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  const handleAddUser = () => {
    const newId = users.length + 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setNewUser({ fullName: "", email: "", avatar: "", createdAt: "" });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="recent-section">
        <h3>Quản lý người dùng</h3>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Ngày tham gia</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={user.fullName} width="40" />
                </td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(user)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trang trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>

        {/* Form chỉnh sửa */}
        {editingUser && (
          <div className="overlay" onClick={() => setEditingUser(null)}>
            <div className="edit-form" onClick={(e) => e.stopPropagation()}>
              <h3>Chỉnh sửa người dùng</h3>
              <input
                type="text"
                value={editingUser.fullName}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, fullName: e.target.value })
                }
              />
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
              <button onClick={handleSave}>Lưu</button>
              <button onClick={() => setEditingUser(null)}>Hủy</button>
            </div>
          </div>
        )}

        {/* Form thêm người dùng */}
        <div className="add-user-form">
          <h3>Thêm người dùng mới</h3>
          <input
            type="text"
            placeholder="Họ tên"
            value={newUser.fullName}
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button onClick={handleAddUser}>Thêm</button>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
