"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className="d-flex">
          <Sidebar isOpen={sidebarOpen} />

          <div
            className={`content w-full ${sidebarOpen ? "sidebar-open" : ""}`}
          >
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="p-3">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
