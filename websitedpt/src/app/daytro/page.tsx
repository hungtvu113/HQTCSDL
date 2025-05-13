"use client";

import React, { useState } from "react";
import { FormSection } from "@/components/form-section";
import Link from "next/link";

// Sample data for boarding houses
const initialBoardingHouses = [
  {
    id: 1,
    name: "Dãy trọ Minh Khai",
    address: "123 Minh Khai, Phường 5, Trà Vinh",
    totalRooms: 15,
    occupiedRooms: 12,
    ownerName: "Nguyễn Văn A",
    contactPhone: "0123456789",
    monthlyRevenue: "35.000.000đ",
  },
  {
    id: 2,
    name: "Dãy trọ Phạm Ngũ Lão",
    address: "45 Phạm Ngũ Lão, Phường 7, Trà Vinh",
    totalRooms: 10,
    occupiedRooms: 8,
    ownerName: "Trần Thị B",
    contactPhone: "0987654321",
    monthlyRevenue: "24.000.000đ",
  },
  {
    id: 3,
    name: "Dãy trọ Nguyễn Huệ",
    address: "78 Nguyễn Huệ, Phường 1, Trà Vinh",
    totalRooms: 20,
    occupiedRooms: 18,
    ownerName: "Lê Văn C",
    contactPhone: "0369852147",
    monthlyRevenue: "42.000.000đ",
  },
];

export default function BoardingHousePage() {
  const [boardingHouses, setBoardingHouses] = useState(initialBoardingHouses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBoardingHouse, setNewBoardingHouse] = useState({
    name: "",
    address: "",
    totalRooms: "",
    ownerName: "",
    contactPhone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBoardingHouse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = boardingHouses.length > 0 
      ? Math.max(...boardingHouses.map(house => house.id)) + 1 
      : 1;
    
    const newHouse = {
      id: newId,
      name: newBoardingHouse.name,
      address: newBoardingHouse.address,
      totalRooms: parseInt(newBoardingHouse.totalRooms) || 0,
      occupiedRooms: 0,
      ownerName: newBoardingHouse.ownerName,
      contactPhone: newBoardingHouse.contactPhone,
      monthlyRevenue: "0đ",
    };
    
    setBoardingHouses([...boardingHouses, newHouse]);
    setShowAddForm(false);
    setNewBoardingHouse({
      name: "",
      address: "",
      totalRooms: "",
      ownerName: "",
      contactPhone: "",
    });
  };

  return (
    <main>
      <FormSection
        title="Quản lý dãy trọ"
        subtitle={{
          regular: "Danh sách ",
          gradient: "dãy trọ",
        }}
        description="Quản lý thông tin các dãy trọ, số phòng và tình trạng"
        gridOptions={{
          angle: 60,
          opacity: 0.3,
          cellSize: 40,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Danh sách dãy trọ</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            {showAddForm ? "Hủy" : "Thêm dãy trọ mới"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Thêm dãy trọ mới</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tên dãy trọ
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newBoardingHouse.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newBoardingHouse.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số phòng tổng
                  </label>
                  <input
                    type="number"
                    name="totalRooms"
                    value={newBoardingHouse.totalRooms}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tên chủ trọ
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={newBoardingHouse.ownerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số điện thoại liên hệ
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={newBoardingHouse.contactPhone}
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
                  Thêm dãy trọ
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tên dãy trọ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Địa chỉ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Số phòng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Đã thuê</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Chủ trọ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Liên hệ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Doanh thu tháng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {boardingHouses.map((house) => (
                <tr key={house.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.address}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.totalRooms}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.occupiedRooms}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.ownerName}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.contactPhone}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{house.monthlyRevenue}</td>
                  <td className="py-3 px-4 text-sm">
                    <Link
                      href={`/daytro/${house.id}`}
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
            </tbody>
          </table>
        </div>
      </FormSection>
    </main>
  );
} 