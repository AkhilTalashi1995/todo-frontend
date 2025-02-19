"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PlusCircle, Check } from "lucide-react";
import { CreateTaskDTO, createTask, updateTask, getTask } from "@/lib/api";

interface TaskFormProps {
  taskId?: string;
}

export default function TaskForm({ taskId }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState<string>("pick-red"); // Default selection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!taskId);
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId]);

  async function fetchTask(id: string) {
    if (!id || id === "undefined") {
      setError("Invalid task ID.");
      setIsLoading(false);
      return;
    }

    try {
      const task = await getTask(id);
      setTitle(task.title);
      setColor(task.color || "pick-red");
    } catch (error) {
      console.error("Failed to fetch task:", error);
      setError("Task not found or server error.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const taskData: CreateTaskDTO = { title: title.trim(), color };

      if (taskId) {
        await updateTask(taskId, taskData);
      } else {
        await createTask(taskData);
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to save task:", error);
      setError("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    router.back();
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const colors = [
    { name: "pick-red", hex: "#FF3B30" },
    { name: "pick-orange", hex: "#FF9500" },
    { name: "pick-yellow", hex: "#FFCC00" },
    { name: "pick-green", hex: "#34C759" },
    { name: "pick-blue", hex: "#007AFF" },
    { name: "pick-indigo", hex: "#5856D6" },
    { name: "pick-purple", hex: "#AF52DE" },
    { name: "pick-pink", hex: "#FF2D55" },
    { name: "pick-brown", hex: "#A2845E" },
  ];

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-6 rounded-lg">
      <button type="button" onClick={handleCancel}>
        <ArrowLeft className="w-5 h-5" />
      </button>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-bold text-title-text mb-3 mt-12"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!hasTyped) setHasTyped(true);
          }}
          placeholder="Ex. Brush your teeth"
          className="w-full pt-3 pb-3 px-3 py-2 bg-counter-bg text-white-text placeholder-white-text/30 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-counter-bg/80"
          required
        />
      </div>

      <div className="mb-6 mt-6">
        <label className="block text-sm font-bold text-title-text mb-3">
          Color
        </label>
        <div className="flex space-x-4 mb-12">
          {colors.map(({ name, hex }) => (
            <ColorOption
              key={name}
              name={name}
              hex={hex}
              selected={color === name}
              onClick={() => setColor(name)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-button-primary hover:bg-button-primary-hover text-white font-normal py-3 px-4 rounded w-full text-center text-[14px] flex items-center justify-center gap-2"
        >
          {isSubmitting
            ? "Saving..."
            : hasTyped
            ? "Save"
            : taskId
            ? "Update Task"
            : "Add Task"}

          {isSubmitting ? null : hasTyped ? (
            <Check className="w-4 h-4" />
          ) : !taskId ? (
            <PlusCircle className="w-4 h-4" />
          ) : null}
        </button>
      </div>
    </form>
  );
}

interface ColorOptionProps {
  name: string;
  hex: string;
  selected: boolean;
  onClick: () => void;
}

function ColorOption({ name, hex, selected, onClick }: ColorOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center w-[52px] h-[52px] rounded-full transition-all ${
        selected ? "ring-2 ring-white" : ""
      }`}
      style={{ backgroundColor: hex }}
    >
      {selected }
    </button>
  );
}
