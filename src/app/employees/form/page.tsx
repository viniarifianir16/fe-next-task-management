import { Suspense } from "react";
import EmployeeForm from "@/app/components/form/EmployeeForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeeForm />
    </Suspense>
  );
}
