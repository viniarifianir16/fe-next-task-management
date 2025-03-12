"use client";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom px-3">
      <button
        className="btn btn-outline-light border d-lg-none h-10"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list text-gray-800 fw-bold"></i>
      </button>
      <div className="h-10 align-middle">
        {/* <span className="navbar-brand mx-2">Task Management</span> */}
      </div>
    </nav>
  );
}
