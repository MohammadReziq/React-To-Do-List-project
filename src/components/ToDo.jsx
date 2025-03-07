import React, { useState, useContext, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { TodoContext } from "../context/TodoContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const ToDo = ({ stateShow }) => {
  const { tasks, setTasks } = useContext(TodoContext);
  const [addTaskInfo, setAddTaskInfo] = useState({
    title: "",
    description: "",
  });

  // Sync tasks with localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todos"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [setTasks]);

  // Open/close dialog for editing task
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editTask, setEditTask] = useState({});

  function handleEditTask() {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editTask.id ? editTask : task))
    );
    localStorage.setItem("todos", JSON.stringify(tasks));

    handleClickCloseEdit();
  }

  function handleClickOpenEdit() {
    setOpenEdit(true);
  }

  function handleClickCloseEdit() {
    setEditTask({});
    setOpenEdit(false);
  }

  // Open/close dialog for deleting task
  const [openDelete, setOpenDelete] = useState(false);

  function handleClickOpenDelete(taskId) {
    setOpenDelete(taskId);
  }

  function handleClickCloseDelete() {
    setOpenDelete(false);
  }
  const [errorMessage, setErrroMessage] = useState(false);
  let alert = (
    <div className="absolute bottom-20   w-fit  bg-yellow-500  px-4 py-2 rounded-sm">
      الرجاء ملئ الحقلين لإضافة مهمة جديدة.
    </div>
  );
  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (
      addTaskInfo.title.trim() === "" ||
      addTaskInfo.description.trim() === ""
    ) {
      setErrroMessage(true);
      setTimeout(() => {
        setErrroMessage(false);
      }, 3000);
      return;
    }

    const newTask = {
      id: Date.now(),
      isComplete: false,
      title: addTaskInfo.title,
      description: addTaskInfo.description,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setAddTaskInfo({ title: "", description: "" });
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  // Toggle task completion status
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };
  const showTasksCategory = () => {
    if (stateShow === "complete") {
      return tasks.filter((task) => task.isComplete === true);
    } else if (stateShow === "notComplete") {
      return tasks.filter((task) => task.isComplete === false);
    } else {
      return tasks; // "all" or default case
    }
  };
  // console.log(stateShow);
  return (
    <>
      <div className="space-y-2 p-1 overflow-auto max-h-[43vh]">
        {showTasksCategory().map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center bg-[#252F88] text-white p-2 rounded-md shadow-md hover:bg-[#1f2877] transition hover:shadow-2xl hover:scale-101"
          >
            <div className="flex flex-col w-1/2">
              <h1 className="text-lg font-bold max-h-[100px] truncate">
                {task.title}
              </h1>
              <h3 className="text-gray-300 text-sm overflow-hidden max-h-[50px] break-words">
                {task.description}
              </h3>
            </div>
            <div className="flex gap-2">
              {/* Complete Button */}
              <button
                onClick={() => handleToggleComplete(task.id)}
                className={`!cursor-pointer transition rounded-full border p-1 
    ${
      task.isComplete
        ? "bg-green-500  hover:bg-green-600"
        : "bg-white text-green-500 "
    }`}
              >
                <CheckIcon className="!text-4xl" />
              </button>

              {/* Edit Button */}
              <button className="hover:text-yellow-400 cursor-pointer transition bg-white text-yellow-600 rounded-full border p-1 focus:ring-yellow-500 focus:ring-1 focus:text-white focus:bg-yellow-400 relative">
                <span className="absolute text-black text-sm top-0 left-0 rounded-full bg-amber-300 px-2 mr-1"></span>
                <EditIcon
                  onClick={() => {
                    setEditTask(task); // Update the task to be edited
                    handleClickOpenEdit();
                  }}
                  className="!text-4xl"
                />
              </button>

              {/* Dialog for editing task */}
              <React.Fragment>
                <Dialog open={openEdit}>
                  <DialogContent>
                    <DialogContentText
                      style={{ direction: "rtl" }}
                      className="text-center"
                    >
                      قم بتعديل المهمة
                    </DialogContentText>
                    <TextField
                      value={editTask.title}
                      onChange={(e) => {
                        setEditTask({ ...editTask, title: e.target.value });
                      }}
                      style={{ direction: "rtl" }}
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="title"
                      fullWidth
                      label="اسم المهمة"
                      variant="standard"
                    />
                    <TextField
                      value={editTask.description}
                      onChange={(e) => {
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                        });
                      }}
                      autoFocus
                      style={{ direction: "rtl" }}
                      required
                      margin="dense"
                      id="name"
                      name="description"
                      label="تفاصيل المهمة "
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClickCloseEdit}>إلغاء</Button>
                    <Button type="submit" onClick={handleEditTask}>
                      تعديل
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>

              {/* Delete Button */}
              <button
                onClick={() => {
                  handleClickOpenDelete(task.id);
                }}
                className="hover:text-red-500 cursor-pointer transition bg-white text-red-600 rounded-full border p-1 hover:bg-gray-100 "
              >
                <DeleteIcon className="!text-4xl" />
              </button>

              {/* Dialog for deleting task */}
              <React.Fragment>
                <Dialog
                  open={openDelete === task.id}
                  keepMounted
                  onClose={handleClickCloseDelete}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>هل أنت متأكد من حذف المهمة؟</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      هل أنت متأكد من حذف هذه المهمة؟
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleDeleteTask(task.id);
                        handleClickCloseDelete();
                      }}
                    >
                      بالتأكيد
                    </Button>
                    <Button onClick={handleClickCloseDelete}>أتراجع</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
          </div>
        ))}

        {/* Add Task Form */}
      </div>
      <div>
        <form
          onSubmit={handleAddTask}
          className="flex lg:flex-nowrap md:flex-wrap justify-between gap-2 mx-2 p-2"
        >
          <input
            onChange={(e) =>
              setAddTaskInfo({ ...addTaskInfo, title: e.target.value })
            }
            value={addTaskInfo.title}
            type="text"
            placeholder="أدخل عنوان المهمة..."
            className="bg-white w-full text-black outline-none p-2 rounded border-2 border-gray-400 focus:border-black transition text-[12px] sm:text-lg "
          />
          <input
            onChange={(e) =>
              setAddTaskInfo({ ...addTaskInfo, description: e.target.value })
            }
            value={addTaskInfo.description}
            type="text"
            placeholder="أدخل التفاصيل هنا..."
            className="bg-white w-full  text-black outline-none p-2 rounded border-2 border-gray-400 focus:border-black transition text-[12px] sm:text-lg"
          />
          <Button
            type="submit"
            variant="contained"
            className="w-3/4 !font-bold !text-2xl !font-[Tajawal]"
            color="error"
          >
            إضافة
          </Button>
          {/* alert when textfield empty */}
        </form>
        {errorMessage && (
          <Stack
            sx={{ width: "100%", direction: "rtl", fontFamily: "Tajawal" }}
            spacing={2}
            className="!font-[Tajawal]"
          >
            <Alert severity="warning" direction="rtl">
              الرجاء ملئ الحقول لإضافة مهمة جديدة
            </Alert>
          </Stack>
        )}
      </div>
    </>
  );
};

export default ToDo;
