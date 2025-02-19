"use client";

import Header from "../components/Header";
import TaskForm from "../components/TaskForm";

export default function CreateTaskPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 max-w-3xl">
        <TaskForm />
      </div>
    </div>
  );
}
