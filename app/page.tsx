"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Task, getTasks } from "@/lib/api";
import TaskCard from "./components/TaskCard";
import Image from "next/image";

import { PlusCircle } from "lucide-react"; 

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setIsLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Todo List</h1>
        <div className="text-center py-8">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Todo List</h1>
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
          <button
            onClick={fetchTasks}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center mb-6 bg-black-box w-screen h-[200px]">
        <h1 className="text-4xl font-bold flex items-center">
          <Image
            src="/rocket.png"
            alt="Rocket"
            width={22}
            height={36}
            className="mr-2"
            unoptimized
          />
          <span className="text-title-text ml-2">Todo</span>
          <span className="text-app-text ml-2">App</span>
        </h1>
      </div>
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="flex justify-between items-center mb-14 -mt-16">
          <Link
            href="/tasks"
            className="bg-button-primary hover:bg-button-primary-hover text-white font-normal py-3 px-4 rounded w-full text-center text-[14px] flex items-center justify-center gap-2"
          >
            Create Task <PlusCircle className="w-4 h-4" />
          </Link>
        </div>
        <div className="mb-6 p-3 flex justify-between items-center">
          <div>
            <span className="text-title-text font-bold pr-1">Tasks</span>{" "}
            <span className="bg-counter-bg rounded-full pt-1 pr-3 pb-1 pl-3 font-normal">
              {tasks.length}
            </span>
          </div>
          <div>
            <span className="text-secondary-text font-bold pr-1">
              Completed{" "}
            </span>
            <span className="bg-counter-bg rounded-full pt-1 pr-3 pb-1 pl-3 font-normal">
              {tasks.length === 0
                ? "0"
                : `${completedTasksCount} of ${tasks.length}`}
            </span>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-8 bg-background-light rounded-lg shadow-sm border-t-counter-bg border-t-[1px] text-bin flex flex-col items-center">
            <Image
              src="/notes.png"
              alt="Notes"
              width={56}
              height={56}
              className="mb-4 mt-10"
            />
            <p className="text-bin font-semibold">
              You don't have any tasks registered yet.
            </p>
            <p className="text-bin/80 mt-6 font-normal">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskUpdated={fetchTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
