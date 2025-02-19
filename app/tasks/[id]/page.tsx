"use client";

import { use } from "react";
import TaskForm from "../../components/TaskForm";
import Header from "@/app/components/Header";

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = use(params);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 max-w-3xl">
        <TaskForm taskId={id} />
      </div>
    </div>
  );
}


