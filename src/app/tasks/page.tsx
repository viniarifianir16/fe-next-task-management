"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../components/api/tasks";
import Link from "next/link";
import $ from "jquery";
import "datatables.net-bs5";

interface Tasks {
  id: number;
  employee_id: string;
  name: string;
  task_name: string;
  due_date: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length > 0) {
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $("#myTable").DataTable().destroy();
      }

      $("#myTable").DataTable();
    }
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteTask(id);
    if (res?.ok) {
      console.log("Penghapusan berhasil, mengambil data ulang...");
      await fetchTasks();
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Tasks</h3>
      <div className="card">
        <div className="card-body">
          <div className="flex items-end justify-between mb-3">
            <h5 className="card-title">Tasks List</h5>

            <Link href="/tasks/form" className="btn btn-primary">
              Add Task
            </Link>
          </div>

          <table id="myTable" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Task</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((item: Tasks, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.task_name}</td>
                    <td>{item.due_date}</td>
                    <td>
                      <Link
                        href={`/tasks/form?id=${item.id}`}
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
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
