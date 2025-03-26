"use client";

import { useEffect, useState } from "react";
import { getEmployees } from "@/app/components/api/employees";
import { getTasks } from "@/app/components/api/tasks";

export default function Home() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const employees = await getEmployees();
      const tasks = await getTasks();

      setEmployeeCount(employees.length);
      setTaskCount(tasks.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Employees</h5>
              <p className="card-text">{employeeCount} Employees</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Tasks</h5>
              <p className="card-text">{taskCount} Tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
