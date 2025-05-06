import { HeroSection } from "@/components/hero-section-dark";

// Component Hero Section Demo
function HeroSectionDemo() {
  return (
    <HeroSection
      title="Website Đặt Phòng Trọ"
      subtitle={{
        regular: "Tìm kiếm và đặt phòng trọ ",
        gradient: "nhanh chóng, dễ dàng",
      }}
      description="Kết nối chủ nhà và người thuê trọ một cách hiệu quả. Tìm kiếm phòng trọ phù hợp với nhu cầu và ngân sách của bạn chỉ với vài cú nhấp chuột."
      ctaText="Tìm Phòng Ngay"
      ctaHref="/search"
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
        <h2 className="text-3xl font-bold text-center mb-12">Tính Năng Nổi Bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🔍"
            title="Tìm Kiếm Thông Minh" 
            description="Tìm kiếm theo khu vực, giá cả, diện tích và tiện nghi để tìm phòng phù hợp nhất."
          />
          <FeatureCard 
            icon="📅"
            title="Đặt Phòng Trực Tuyến" 
            description="Đặt phòng nhanh chóng, tiện lợi và nhận phản hồi ngay lập tức từ chủ nhà."
          />
          <FeatureCard 
            icon="⭐"
            title="Đánh Giá Và Bình Luận" 
            description="Xem đánh giá từ người thuê khác và chia sẻ trải nghiệm của bạn."
          />
          <FeatureCard 
            icon="🏠"
            title="Quản Lý Phòng Trọ" 
            description="Chủ nhà có thể đăng tin, quản lý thông tin phòng trọ một cách dễ dàng."
          />
          <FeatureCard 
            icon="💳"
            title="Thanh Toán An Toàn" 
            description="Hỗ trợ nhiều phương thức thanh toán bảo mật cho người thuê và chủ nhà."
          />
          <FeatureCard 
            icon="📱"
            title="Trải Nghiệm Đa Nền Tảng" 
            description="Sử dụng trên mọi thiết bị từ máy tính đến điện thoại di động."
          />
        </div>
      </section>
      
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Phòng Trọ Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RoomCard 
              image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2940&auto=format&fit=crop"
              title="Phòng trọ cao cấp Quận 1"
              price="4.500.000đ/tháng"
              location="Quận 1, TP. Trà VinhVinh"
              area="25m²"
              rating={4.8}
            />
            <RoomCard 
              image="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2940&auto=format&fit=crop"
              title="Phòng trọ gần ĐH Trà Vinh"
              price="3.200.000đ/tháng"
              location="Quận 2, TP. Trà Vinh"
              area="20m²"
              rating={4.5}
            />
            <RoomCard 
              image="https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=2940&auto=format&fit=crop"
              title="Phòng trọ mới"
              price="3.800.000đ/tháng"
              location="Quận 3, Trà Vinh"
              area="22m²"
              rating={4.7}
            />
          </div>
          <div className="text-center mt-10">
            <a 
              href="/rooms" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Xem Tất Cả Phòng Trọ
            </a>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Website Đặt Phòng Trọ</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Giải pháp tìm kiếm và đặt phòng trọ hiệu quả, tiện lợi cho mọi người.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liên Kết</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Trang Chủ</a></li>
              <li><a href="/rooms" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Phòng Trọ</a></li>
              <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Giới Thiệu</a></li>
              <li><a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Liên Hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">FAQ</a></li>
              <li><a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Điều Khoản</a></li>
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Bảo Mật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liên Hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">Email: tranhunggit@gmail.com</li>
              <li className="text-gray-600 dark:text-gray-300">Điện thoại: 0123 456 789</li>
              <li className="text-gray-600 dark:text-gray-300">Địa chỉ: 123 Đường ABC, TP. Trà Vinh</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2023 Website Đặt Phòng Trọ. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </main>
  );
}

// Component cho thẻ tính năng
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
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
