import Swal from "sweetalert2";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Employees {
    id: number;
    name: string;
    position: string;
}

// GET
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
export const addEmployee = async (employee: Employees) => {
    try {
        const response = await axios.post(`${API_URL}/employees`, employee);

        if (response.status !== 201 || response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to create employee");
        }

        Swal.fire("Success!", "Employee created successfully", "success");
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
export const updateEmployee = async (id: number, employee: Employees) => {
    try {
        const response = await axios.put(`${API_URL}/employees/${id}`, employee);

        if (response.status !== 200 || response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to update employee");
        }

        Swal.fire("Success!", "Employee updated successfully", "success");
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
export const deleteEmployee = async (id: number) => {
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
            const response = await axios.delete(`${API_URL}/employees/${id}`);
            if (response.status !== 200 || response.data.status !== "success") {
                throw new Error(response.data.message || "Failed to delete employee");
            }

            Swal.fire("Success!", "Employee deleted successfully", "success");
            return true;
        } catch (error) {
            Swal.fire(
                "Error",
                error instanceof Error ? error.message : "An error occurred.",
                "error"
            );
            return false;
        }
    }
};
