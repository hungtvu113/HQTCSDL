"use client";

import React, { useState } from "react";
import { FormSection } from "@/components/form-section";
import Link from "next/link";

// Sample data for contracts
const initialContracts = [
  {
    id: 1,
    contractNumber: "HD001/2023",
    tenantName: "Trần Văn Minh",
    roomId: 101,
    boardingHouse: "Dãy trọ Minh Khai",
    startDate: "01/06/2023",
    endDate: "01/06/2024",
    deposit: "4.500.000đ",
    monthlyRent: "1.500.000đ",
    status: "Đang hiệu lực",
  },
  {
    id: 2,
    contractNumber: "HD002/2023",
    tenantName: "Nguyễn Thị Hoa",
    roomId: 205,
    boardingHouse: "Dãy trọ Phạm Ngũ Lão",
    startDate: "15/03/2023",
    endDate: "15/03/2024",
    deposit: "3.600.000đ",
    monthlyRent: "1.200.000đ",
    status: "Đang hiệu lực",
  },
  {
    id: 3,
    contractNumber: "HD003/2023",
    tenantName: "Lê Hoàng Nam",
    roomId: 302,
    boardingHouse: "Dãy trọ Nguyễn Huệ",
    startDate: "20/01/2023",
    endDate: "20/01/2024",
    deposit: "4.200.000đ",
    monthlyRent: "1.400.000đ",
    status: "Đang hiệu lực",
  },
];

// Sample data for tenants and boarding houses (for dropdown selection)
const tenantOptions = [
  { id: 1, name: "Trần Văn Minh" },
  { id: 2, name: "Nguyễn Thị Hoa" },
  { id: 3, name: "Lê Hoàng Nam" },
  { id: 4, name: "Phạm Thị Lan" },
  { id: 5, name: "Vũ Quang Huy" },
];

const boardingHouseOptions = [
  { id: 1, name: "Dãy trọ Minh Khai" },
  { id: 2, name: "Dãy trọ Phạm Ngũ Lão" },
  { id: 3, name: "Dãy trọ Nguyễn Huệ" },
];

export default function ContractPage() {
  const [contracts, setContracts] = useState(initialContracts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newContract, setNewContract] = useState({
    contractNumber: "",
    tenantName: "",
    roomId: "",
    boardingHouse: "",
    startDate: "",
    endDate: "",
    deposit: "",
    monthlyRent: "",
    additionalTerms: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewContract((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = contracts.length > 0 
      ? Math.max(...contracts.map(contract => contract.id)) + 1 
      : 1;
    
    const contractData = {
      id: newId,
      contractNumber: newContract.contractNumber,
      tenantName: newContract.tenantName,
      roomId: parseInt(newContract.roomId) || 0,
      boardingHouse: newContract.boardingHouse,
      startDate: formatDateString(newContract.startDate),
      endDate: formatDateString(newContract.endDate),
      deposit: formatCurrencyString(newContract.deposit),
      monthlyRent: formatCurrencyString(newContract.monthlyRent),
      status: "Đang hiệu lực",
    };
    
    setContracts([...contracts, contractData]);
    setShowAddForm(false);
    setNewContract({
      contractNumber: "",
      tenantName: "",
      roomId: "",
      boardingHouse: "",
      startDate: "",
      endDate: "",
      deposit: "",
      monthlyRent: "",
      additionalTerms: "",
    });
  };

  // Helper to format date string from ISO to dd/mm/yyyy
  const formatDateString = (isoDateString: string) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Helper to format currency string
  const formatCurrencyString = (value: string) => {
    if (!value) return "";
    const numValue = parseFloat(value.replace(/[^0-9]/g, ""));
    return numValue.toLocaleString("vi-VN") + "đ";
  };

  const filteredContracts = contracts.filter(contract => 
    contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.boardingHouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <FormSection
        title="Quản lý hợp đồng"
        subtitle={{
          regular: "Danh sách ",
          gradient: "hợp đồng thuê trọ",
        }}
        description="Quản lý thông tin hợp đồng, thời hạn và giá trị"
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
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Danh sách hợp đồng</h3>
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
            {showAddForm ? "Hủy" : "Thêm hợp đồng mới"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Thêm hợp đồng mới</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mã hợp đồng
                  </label>
                  <input
                    type="text"
                    name="contractNumber"
                    value={newContract.contractNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Người thuê
                  </label>
                  <select
                    name="tenantName"
                    value={newContract.tenantName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Chọn người thuê --</option>
                    {tenantOptions.map((tenant) => (
                      <option key={tenant.id} value={tenant.name}>
                        {tenant.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dãy trọ
                  </label>
                  <select
                    name="boardingHouse"
                    value={newContract.boardingHouse}
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
                    value={newContract.roomId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={newContract.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={newContract.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiền đặt cọc (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="deposit"
                    value={newContract.deposit}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiền thuê hàng tháng (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="monthlyRent"
                    value={newContract.monthlyRent}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Điều khoản bổ sung
                  </label>
                  <textarea
                    name="additionalTerms"
                    value={newContract.additionalTerms}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Tạo hợp đồng
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Mã hợp đồng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Người thuê</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Dãy trọ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Phòng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Bắt đầu</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Kết thúc</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Giá thuê</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Trạng thái</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.contractNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.tenantName}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.boardingHouse}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.roomId}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.startDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.endDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{contract.monthlyRent}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contract.status === "Đang hiệu lực" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link
                      href={`/hopdong/${contract.id}`}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                    >
                      Chi tiết
                    </Link>
                    <button className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 mr-3">
                      In
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
              {filteredContracts.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy hợp đồng nào
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