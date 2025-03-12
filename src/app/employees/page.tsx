"use client";

import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../components/api/employees";
import Link from "next/link";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net";

interface Employees {
  id: number;
  name: string;
  position: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (employees.length > 0) {
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $("#myTable").DataTable().destroy();
      }

      $("#myTable").DataTable();
    }
  }, [employees]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteEmployee(id);
    if (res?.ok) {
      console.log("Penghapusan berhasil, mengambil data ulang...");
      await fetchEmployees();
    }
  };

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

          <table id="myTable" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((item: Employees, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.position}</td>
                  <td>
                    <Link
                      href={`/employees/form?id=${item.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
