import Image from "next/image";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";


export default function Home() {
  return (
    <div>
      <TaskList />
      {/* <TaskForm /> */}
    </div>
  );
}