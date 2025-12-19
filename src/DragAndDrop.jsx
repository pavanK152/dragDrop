import React, { useState, useRef } from "react";

const DragAndDrop = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  const mainHeadings = Object.keys(data);

  const dragItem = useRef();
  const dragOverItem = useRef();

  function handleStartDrag(e, task, heading, idx) {
    e.target.style.opacity = 0.5;
    dragItem.current = {
      task,
      heading,
      idx,
    };
  }
  function handleDragEnd(e) {
    e.target.style.opacity = 1;
  }

  function handleDragEnter(e, idx, heading) {
    dragOverItem.current = { idx, heading };
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop() {
    const source = dragItem.current;
    const dest = dragOverItem.current;
    if (!source || !dest) return NULL;
    setData((prev) => {
      let newSourceList = [...prev[source.heading]];
      let newDestinationList = [...prev[dest.heading]];

      const [removedItem] = newSourceList.splice(source.idx, 1);
      newDestinationList.splice(dest.idx, 0, removedItem);

      return {
        ...prev,
        [source.heading]: newSourceList,
        [dest.heading]: newDestinationList,
      };
    });
  }
  return (
    <div style={style.root}>
      {mainHeadings.map((heading) => {
        return (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={style?.container}
            key={heading}
          >
            <p style={style?.heading}>{heading.replace("_", " ")}</p>
            <div style={style.tasksContainer}>
              {data[heading].map((task, idx) => {
                return (
                  <div
                    draggable={true}
                    onDragStart={(e) => {
                      handleStartDrag(e, task, heading, idx);
                    }}
                    onDragEnd={handleDragEnd}
                    onDragEnter={(e) => {
                      handleDragEnter(e, idx, heading);
                    }}
                    style={style.task}
                    key={task.id}
                  >
                    <p style={style.taskTitle}>{task.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DragAndDrop;

const style = {
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "24px 40px",
    backgroundColor: "#F6F8FA",
    boxSizing: "border-box",
  },

  container: {
    width: "32%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  heading: {
    fontSize: "1.25rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 16,
    color: "#2E3A59",
  },

  tasksContainer: {
    padding: 16,
    border: "1px dashed #B6C2A1",
    width: "100%",
    backgroundColor: "#F1F7E8",
    borderRadius: 14,
    display: "flex",
    gap: 12,
    flexDirection: "column",
    alignItems: "center",
    minHeight: 300,
  },

  task: {
    width: "90%",
    padding: "14px 12px",
    backgroundColor: "#6F8F72",
    color: "#FFFFFF",
    borderRadius: 12,
    fontSize: "0.95rem",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "grab",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  taskTitle: {
    textAlign: "center",
    userSelect: "none",
  },
};
