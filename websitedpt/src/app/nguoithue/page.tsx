"use client";

import React, { useState } from "react";
import { FormSection } from "@/components/form-section";
import Link from "next/link";

// Sample data for tenants
const initialTenants = [
  {
    id: 1,
    name: "Trần Văn Minh",
    gender: "Nam",
    dob: "15/04/1995",
    idNumber: "079123456789",
     email: "tranvanminh@gmail.com",
   phone: "0912345678",
    permanentAddress: "123 Nguyễn Trãi, Quận 5, TP.HCM",
    roomId: 101,
    boardingHouse: "Dãy trọ Minh Khai",
    startDate: "01/06/2023",
  },
  {
    id: 2,
    name: "Nguyễn Thị Hoa",
    gender: "Nữ",
    dob: "22/09/1998",
    idNumber: "079987654321",
    phone: "0987654321",
    email: "nguyenthihoa@gmail.com",
    permanentAddress: "45 Lê Lợi, Quận 1, TP.HCM",
    roomId: 205,
    boardingHouse: "Dãy trọ Phạm Ngũ Lão",
    startDate: "15/03/2023",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    gender: "Nam",
    dob: "10/11/1990",
    idNumber: "079456789123",
    phone: "0909123456",
    email: "lehoangnam@gmail.com",
    permanentAddress: "67 Trần Hưng Đạo, Quận 1, TP.HCM",
    roomId: 302,
    boardingHouse: "Dãy trọ Nguyễn Huệ",
    startDate: "20/01/2023",
  },
];

// Sample data for boarding houses (for dropdown selection)
const boardingHouseOptions = [
  { id: 1, name: "Dãy trọ Minh Khai" },
  { id: 2, name: "Dãy trọ Phạm Ngũ Lão" },
  { id: 3, name: "Dãy trọ Nguyễn Huệ" },
];

export default function TenantPage() {
  const [tenants, setTenants] = useState(initialTenants);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTenant, setNewTenant] = useState({
    name: "",
    gender: "Nam",
    dob: "",
    idNumber: "",
    phone: "",
    email: "",
    permanentAddress: "",
    roomId: "",
    boardingHouse: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTenant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = tenants.length > 0 
      ? Math.max(...tenants.map(tenant => tenant.id)) + 1 
      : 1;
    
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    const newTenantData = {
      id: newId,
      name: newTenant.name,
      gender: newTenant.gender,
      dob: newTenant.dob,
      idNumber: newTenant.idNumber,
      phone: newTenant.phone,
      email: newTenant.email,
      permanentAddress: newTenant.permanentAddress,
      roomId: parseInt(newTenant.roomId) || 0,
      boardingHouse: newTenant.boardingHouse,
      startDate: formattedDate,
    };
    
    setTenants([...tenants, newTenantData]);
    setShowAddForm(false);
    setNewTenant({
      name: "",
      gender: "Nam",
      dob: "",
      idNumber: "",
      phone: "",
      email: "",
      permanentAddress: "",
      roomId: "",
      boardingHouse: "",
    });
  };

  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.idNumber.includes(searchQuery) ||
    tenant.phone.includes(searchQuery) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.boardingHouse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <FormSection
        title="Quản lý người thuê"
        subtitle={{
          regular: "Danh sách ",
          gradient: "người thuê trọ",
        }}
        description="Quản lý thông tin người thuê trọ và phân bổ phòng"
        gridOptions={{
          angle: 60,
          opacity: 0.3,
          cellSize: 40,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Danh sách người thuê</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white pr-8"
              />
              <svg
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            {showAddForm ? "Hủy" : "Thêm người thuê mới"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Thêm người thuê mới</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newTenant.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={newTenant.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={newTenant.dob}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CMND/CCCD
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={newTenant.idNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newTenant.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newTenant.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Địa chỉ thường trú
                  </label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={newTenant.permanentAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dãy trọ
                  </label>
                  <select
                    name="boardingHouse"
                    value={newTenant.boardingHouse}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Chọn dãy trọ --</option>
                    {boardingHouseOptions.map((house) => (
                      <option key={house.id} value={house.name}>
                        {house.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mã phòng
                  </label>
                  <input
                    type="text"
                    name="roomId"
                    value={newTenant.roomId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Thêm người thuê
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Họ tên</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Giới tính</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">CMND/CCCD</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Số điện thoại</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Dãy trọ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Phòng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Ngày bắt đầu</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.gender}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.idNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.phone}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.boardingHouse}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.roomId}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{tenant.startDate}</td>
                  <td className="py-3 px-4 text-sm">
                    <Link
                      href={`/nguoithue/${tenant.id}`}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                    >
                      Chi tiết
                    </Link>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTenants.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy người thuê nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </FormSection>
    </main>
  );
} 