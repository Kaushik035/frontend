import TaskForm from "../../../components/TaskForm";

export default function AddTaskPage() {
  return (
    <main className="p-4 bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-white">Add a New Task</h1>
      <TaskForm />
    </main>
  );
}