"use client";

import Link from "next/link";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`sidebar bg-gray-800 text-white ${isOpen ? "open" : ""}`}>
      <div className="h-10 mb-3 px-3">
        <p className="text-center text-sm align-middle">Task Management</p>
        <div className="border border-bottom shadow-lg"></div>
      </div>
      <ul className="list-unstyled px-3 mx-2">
        <li>
          <Link
            href="/"
            className="text-white text-decoration-none d-flex align-items-center mb-2"
          >
            <i className="bi bi-grid me-2 text-xl"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/employees"
            className="text-white text-decoration-none d-flex align-items-center mb-2"
          >
            <i className="bi bi-person me-2 text-xl"></i> Employees
          </Link>
        </li>
        <li>
          <Link
            href="/tasks"
            className="text-white text-decoration-none d-flex align-items-center mb-2"
          >
            <i className="bi bi-journal-text me-2 text-xl"></i> Tasks
          </Link>
        </li>
      </ul>
    </div>
  );
}
