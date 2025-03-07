import React, { useContext, useState } from "react";
import { jsPDF } from "jspdf";
import { TodoContext } from "../context/TodoContext";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const SaveFile = () => {
  const { tasks } = useContext(TodoContext);
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to generate and download the PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text("Task List", 10, 10);

    let yOffset = 20;

    tasks.forEach((task, index) => {
      doc.setFontSize(12);
      doc.setTextColor(task.isComplete ? [0, 153, 0] : [0, 0, 0]);
      doc.text(`${index + 1}. ${task.title}: ${task.description}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save("tasks_list.pdf");
  };

  return (
    <div
      onClick={generatePDF}
      className="relative w-20 h-16 mt-1 bg-green-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SaveAltIcon className="text-white !text-4xl text-center" />

      {showTooltip && (
        <div className="absolute -bottom-10 bg-green-600 text-white text-sm px-3 py-1 rounded-md shadow-lg transition-opacity duration-300 opacity-100">
          تنزيل المهام
        </div>
      )}
    </div>
  );
};

export default SaveFile;
