"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

const TaskForm = ({ task = {}, isEdit = false }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [completed, setCompleted] = useState(task.completed || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, completed };

    try {
      if (isEdit) {
        await axiosInstance.put(`tasks/${task.id}/`, data);
        alert("Task updated!");
      } else {
        await axiosInstance.post("tasks/", data);
        alert("Task created!");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("An error occurred while saving the task.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-bold text-white">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-2 py-1 w-full bg-slate-300"
          required
        />
      </div>
      <div>
        <label className="block font-bold text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-2 py-1 w-full bg-slate-300"
          required
        />
      </div>
      <div>
        <label className="block font-bold text-white" >Completed</label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mt-1"
        />
      </div>

    
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isEdit ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;

