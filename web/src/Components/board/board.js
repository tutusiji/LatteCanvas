/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import io from "socket.io-client";
import rough from "roughjs/bundled/rough.esm.js";

// Create a RoughJS generator instance 创建一个RoughJS生成器实例

const generator = rough.generator();

// Board Component: Handles collaborative drawing on canvas :处理画布上的协作绘图
const Board = () => {
  // State for managing drawing elements and interactions 用于管理绘图元素和交互的状态
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("freehand");
  const [selectedElement, setSelectedElement] = useState(null);
  const [socket, setSocket] = useState(null);
  const [drawing, setDrawing] = useState(false); // 新状态来追踪是否正在绘制

  useEffect(() => {
    const server = "http://draw.joox.cc:5000";
    const connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };

    const newSocket = io(server, connectionOptions);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to newSocket.io server!");
    });

    newSocket.on("servedElements", (elementsCopy) => {
      setElements(elementsCopy.elements);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // UseLayoutEffect: Responsible for rendering drawing elements
  useLayoutEffect(() => {
    // Get the canvas element by its ID
    const canvas = document.getElementById("canvas");

    // Get the 2D rendering context of the canvas
    const ctx = canvas.getContext("2d");

    // Create a RoughJS canvas instance associated with the canvas element
    const roughCanvas = rough.canvas(canvas);

    // Clear the entire canvas to ensure a clean drawing surface
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If there are saved elements to render
    if (elements && elements.length > 0) {
      // Iterate through each saved element
      elements.forEach(({ roughElement }) => {
        // Use RoughJS to draw the element on the canvas
        roughCanvas.draw(roughElement);
      });
    }
  }, [elements]);

  // Function to create a new drawing element
  const createElement = (id, x1, y1, x2, y2, elementType) => {
    let roughElement;
    switch (elementType) {
      case "line":
        roughElement = generator.line(x1, y1, x2, y2);
        break;
      case "rect":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        break;
      case "freehand":
        // 自由手绘模式仅接收初始点
        roughElement = generator.curve([[x1, y1]]);
        break;
      // 可以添加更多元素类型的处理
    }

    return {
      id,
      elementType,
      x1,
      y1,
      x2,
      y2,
      roughElement,
      points: elementType === "freehand" ? [[x1, y1]] : [],
    };
  };

  const distance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  const getElementAtPosition = (x, y) => {
    return elements.find((element) => {
      const { elementType, x1, y1, x2, y2 } = element;
      if (elementType === "rect") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
      } else {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < 1;
      }
    });
  };

  // Event handler for mouse down
  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
        setAction("moving");
      }
    } else {
      const { clientX, clientY } = e;
      const id = elements.length;
      // Create a new drawing element when mouse down is detected
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setAction("drawing");
    }
    if (tool === "freehand") {
      setDrawing(true); // 开始绘制
      const { clientX, clientY } = e;
      const element = createElement(
        elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
    }
  };

  const updateElement = (id, x, y, tool, x2, y2) => {
    const elementsCopy = [...elements];
    const element = elementsCopy[id];

    if (tool === "freehand") {
      // 自由手绘模式，只需更新点的数组
      element.points = [...element.points, [x, y]];
      element.roughElement = generator.curve(element.points, {
        roughness: 1,
        strokeWidth: 1,
      });
    } else {
      // 对于其他工具，如直线或矩形，使用传统的更新逻辑
      const updatedElement = createElement(
        id,
        element.x1,
        element.y1,
        x2,
        y2,
        tool
      );
      elementsCopy[id] = updatedElement;
    }

    setElements(elementsCopy);
    socket.emit("elements", elementsCopy);
  };

  // Event handler for mouse move
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    if (tool === "selection") {
      e.target.style.cursor = getElementAtPosition(clientX, clientY, elements)
        ? "move"
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      if (tool !== "freehand") {
        // 对于非自由手绘的工具
        updateElement(index, x1, y1, tool, clientX, clientY);
      }
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, elementType, offsetX, offsetY } =
        selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX = clientX - offsetX;
      const newY = clientY - offsetY;
      // 更新移动的元素
      updateElement(id, newX, newY, elementType, newX + width, newY + height);
    }

    if (drawing && tool === "freehand") {
      const index = elements.length - 1;
      // 对于自由手绘的工具
      updateElement(index, clientX, clientY, tool);
    }
  };

  // Event handler for mouse up
  const handleMouseUp = () => {
    setAction("none");
    setSelectedElement(null);
    if (tool === "freehand") {
      setDrawing(false); // 停止绘制
    }
  };

  // 获取触摸位置
  const getTouchPosition = (touchEvent) => {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  };

  // 触摸开始
  const handleTouchStart = (e) => {
     e.preventDefault();
    const position = getTouchPosition(e);
    handleMouseDown({
      ...e,
      clientX: position.x,
      clientY: position.y,
    });
  };

  // 触摸移动
  const handleTouchMove = (e) => {
     e.preventDefault();
    const position = getTouchPosition(e);
    handleMouseMove({
      ...e,
      clientX: position.x,
      clientY: position.y,
    });
  };

  // 触摸结束
  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // Return JSX to render the collaborative canvas
  return (
    <>
      <div style={{ position: "fixed", zIndex: 2 }}>
        <div style={{ position: "fixed", zIndex: 2 }}>
          {/* <input
            type="radio"
            id="selection"
            checked={tool === "selection"}
            onChange={() => setTool("selection")}
          />
          <label htmlFor="selection">Drag n Drop</label> */}
          <label htmlFor="freehand">
            <input
              type="radio"
              id="freehand"
              checked={tool === "freehand"}
              onChange={() => setTool("freehand")}
            />
            Freehand
          </label>
          <input
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
          />
          <label htmlFor="line">Line</label>
          <input
            type="radio"
            id="rectangle"
            checked={tool === "rect"}
            onChange={() => setTool("rect")}
          />
          <label htmlFor="rectangle">Rectangle</label>
        </div>
      </div>
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        width={window.innerWidth}
        height={window.innerHeight - 20}
      ></canvas>
    </>
  );
};

export default Board;
