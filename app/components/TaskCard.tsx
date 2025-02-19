"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task, toggleTaskCompletion, deleteTask } from "@/lib/api";
import { TrashIcon } from "@heroicons/react/24/solid"; 

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}

export default function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggleCompletion = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    try {
      await toggleTaskCompletion(task.id, e.target.checked);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleEdit = () => {
    console.log("Navigating to edit task with ID:", task.id);
    router.push(`/tasks/${task.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  const getBorderColor = () => {
    switch (
      task.color ||
      "pick-red" // Ensure fallback to default
    ) {
      case "pick-red":
        return "border-red-500";
      case "pick-orange":
        return "border-orange-500";
      case "pick-yellow":
        return "border-yellow-500";
      case "pick-green":
        return "border-green-500";
      case "pick-blue":
        return "border-blue-500";
      case "pick-indigo":
        return "border-indigo-500";
      case "pick-purple":
        return "border-purple-500";
      case "pick-pink":
        return "border-pink-500";
      case "pick-brown":
        return "border-yellow-800";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div
      className={`border-l-4 ${getBorderColor()} bg-task-card p-4 mb-4 shadow-md rounded-md cursor-pointer flex justify-between items-center`}
      onClick={handleEdit}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompletion}
          className="mr-4 h-5 w-5 appearance-none border-2 border-title-text rounded-full cursor-pointer transition-opacity hover:opacity-75 
    checked:bg-secondary-text checked:border-secondary-text flex items-center justify-center relative
    before:content-['✔'] before:absolute before:w-3 before:h-3 before:text-white before:font-bold before:flex before:items-center before:justify-center before:opacity-0 checked:before:opacity-100"
          onClick={(e) => e.stopPropagation()}
        />
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      </div>

      {!showConfirmation ? (
        <button
          onClick={handleDeleteClick}
          className="text-bin hover:text-red-400 px-2 py-1 rounded"
          disabled={isDeleting}
        >
          <TrashIcon className="h-5 w-5 " />
        </button>
      ) : (
        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleConfirmDelete}
            className="bg-[red-500] hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Confirm"}
          </button>
          <button
            onClick={handleCancelDelete}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
