import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Tasks {
    id: number;
    employee_id: number;
    task_name: string;
    due_date: string;
}

// GET
export const getTasks = async () => {
    try {
        const res = await fetch(`${API_URL}/tasks`, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP Error! Status: ${res.status} - ${text}`);
        }

        const data = await res.json();

        if (!Array.isArray(data.data)) {
            console.error("Invalid response format:", data);
            return [];
        }

        return data.data;
    } catch (error) {
        Swal.fire(
            'Error',
            (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch data',
            'error',
        );
    }
};

// GET EMPLOYEES
export const getEmployees = async () => {
    const res = await fetch(`${API_URL}/employees`);
    return res.json();
};

// POST
export const addTask = async (task: Tasks) => {
    try {
        const res = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(task),
        });
        if (!res.ok) {
            throw new Error("Failed to created task");
        }
        Swal.fire('Success!', 'Data created successfully', 'success');
        return res.json();
    } catch (error) {
        Swal.fire(
            "Error",
            error instanceof Error ? error.message : "An error occurred.",
            "error"
        );
    }
};

// PUT
export const updateTask = async (id: number, task: Tasks) => {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Accept": "application/json", },
            body: JSON.stringify(task),
        });
        if (!res.ok) {
            throw new Error("Failed to updated task");
        }
        Swal.fire('Success!', 'Data updated successfully', 'success');
        return res.json();
    } catch (error) {
        Swal.fire(
            "Error",
            error instanceof Error ? error.message : "An error occurred.",
            "error"
        );
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
            const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
            if (!res.ok) {
                throw new Error("Failed to delete task");
            }
            Swal.fire('Deleted!', 'Data has been deleted.', 'success');
            return { ok: true };
        } catch (error) {
            Swal.fire(
                "Error",
                error instanceof Error ? error.message : "An error occurred.",
                "error"
            );
            return { ok: false };
        }
    }
};
