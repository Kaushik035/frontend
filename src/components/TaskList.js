"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axiosInstance.get("tasks/");
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`tasks/${id}/`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Task List</h2>
        <Link href="/tasks/add">
          <button className="bg-blue-500 text-center ml-11 text-white px-4 py-2 rounded">Add Task</button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li key={task.id} className=" rounded p-4 shadow text-white bg-gray-900">
              <h2 className="text-xl py-2 font-bold">{task.title}</h2>
              <p className="py-1">{task.description}</p>
              <p
                className={`font-semibold ${
                  task.completed ? "text-green-500" : "text-red-500"
                }`}
              >
                {task.completed ? "Completed" : "Not Completed"}
              </p>
              <div className="flex gap-4 mt-2 justify-end">
                <Link href={`/tasks/edit/${task.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white  px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;


