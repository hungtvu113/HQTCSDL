"use client";

import { FormSection } from "@/components/form-section";
import { useState } from "react";
import Link from "next/link";

// Interface cho dãy trọ
interface DayTro {
  id: string;
  name: string;
  address: string;
  description: string;
  features: string[];
  images: string[];
  priceRange: string;
  availableRooms: number;
  rating: number;
}

// Mock data
const mockDayTros: DayTro[] = [
  {
    id: "1",
    name: "Dãy Trọ Minh Khang",
    address: "123 Đường Nguyễn Văn A, Phường 5, TP. Trà Vinh",
    description: "Dãy trọ cao cấp với đầy đủ tiện nghi, an ninh 24/7, phù hợp cho sinh viên và người đi làm.",
    features: ["Wifi miễn phí", "Camera an ninh", "Có chỗ để xe", "Điện nước riêng", "Gần chợ và trường học"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2940&auto=format&fit=crop"
    ],
    priceRange: "1.500.000đ - 2.000.000đ",
    availableRooms: 5,
    rating: 4.5
  },
  {
    id: "2",
    name: "Khu Trọ Phúc An",
    address: "456 Đường Lê Lợi, Phường 2, TP. Trà Vinh",
    description: "Khu trọ yên tĩnh, sạch sẽ, thoáng mát với không gian xanh, thích hợp cho gia đình nhỏ.",
    features: ["Sân vườn", "Bảo vệ", "Chỗ để xe rộng rãi", "Có sẵn nội thất cơ bản", "Gần siêu thị"],
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2940&auto=format&fit=crop"
    ],
    priceRange: "2.000.000đ - 2.500.000đ",
    availableRooms: 3,
    rating: 4.7
  },
  {
    id: "3",
    name: "Dãy Trọ Tân Thành",
    address: "789 Đường Nguyễn Thị Minh Khai, Phường 8, TP. Trà Vinh",
    description: "Dãy trọ mới xây, thiết kế hiện đại với các phòng rộng rãi, đầy đủ ánh sáng tự nhiên.",
    features: ["Phòng rộng rãi", "Cửa sổ lớn", "Bếp riêng", "Nhà vệ sinh riêng", "Gần trung tâm thành phố"],
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2940&auto=format&fit=crop"
    ],
    priceRange: "1.800.000đ - 2.200.000đ",
    availableRooms: 7,
    rating: 4.2
  }
];

export default function DayTroPage() {
  const [selectedDayTro, setSelectedDayTro] = useState<DayTro | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    desiredDate: "",
    message: ""
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleRegisterClick = (dayTro: DayTro) => {
    setSelectedDayTro(dayTro);
    setIsRegisterOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Validation
    if (!formData.fullName || !formData.phone || !formData.email) {
      setFormError("Vui lòng điền đầy đủ thông tin cá nhân!");
      return;
    }

    // Mock submission success
    setFormSuccess(`Đã đăng ký xem phòng tại ${selectedDayTro?.name} thành công! Chúng tôi sẽ liên hệ với bạn sớm.`);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSuccess("");
      setIsRegisterOpen(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        desiredDate: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isRegisterOpen && selectedDayTro ? (
        <FormSection
          title="ĐĂNG KÝ XEM PHÒNG"
          subtitle={{
            regular: "Đăng ký xem phòng tại ",
            gradient: selectedDayTro.name,
          }}
          description="Điền thông tin của bạn để đăng ký xem phòng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất."
          gridOptions={{
            angle: 65,
            opacity: 0.4,
            cellSize: 50,
            lightLineColor: "#4a4a4a",
            darkLineColor: "#2a2a2a",
          }}
        >
          <div className="space-y-6">
            {formSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
                {formSuccess}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                    {formError}
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="desiredDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Ngày mong muốn đến xem
                  </label>
                  <input
                    type="date"
                    id="desiredDate"
                    name="desiredDate"
                    value={formData.desiredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Nhập yêu cầu hoặc câu hỏi của bạn"
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                  >
                    Đăng ký xem phòng
                  </button>
                </div>
              </form>
            )}
          </div>
        </FormSection>
      ) : (
        <>
          {/* Heading */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <h1 className="text-3xl font-bold mb-4">Dãy Trọ</h1>
              <p className="text-lg text-purple-100 max-w-3xl">
                Khám phá các dãy trọ chất lượng cao với đầy đủ tiện nghi, an ninh 24/7 và vị trí thuận tiện.
                Đặt lịch xem phòng ngay hôm nay để tìm kiếm nơi ở phù hợp với nhu cầu của bạn.
              </p>
            </div>
          </div>

          {/* Lightbox for selected image */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <div className="relative max-w-5xl w-full">
                <button 
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img src={selectedImage} alt="Phòng trọ" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 gap-10">
              {mockDayTros.map((dayTro) => (
                <div key={dayTro.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/3">
                      <div className="h-full relative">
                        <img 
                          className="h-64 md:h-full w-full object-cover cursor-pointer" 
                          src={dayTro.images[0]} 
                          alt={dayTro.name}
                          onClick={() => handleImageClick(dayTro.images[0])}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <div className="flex items-center">
                            <div className="text-yellow-400 flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(dayTro.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-1 text-white">{dayTro.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{dayTro.name}</h2>
                          <p className="text-gray-600 dark:text-gray-300 flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {dayTro.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-600 dark:text-purple-400 font-semibold">{dayTro.priceRange}</div>
                          <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                            {dayTro.availableRooms} phòng trống
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{dayTro.description}</p>
                      
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tiện ích</h3>
                        <div className="flex flex-wrap gap-2">
                          {dayTro.features.map((feature, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hình ảnh</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {dayTro.images.map((image, index) => (
                            <img 
                              key={index} 
                              src={image} 
                              alt={`Hình ảnh ${index + 1}`} 
                              className="h-20 w-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => handleImageClick(image)}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleRegisterClick(dayTro)}
                          className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          Đăng ký xem phòng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}