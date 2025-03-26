"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className="d-flex">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-white fixed top-4 left-4 z-50"
          >
            <i className="bi bi-list"></i>
          </button>

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div
            className={`content w-full ${isSidebarOpen ? "sidebar-open" : ""}`}
          >
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="p-3">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
