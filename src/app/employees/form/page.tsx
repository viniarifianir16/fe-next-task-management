"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addEmployee,
  updateEmployee,
  getEmployees,
} from "../../components/api/employees";

export default function EmployeeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [formData, setFormData] = useState({ name: "", position: "" });

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  const fetchEmployeeData = async () => {
    const employees = await getEmployees();
    const employee = employees.find(
      (e: { id: number; name: string; position: string }) =>
        e.id === Number(employeeId)
    );
    if (employee)
      setFormData({ name: employee.name, position: employee.position });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (employeeId) {
      await updateEmployee(Number(employeeId), formData);
    } else {
      await addEmployee(formData);
    }
    router.push("/employees");
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Employees</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{employeeId ? "Edit" : "Add"} Employee</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>Position</label>
              <input
                type="text"
                className="form-control mt-2"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {employeeId ? "Update" : "Add"} Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
