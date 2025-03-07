import ToDo from "./ToDo";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import SaveFile from "./SaveFile";
const ToDoLists = () => {
  const { tasks, setTasks } = useContext(TodoContext);
  const [stateShow, setStateShow] = useState("all");

  function CountTasks() {
    let all = tasks.length,
      complete = 0, // Initialize complete to 0
      notComplete = 0; // Initialize notComplete to 0

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isComplete) {
        complete += 1; // Increment complete for completed tasks
      } else {
        notComplete += 1; // Increment notComplete for incomplete tasks
      }
    }
    return [all, complete, notComplete];
  }
  const [all, complete, notComplete] = CountTasks();
  return (
    <div
      className=" bg-[#181A1C] min-h-screen flex justify-start flex-col items-center"
      dir="rtl"
    >
      <div className="bg-white max-w-lg w-full p-2 rounded-lg shadow-lg mt-3">
        <h1 className="text-black font-extrabold text-6xl text-center !font-[Tajawal] bg-blue-400 rounded-lg p-2 mb-2">
          مهامي
        </h1>
        <hr className="block mt-4 text-gray-500" />
        <div className="flex justify-center my-3 border border-gray-700 rounded-lg overflow-hidden height-[200px] shadow-sm">
          <button
            onClick={() => {
              setStateShow("all");
            }}
            className="bg-white p-2 text-red-500 font-bold text-lg w-1/3 border-gray-700 cursor-pointer hover:bg-gray-200"
          >
            الكل
            <span>- {all}</span>
          </button>
          <button
            onClick={() => {
              setStateShow("complete");
            }}
            className="bg-white p-2 text-gray-600 font-bold text-lg w-1/3 border-r border-l border-gray-700 cursor-pointer hover:bg-gray-200"
          >
            منجز
            <span>- {complete}</span>
          </button>
          <button
            onClick={() => {
              setStateShow("notComplete");
            }}
            className="bg-white p-2 text-gray-600 font-bold text-lg w-1/3 hover:bg-gray-200 cursor-pointer"
          >
            غير المنجز
            <span>- {notComplete}</span>
          </button>
        </div>
        {<ToDo stateShow={stateShow} />}
      </div>
      <div className="  flex  bottom-30  justify-start ">
        <SaveFile />
      </div>
    </div>
  );
};

export default ToDoLists;
