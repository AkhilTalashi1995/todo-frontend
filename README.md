```markdown
# Frontend Setup - Todo List App

## Overview
This is the frontend for the Full-Stack Todo List App, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It provides a user-friendly interface to manage tasks, integrating with the backend API built using **Express.js, Prisma, and MySQL**.

---

## Prerequisites
Ensure you have the following installed:
- **Node.js (v18+)**
- **npm** or **yarn**
- **Backend API running** (Follow the [Backend Setup Guide](https://github.com/AkhilTalashi1995/todo-backend))  

---

## 1. Clone the Repository
```sh
git clone https://github.com/AkhilTalashi1995/todo-frontend.git
cd todo-frontend
```

---

## 2. Install Dependencies
Using **npm**:
```sh
npm install
```

Or using **yarn**:
```sh
yarn install
```

---

## 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```sh
NEXT_PUBLIC_API_URL=http://localhost:5001/api/tasks
```
- **NEXT_PUBLIC_API_URL**: Set this to the backend API URL. If running locally, it should be `http://localhost:5001/api/tasks`.

---

## 4. Start the Development Server
Using **npm**:
```sh
npm run dev
```

Or using **yarn**:
```sh
yarn dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

---

## 5. API Integration
The app interacts with the backend API using `lib/api.ts`. It includes:
- Fetching all tasks
- Creating a new task
- Updating a task
- Deleting a task
- Toggling task completion

Ensure the backend is running and accessible at `NEXT_PUBLIC_API_URL`.

---

## 6. License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
```