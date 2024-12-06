"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link"; // Import Link component from Next.js

const AddTask = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    console.log("Sending task data:", newTask); // Check the task data being sent

    try {
      // Send POST request to add the task
      const response = await axiosInstance.post("tasks/", newTask);
      console.log("Task added successfully:", response.data);  // Log successful response

      // Refresh the page to show the updated task list
      window.location.reload();  // Force a page reload to show the new task

    } catch (error) {
      console.error("Error adding task:", error.response || error.message);  // Log error if any
    } finally {
      setIsLoading(false);  // Stop loading state
    }
  };

  return (
    <div className="bg-gray-800 max-w-lg mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleAddTask} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg">Description</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Back to Home Button */}

    </div>
  );
};

export default AddTask;
