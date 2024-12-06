import TaskForm from "../../../../components/TaskForm";
import axiosInstance from "../../../../lib/axios";

const fetchTask = async (id) => {
  const response = await axiosInstance.get(`tasks/${id}/`);
  return response.data;
};

export default async function EditTaskPage({ params }) {
  const task = await fetchTask(params.id);

  return (
    <main className="p-4 bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Task</h1>
      <TaskForm task={task} isEdit={true} />
    </main>
  );
}

