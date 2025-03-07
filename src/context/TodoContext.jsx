import { createContext, useState } from "react";
export const TodoContext = createContext([]);

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "قراءة 3 كتب",
      description: "الإنجاز قبل نهاية الشهر",
      isComplete: false,
    },
    {
      id: 2,
      title: "ممارسة البرمجة يومياً",
      description: "ساعة واحدة يومياً على الأقل",
      isComplete: false,
    },
    {
      id: 3,
      title: "التمرين في الجيم",
      description: "3 مرات في الأسبوع",
      isComplete: false,
    },
  ]);

  return (
    <TodoContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TodoContext.Provider>
  );
};
