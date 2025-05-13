import { HeroSection } from "@/components/hero-section-dark";
import Link from "next/link";

// Component Hero Section Demo
function HeroSectionDemo() {
  return (
    <HeroSection
      title="Hệ Thống Quản Lý Nhà Trọ"
      subtitle={{
        regular: "Quản lý nhà trọ ",
        gradient: "hiệu quả, đơn giản",
      }}
      description="Giải pháp toàn diện giúp quản lý dãy trọ, người thuê, hợp đồng, hóa đơn và dịch vụ một cách tối ưu."
      ctaText="Đăng ký ngay"
      ctaHref="/daytro"
      bottomImage={{
        light: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop",
        dark: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop",
      }}
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
  )
}

// Định nghĩa interface cho FeatureCard
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

// Định nghĩa interface cho RoomCard
interface RoomCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  area: string;
  rating: number;
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSectionDemo />
      
      <section className="py-16 px-4 md:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Tính Năng Quản Lý</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🏠"
            title="Quản Lý Dãy Trọ" 
            description="Quản lý thông tin dãy trọ, số phòng, tình trạng sử dụng và doanh thu."
            link="/daytro"
          />
          <FeatureCard 
            icon="👨‍👩‍👧‍👦"
            title="Quản Lý Người Thuê" 
            description="Quản lý thông tin chi tiết người thuê, phân bổ phòng và theo dõi thời gian thuê."
            link="/nguoithue"
          />
          <FeatureCard 
            icon="📝"
            title="Quản Lý Hợp Đồng" 
            description="Tạo và quản lý hợp đồng thuê trọ, theo dõi thời hạn và điều khoản."
            link="/hopdong"
          />
          <FeatureCard 
            icon="💵"
            title="Quản Lý Hóa Đơn" 
            description="Theo dõi thanh toán, xuất hóa đơn tiền trọ và dịch vụ hàng tháng."
            link="/hoadon"
          />
          <FeatureCard 
            icon="⚡"
            title="Quản Lý Dịch Vụ" 
            description="Quản lý các dịch vụ cung cấp như điện, nước, wifi và các tiện ích khác."
            link="/dichvu"
          />
          <FeatureCard 
            icon="📊"
            title="Báo Cáo Thống Kê" 
            description="Xem báo cáo tổng quan về tình hình kinh doanh, doanh thu và công nợ."
            link="/baocao"
          />
        </div>
      </section>
      
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ưu Điểm Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Dễ dàng sử dụng</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Giao diện thân thiện, dễ sử dụng
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Không cần kiến thức CNTT chuyên sâu
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Hỗ trợ đầy đủ tiếng Việt
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Quản lý toàn diện</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Quản lý tất cả nghiệp vụ nhà trọ trong một hệ thống
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Tự động tính toán hóa đơn
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Thống kê, báo cáo doanh thu
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Hệ Thống Quản Lý Nhà Trọ</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Giải pháp toàn diện cho việc quản lý nhà trọ hiệu quả.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quản Lý</h3>
            <ul className="space-y-2">
              <li><Link href="/daytro" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Dãy Trọ</Link></li>
              <li><Link href="/nguoithue" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Người Thuê</Link></li>
              <li><Link href="/hopdong" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Hợp Đồng</Link></li>
              <li><Link href="/hoadon" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Hóa Đơn</Link></li>
              <li><Link href="/dichvu" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Dịch Vụ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li><Link href="/huongdan" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Hướng Dẫn Sử Dụng</Link></li>
              <li><Link href="/faq" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Câu Hỏi Thường Gặp</Link></li>
              <li><Link href="/lienhe" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Liên Hệ Hỗ Trợ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liên Hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">Email: support@quanlynhatro.com</li>
              <li className="text-gray-600 dark:text-gray-300">Điện thoại: 0123 456 789</li>
              <li className="text-gray-600 dark:text-gray-300">Địa chỉ: 123 Đường ABC, Thành phố Trà Vinh</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Hệ Thống Quản Lý Nhà Trọ. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </main>
  );
}

// Component cho thẻ tính năng
function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <Link href={link} className="block">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          <span className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center">
            Xem chi tiết
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// Component cho thẻ phòng trọ
function RoomCard({ image, title, price, location, area, rating }: RoomCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">{price}</p>
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 dark:text-gray-300">{location}</span>
        </div>
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 dark:text-gray-300">{area}</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-600 dark:text-gray-300">{rating}/5.0</span>
        </div>
      </div>
    </div>
  );
}
