"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathName = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 md:hidden" onClick={onClose}></div>
      )}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-gray-800 text-white transition-transform duration-300 ease-in-out 
          ${
            isOpen ? "translate-x-0" : "-translate-x-64"
          } md:relative md:translate-x-0 md:w-64 lg:w-72 xl:w-80`}
      >
        <div className="h-10 mx-2 p-3">
          <p className="text-center text-sm align-middle">Task Management</p>
        </div>
        <hr className="w-full" />
        <ul className="list-unstyled px-3 mx-2 my-4">
          <li>
            <Link
              href="/"
              className={`text-white text-decoration-none d-flex align-items-center mb-2 p-2 ${
                pathName === "/" ? "bg-gray-700 rounded" : ""
              }`}
            >
              <i className="bi bi-grid me-2 text-xl"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/employees"
              className={`text-white text-decoration-none d-flex align-items-center mb-2 p-2 ${
                pathName.startsWith("/employees") ? "bg-gray-700 rounded" : ""
              }`}
            >
              <i className="bi bi-person me-2 text-xl"></i> Employees
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className={`text-white text-decoration-none d-flex align-items-center mb-2 p-2 ${
                pathName.startsWith("/tasks") ? "bg-gray-700 rounded" : ""
              }`}
            >
              <i className="bi bi-journal-text me-2 text-xl"></i> Tasks
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
