"use client";

import React, { useState } from "react";
import { FormSection } from "@/components/form-section";
import Link from "next/link";

// Sample data for invoices
const initialInvoices = [
  {
    id: 1,
    invoiceNumber: "HD001/06/2023",
    tenantName: "Trần Văn Minh",
    roomId: 101,
    boardingHouse: "Dãy trọ Minh Khai",
    month: "06/2023",
    issueDate: "25/05/2023",
    dueDate: "05/06/2023",
    rentAmount: "1.500.000đ",
    electricityAmount: "350.000đ",
    waterAmount: "120.000đ",
    internetAmount: "100.000đ",
    otherAmount: "50.000đ",
    totalAmount: "2.120.000đ",
    status: "Đã thanh toán",
    paymentDate: "03/06/2023",
  },
  {
    id: 2,
    invoiceNumber: "HD002/06/2023",
    tenantName: "Nguyễn Thị Hoa",
    roomId: 205,
    boardingHouse: "Dãy trọ Phạm Ngũ Lão",
    month: "06/2023",
    issueDate: "26/05/2023",
    dueDate: "05/06/2023",
    rentAmount: "1.200.000đ",
    electricityAmount: "280.000đ",
    waterAmount: "100.000đ",
    internetAmount: "100.000đ",
    otherAmount: "0đ",
    totalAmount: "1.680.000đ",
    status: "Đã thanh toán",
    paymentDate: "02/06/2023",
  },
  {
    id: 3,
    invoiceNumber: "HD003/06/2023",
    tenantName: "Lê Hoàng Nam",
    roomId: 302,
    boardingHouse: "Dãy trọ Nguyễn Huệ",
    month: "06/2023",
    issueDate: "27/05/2023",
    dueDate: "05/06/2023",
    rentAmount: "1.400.000đ",
    electricityAmount: "420.000đ",
    waterAmount: "150.000đ",
    internetAmount: "100.000đ",
    otherAmount: "100.000đ",
    totalAmount: "2.170.000đ",
    status: "Chưa thanh toán",
    paymentDate: null,
  },
];

// Sample data for tenants, boarding houses, and contracts (for dropdown selection)
const tenantOptions = [
  { id: 1, name: "Trần Văn Minh", roomId: 101, boardingHouse: "Dãy trọ Minh Khai" },
  { id: 2, name: "Nguyễn Thị Hoa", roomId: 205, boardingHouse: "Dãy trọ Phạm Ngũ Lão" },
  { id: 3, name: "Lê Hoàng Nam", roomId: 302, boardingHouse: "Dãy trọ Nguyễn Huệ" },
];

