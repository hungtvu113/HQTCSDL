import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quản lý nhà trọ",
  description: "Hệ thống quản lý nhà trọ, người thuê, hợp đồng, hóa đơn và dịch vụ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-purple-600 dark:text-purple-400 font-bold text-xl">
                    Quản Lý Nhà Trọ
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/daytro" className="border-transparent text-gray-900 dark:text-gray-100 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dãy trọ
                  </Link>
                  <Link href="/nguoithue" className="border-transparent text-gray-900 dark:text-gray-100 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Người thuê
                  </Link>
                  <Link href="/hopdong" className="border-transparent text-gray-900 dark:text-gray-100 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Hợp đồng
                  </Link>
                  <Link href="/hoadon" className="border-transparent text-gray-900 dark:text-gray-100 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Hóa đơn
                  </Link>
                  <Link href="/dichvu" className="border-transparent text-gray-900 dark:text-gray-100 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dịch vụ
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link href="/login" className="text-gray-900 dark:text-gray-100 hover:text-purple-700 dark:hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
