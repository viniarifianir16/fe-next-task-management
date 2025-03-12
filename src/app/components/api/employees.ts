import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface Employees {
    name: string;
    position: string;
}

// GET
export const getEmployees = async () => {
    try {
        const res = await fetch(`${API_URL}/employees`, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (!res.ok) {
            const text = await res.text();
            console.error("Response Error:", text);
            throw new Error(`HTTP Error! Status: ${res.status} - ${text}`);
        }

        const data = await res.json();
        // console.log("Data dari API:", data);

        if (!Array.isArray(data.data)) {
            console.error("Invalid response format:", data);
            return [];
        }

        return data.data;
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
        const res = await fetch(`${API_URL}/employees`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(employee),
        });
        if (!res.ok) {
            throw new Error("Failed to create employee");
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
export const updateEmployee = async (id: number, employee: Employees) => {
    try {
        const res = await fetch(`${API_URL}/employees/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Accept": "application/json", },
            body: JSON.stringify(employee),
        });
        if (!res.ok) {
            throw new Error("Failed to updated employee");
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
            const res = await fetch(`${API_URL}/employees/${id}`, { method: "DELETE" });
            if (!res.ok) {
                throw new Error("Failed to delete employee");
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
