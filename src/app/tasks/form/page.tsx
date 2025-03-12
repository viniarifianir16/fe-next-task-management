"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addTask, updateTask, getTasks } from "@/app/components/api/tasks";
import { getEmployees } from "@/app/components/api/employees";

export default function TaskForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: 0,
    task_name: "",
    due_date: "",
  });

  useEffect(() => {
    if (taskId) {
      fetchTaskData();
    }
  }, [taskId]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchTaskData = async () => {
    const tasks = await getTasks();
    const task = tasks.find(
      (e: {
        id: number;
        employee_id: number;
        task_name: string;
        due_date: string;
      }) => e.id === Number(taskId)
    );
    if (task)
      setFormData({
        employee_id: task.employee_id,
        task_name: task.task_name,
        due_date: task.due_date,
      });
  };

  const fetchEmployeeData = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskId) {
      await updateTask(Number(taskId), { ...formData, id: Number(taskId) });
    } else {
      await addTask({ ...formData, id: Number() });
    }
    router.push("/tasks");
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Tasks</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{taskId ? "Edit" : "Add"} Task</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Employee</label>
              <select
                id="employee"
                className="form-control mt-2"
                value={formData.employee_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employee_id: parseInt(e.target.value),
                  })
                }
                required
              >
                <option value="">-- Pilih Employee --</option>
                {employees.map(
                  (employee: {
                    id: number;
                    name: string;
                    position: string;
                  }) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.position}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="mb-3">
              <label>Task Name</label>
              <textarea
                className="form-control mt-2"
                value={formData.task_name}
                onChange={(e) =>
                  setFormData({ ...formData, task_name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>Due Date</label>
              <input
                type="date"
                className="form-control mt-2"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {taskId ? "Update" : "Add"} Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
