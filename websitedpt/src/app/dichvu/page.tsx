"use client";

import React, { useState } from "react";
import { FormSection } from "@/components/form-section";
import Link from "next/link";

// Sample data for services
const initialServices = [
  {
    id: 1,
    name: "Điện",
    unit: "kWh",
    unitPrice: "3.500đ",
    description: "Giá điện sinh hoạt",
    isMandatory: true,
    applyToAll: true,
  },
  {
    id: 2,
    name: "Nước",
    unit: "m³",
    unitPrice: "15.000đ",
    description: "Giá nước sinh hoạt",
    isMandatory: true,
    applyToAll: true,
  },
  {
    id: 3,
    name: "Internet",
    unit: "Tháng",
    unitPrice: "100.000đ",
    description: "Wifi tốc độ cao",
    isMandatory: false,
    applyToAll: true,
  },
  {
    id: 4,
    name: "Dọn phòng",
    unit: "Lần",
    unitPrice: "50.000đ",
    description: "Dịch vụ dọn dẹp phòng hàng tuần",
    isMandatory: false,
    applyToAll: false,
  },
  {
    id: 5,
    name: "Giặt ủi",
    unit: "Kg",
    unitPrice: "20.000đ",
    description: "Dịch vụ giặt ủi quần áo",
    isMandatory: false,
    applyToAll: false,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    unit: "",
    unitPrice: "",
    description: "",
    isMandatory: false,
    applyToAll: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox inputs separately
    if (type === "checkbox") {
      setNewService(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setNewService(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = services.length > 0 
      ? Math.max(...services.map(service => service.id)) + 1 
      : 1;
    
    // Format price to have thousand separators and đ symbol
    const formattedPrice = formatCurrencyString(newService.unitPrice);
    
    const serviceData = {
      id: newId,
      name: newService.name,
      unit: newService.unit,
      unitPrice: formattedPrice,
      description: newService.description,
      isMandatory: newService.isMandatory,
      applyToAll: newService.applyToAll,
    };
    
    setServices([...services, serviceData]);
    setShowAddForm(false);
    setNewService({
      name: "",
      unit: "",
      unitPrice: "",
      description: "",
      isMandatory: false,
      applyToAll: false,
    });
  };

  // Helper to format currency string
  const formatCurrencyString = (value: string) => {
    if (!value) return "0đ";
    const numValue = parseFloat(value.replace(/[^0-9]/g, ""));
    return numValue.toLocaleString("vi-VN") + "đ";
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <main>
      <FormSection
        title="Quản lý dịch vụ"
        subtitle={{
          regular: "Danh sách ",
          gradient: "dịch vụ và tiện ích",
        }}
        description="Quản lý các dịch vụ cung cấp cho người thuê trọ"
        gridOptions={{
          angle: 60,
          opacity: 0.3,
          cellSize: 40,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Danh sách dịch vụ</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            {showAddForm ? "Hủy" : "Thêm dịch vụ mới"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Thêm dịch vụ mới</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tên dịch vụ
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Đơn vị tính
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={newService.unit}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Đơn giá (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="unitPrice"
                    value={newService.unitPrice}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mô tả
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newService.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isMandatory"
                      name="isMandatory"
                      checked={newService.isMandatory}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isMandatory" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Bắt buộc
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="applyToAll"
                      name="applyToAll"
                      checked={newService.applyToAll}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="applyToAll" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Áp dụng cho tất cả
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Thêm dịch vụ
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tên dịch vụ</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Đơn vị tính</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Đơn giá</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Mô tả</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Bắt buộc</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Áp dụng tất cả</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{service.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{service.unit}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{service.unitPrice}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{service.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.isMandatory 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {service.isMandatory ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.applyToAll 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {service.applyToAll ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link
                      href={`/dichvu/${service.id}`}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                    >
                      Chỉnh sửa
                    </Link>
                    <button 
                      onClick={() => deleteService(service.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Áp dụng dịch vụ cho phòng trọ</h4>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-md">
            <p className="text-sm">
              Để áp dụng dịch vụ cho một phòng trọ cụ thể, vui lòng vào trang chi tiết phòng trọ và thêm dịch vụ từ đó.
              Các dịch vụ có tùy chọn "Áp dụng tất cả" sẽ tự động áp dụng cho tất cả các phòng trọ.
            </p>
          </div>
        </div>
      </FormSection>
    </main>
  );
} 