export default function InvoicePage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: "",
    tenantId: "",
    month: "",
    issueDate: "",
    dueDate: "",
    rentAmount: "",
    electricityAmount: "",
    waterAmount: "",
    internetAmount: "",
    otherAmount: "",
    otherDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = invoices.length > 0 
      ? Math.max(...invoices.map(invoice => invoice.id)) + 1 
      : 1;
    
    const selectedTenant = tenantOptions.find(tenant => tenant.id.toString() === newInvoice.tenantId);
    
    if (!selectedTenant) return;
    
    // Calculate total amount
    const rent = parseFloat(newInvoice.rentAmount.replace(/[^0-9]/g, "")) || 0;
    const electricity = parseFloat(newInvoice.electricityAmount.replace(/[^0-9]/g, "")) || 0;
    const water = parseFloat(newInvoice.waterAmount.replace(/[^0-9]/g, "")) || 0;
    const internet = parseFloat(newInvoice.internetAmount.replace(/[^0-9]/g, "")) || 0;
    const other = parseFloat(newInvoice.otherAmount.replace(/[^0-9]/g, "")) || 0;
    const total = rent + electricity + water + internet + other;
    
    const invoiceData = {
      id: newId,
      invoiceNumber: newInvoice.invoiceNumber,
      tenantName: selectedTenant.name,
      roomId: selectedTenant.roomId,
      boardingHouse: selectedTenant.boardingHouse,
      month: newInvoice.month,
      issueDate: formatDateString(newInvoice.issueDate),
      dueDate: formatDateString(newInvoice.dueDate),
      rentAmount: formatCurrencyString(newInvoice.rentAmount),
      electricityAmount: formatCurrencyString(newInvoice.electricityAmount),
      waterAmount: formatCurrencyString(newInvoice.waterAmount),
      internetAmount: formatCurrencyString(newInvoice.internetAmount),
      otherAmount: formatCurrencyString(newInvoice.otherAmount),
      totalAmount: formatCurrencyString(total.toString()),
      status: "Chưa thanh toán",
      paymentDate: null,
    };
    
    setInvoices([...invoices, invoiceData]);
    setShowAddForm(false);
    setNewInvoice({
      invoiceNumber: "",
      tenantId: "",
      month: "",
      issueDate: "",
      dueDate: "",
      rentAmount: "",
      electricityAmount: "",
      waterAmount: "",
      internetAmount: "",
      otherAmount: "",
      otherDescription: "",
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
    if (!value) return "0đ";
    const numValue = parseFloat(value.replace(/[^0-9]/g, ""));
    return numValue.toLocaleString("vi-VN") + "đ";
  };

  // Filter invoices based on search query and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.boardingHouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.month.includes(searchQuery);
    
    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "paid") return matchesSearch && invoice.status === "Đã thanh toán";
    if (statusFilter === "unpaid") return matchesSearch && invoice.status === "Chưa thanh toán";
    
    return matchesSearch;
  });

  const markAsPaid = (id: number) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    setInvoices(invoices.map(invoice => 
      invoice.id === id 
        ? { ...invoice, status: "Đã thanh toán", paymentDate: formattedDate } 
        : invoice
    ));
  };

  return (
    <main>
      <FormSection
        title="Quản lý hóa đơn"
        subtitle={{
          regular: "Danh sách ",
          gradient: "hóa đơn thanh toán",
        }}
        description="Quản lý hóa đơn tiền phòng và các dịch vụ"
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
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Danh sách hóa đơn</h3>
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tất cả</option>
              <option value="paid">Đã thanh toán</option>
              <option value="unpaid">Chưa thanh toán</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            {showAddForm ? "Hủy" : "Thêm hóa đơn mới"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Thêm hóa đơn mới</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mã hóa đơn
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={newInvoice.invoiceNumber}
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
                    name="tenantId"
                    value={newInvoice.tenantId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Chọn người thuê --</option>
                    {tenantOptions.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name} - Phòng {tenant.roomId}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tháng
                  </label>
                  <input
                    type="month"
                    name="month"
                    value={newInvoice.month}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ngày lập hóa đơn
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={newInvoice.issueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hạn thanh toán
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newInvoice.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiền thuê phòng (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="rentAmount"
                    value={newInvoice.rentAmount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiền điện (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="electricityAmount"
                    value={newInvoice.electricityAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiền nước (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="waterAmount"
                    value={newInvoice.waterAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiền Internet (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="internetAmount"
                    value={newInvoice.internetAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Chi phí khác (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="otherAmount"
                    value={newInvoice.otherAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mô tả chi phí khác
                  </label>
                  <input
                    type="text"
                    name="otherDescription"
                    value={newInvoice.otherDescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Tạo hóa đơn
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Mã hóa đơn</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Người thuê</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Phòng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tháng</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Hạn thanh toán</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tổng tiền</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Trạng thái</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{invoice.invoiceNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{invoice.tenantName}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{invoice.roomId}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{invoice.month}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{invoice.dueDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{invoice.totalAmount}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "Đã thanh toán" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Link
                      href={`/hoadon/${invoice.id}`}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                    >
                      Chi tiết
                    </Link>
                    {invoice.status === "Chưa thanh toán" && (
                      <button 
                        onClick={() => markAsPaid(invoice.id)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mr-3"
                      >
                        Thanh toán
                      </button>
                    )}
                    <button className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300">
                      In
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy hóa đơn nào
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