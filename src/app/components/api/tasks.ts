import Swal from "sweetalert2";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Employees {
    id: number;
    name: string;
}

interface Tasks {
    id: number;
    employee_id: number;
    task_name: string;
    due_date: string;
    employee?: Employees;
}

// GET TASKS
export const getTasks = async (): Promise<Tasks[]> => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            headers: {
                "Accept": "application/json",
            },
        });

        if (response.status !== 200 || response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to fetch tasks");
        }

        return response.data.data.map((task: Tasks) => ({
            ...task,
            employee: task.employee ? { id: task.employee.id, name: task.employee.name } : undefined,
        }));
    } catch (error) {
        Swal.fire(
            "Error",
            error instanceof Error ? error.message : "An error occurred.",
            "error"
        );
        return [];
    }
};

// GET EMPLOYEES
export const getEmployees = async (): Promise<Employees[]> => {
    try {
        const response = await axios.get(`${API_URL}/employees`, {
            headers: {
                "Accept": "application/json",
            },
        });
        if (response.status !== 200 || response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to fetch employees");
        }

        return response.data.data;
    } catch (error) {
        Swal.fire(
            "Error",
            error instanceof Error ? error.message : "An error occurred.",
            "error"
        );
        return [];
    }
};

// POST
export const addTask = async (task: Tasks) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task);
        if (response.status !== 201 || response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to create task");
        }

        Swal.fire("Success!", "Task created successfully", "success");
        return response.data.data;
    } catch (error) {
        Swal.fire(
            "Error",
            error instanceof Error ? error.message : "An error occurred.",
            "error"
        );
        throw error;
    }
};

// PUT
export const updateTask = async (id: number, task: Tasks) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, task);

        if (response.status !== 200 || response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to update task");
        }

        Swal.fire("Success!", "Task updated successfully", "success");
        return response.data.data;
    } catch (error) {
        Swal.fire(
            "Error",
            error instanceof Error ? error.message : "An error occurred.",
            "error"
        );
        throw error;
    }
};

// DELETE
export const deleteTask = async (id: number) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
        try {
            const response = await axios.delete(`${API_URL}/tasks/${id}`);
            if (response.status !== 200 || response.data.status !== "success") {
                throw new Error(response.data.message || "Failed to delete task");
            }

            Swal.fire("Success!", "Task deleted successfully", "success");
            return true;
        } catch (error) {
            Swal.fire(
                "Error",
                error instanceof Error ? error.message : "An error occurred.",
                "error"
            );
            return false
        }
    }
};
