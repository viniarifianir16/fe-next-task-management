import { Suspense } from "react";
import TaskForm from "@/app/components/form/TaskForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskForm />
    </Suspense>
  );
}
