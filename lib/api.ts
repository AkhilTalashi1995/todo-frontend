const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/tasks";

export interface Task {
  id: string;
  title: string;
  color?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  title: string;
  color?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  color?: string;
  completed?: boolean;
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

// Get a single task by ID
export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch task with ID ${id}`);
  }

  return response.json();
}

// Create a new task
export async function createTask(task: CreateTaskDTO): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

// Update an existing task
export async function updateTask(
  id: string,
  updates: UpdateTaskDTO
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task with ID ${id}`);
  }

  return response.json();
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task with ID ${id}`);
  }
}

// Toggle task completion status
export async function toggleTaskCompletion(
  id: string,
  completed: boolean
): Promise<Task> {
  return updateTask(id, { completed });
}
