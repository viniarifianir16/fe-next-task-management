"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/app/components/api/tasks";
import Link from "next/link";
import DataTable from "react-data-table-component";

interface Tasks {
  id: number;
  task_id: string;
  name: string;
  task_name: string;
  due_date: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [search, setSearch] = useState<string>("");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await deleteTask(id);
    if (res?.ok) {
      console.log("Penghapusan berhasil, mengambil data ulang...");
      await fetchTasks();
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(search.toLowerCase()) ||
      task.task_name.toLowerCase().includes(search.toLowerCase()) ||
      task.due_date.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "No",
      selector: (row: Tasks) => tasks.indexOf(row) + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: Tasks) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Task",
      selector: (row: Tasks) => row.task_name,
      sortable: true,
    },
    {
      name: "Due Date",
      width: "150px",
      selector: (row: Tasks) => row.due_date,
      sortable: true,
    },
    {
      name: "Actions",
      width: "150px",
      cell: (row: Tasks) => (
        <>
          <Link
            href={`/tasks/form?id=${row.id}`}
            className="btn btn-warning btn-sm me-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

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

          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-3"
          />

          <DataTable columns={columns} data={filteredTasks} pagination />
        </div>
      </div>
    </div>
  );
}
