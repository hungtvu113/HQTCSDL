"use client";

import React, { useState } from "react";
import { FormSection } from "@/components/form-section";

const ReportPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("06/2023");
  const [selectedReport, setSelectedReport] = useState("doanhthu");

  // Sample data for reports
  const revenueData = [
    { name: "Phòng trọ", value: 45000000 },
    { name: "Điện", value: 10500000 },
    { name: "Nước", value: 3700000 },
    { name: "Internet", value: 3000000 },
    { name: "Dịch vụ khác", value: 2800000 },
  ];

  const occupancyData = [
    { name: "Dãy trọ Minh Khai", occupied: 12, total: 15 },
    { name: "Dãy trọ Phạm Ngũ Lão", occupied: 8, total: 10 },
    { name: "Dãy trọ Nguyễn Huệ", occupied: 18, total: 20 },
  ];

  const overviewData = {
    totalBoarding: 3,
    totalRooms: 45,
    occupiedRooms: 38,
    totalTenants: 42,
    monthlyRevenue: "65.000.000đ",
    pendingPayments: "8.500.000đ",
    contractsEndingSoon: 4,
  };

  const monthlyComparisonData = [
    { month: "01/2023", revenue: 58000000 },
    { month: "02/2023", revenue: 56000000 },
    { month: "03/2023", revenue: 59000000 },
    { month: "04/2023", revenue: 61000000 },
    { month: "05/2023", revenue: 63000000 },
    { month: "06/2023", revenue: 65000000 },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate percentage
  const calculatePercentage = (occupied: number, total: number) => {
    return ((occupied / total) * 100).toFixed(0) + "%";
  };

  return (
    <main>
      <FormSection
        title="Thống kê và báo cáo"
        subtitle={{
          regular: "Thông tin tổng quan và ",
          gradient: "báo cáo chi tiết",
        }}
        description="Xem thống kê doanh thu, tình trạng phòng và phân tích dữ liệu"
        gridOptions={{
          angle: 60,
          opacity: 0.3,
          cellSize: 40,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      >
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tổng số phòng</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {overviewData.occupiedRooms}/{overviewData.totalRooms}
              </p>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${(overviewData.occupiedRooms / overviewData.totalRooms) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tỷ lệ lấp đầy: {((overviewData.occupiedRooms / overviewData.totalRooms) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tổng số người thuê</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{overviewData.totalTenants}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Trung bình: {(overviewData.totalTenants / overviewData.occupiedRooms).toFixed(1)} người/phòng
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Doanh thu tháng</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{overviewData.monthlyRevenue}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {overviewData.pendingPayments} chưa thanh toán
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Hợp đồng sắp hết hạn</h3>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{overviewData.contractsEndingSoon}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Trong 30 ngày tới
              </p>
            </div>
          </div>

          {/* Report Selector */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Báo cáo chi tiết</h3>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="doanhthu">Doanh thu theo loại</option>
                  <option value="lapday">Tỷ lệ lấp đầy</option>
                  <option value="sosanh">So sánh theo tháng</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="01/2023">Tháng 1/2023</option>
                  <option value="02/2023">Tháng 2/2023</option>
                  <option value="03/2023">Tháng 3/2023</option>
                  <option value="04/2023">Tháng 4/2023</option>
                  <option value="05/2023">Tháng 5/2023</option>
                  <option value="06/2023">Tháng 6/2023</option>
                </select>
              </div>
            </div>

            {/* Dynamic Report Content */}
            <div className="mt-4">
              {selectedReport === "doanhthu" && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Doanh thu theo loại - Tháng {selectedMonth}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Loại doanh thu</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Số tiền</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tỷ lệ</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Biểu đồ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {revenueData.map((item, index) => {
                          const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
                          const percentage = (item.value / totalRevenue) * 100;
                          
                          return (
                            <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                              <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.name}</td>
                              <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{formatCurrency(item.value)}</td>
                              <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{percentage.toFixed(1)}%</td>
                              <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div 
                                    className="bg-purple-600 h-2.5 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-semibold">
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">Tổng cộng</td>
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                            {formatCurrency(revenueData.reduce((sum, item) => sum + item.value, 0))}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">100%</td>
                          <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedReport === "lapday" && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Tỷ lệ lấp đầy theo dãy trọ - Tháng {selectedMonth}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {occupancyData.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-800 dark:text-white mb-2">{item.name}</h5>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Đã thuê: {item.occupied}/{item.total}</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{calculatePercentage(item.occupied, item.total)}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              (item.occupied / item.total) > 0.8 
                                ? 'bg-green-600' 
                                : (item.occupied / item.total) > 0.5 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${(item.occupied / item.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport === "sosanh" && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    So sánh doanh thu 6 tháng gần nhất
                  </h4>
                  <div className="h-64">
                    <div className="h-full flex items-end space-x-2">
                      {monthlyComparisonData.map((item, index) => {
                        const maxRevenue = Math.max(...monthlyComparisonData.map(d => d.revenue));
                        const height = `${(item.revenue / maxRevenue) * 100}%`;
                        const isCurrentMonth = item.month === selectedMonth;
                        
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div className="w-full h-full flex items-end justify-center">
                              <div 
                                className={`w-full ${isCurrentMonth ? 'bg-purple-600' : 'bg-purple-400 dark:bg-purple-800'} rounded-t`}
                                style={{ height }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item.month}</div>
                            <div className="text-xs font-semibold text-gray-800 dark:text-gray-300">
                              {formatCurrency(item.revenue)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Export and Print Section */}
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors">
              In báo cáo
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              Xuất Excel
            </button>
          </div>
        </div>
      </FormSection>
    </main>
  );
};

export default ReportPage; 