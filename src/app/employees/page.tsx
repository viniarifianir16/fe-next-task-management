"use client";

import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "@/app/components/api/employees";
import Link from "next/link";
import DataTable from "react-data-table-component";

interface Employees {
  id: number;
  name: string;
  position: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const handleDelete = async (id: number) => {
    const isDeleted = await deleteEmployee(id);
    if (isDeleted) setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "No",
      selector: (row: Employees) => employees.indexOf(row) + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: Employees) => row.name,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row: Employees) => row.position,
      sortable: true,
    },
    {
      name: "Actions",
      width: "150px",
      cell: (row: Employees) => (
        <>
          <Link
            href={`/employees/form?id=${row.id}`}
            className="btn btn-warning btn-sm me-2 text-white"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-danger btn-sm text-white"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Employees</h3>
      <div className="card">
        <div className="card-body">
          <div className="flex items-end justify-between mb-3">
            <h5 className="card-title">Employees List</h5>

            <Link href="/employees/form" className="btn btn-primary">
              Add Employee
            </Link>
          </div>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-3"
          />

          <DataTable columns={columns} data={filteredEmployees} pagination />
        </div>
      </div>
    </div>
  );
}
