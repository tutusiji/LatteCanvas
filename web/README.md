使用React和Node构建实时协作的白板应用

原创 前端达人 前端达人 2023-10-20 08:01 发表于北京

https://mp.weixin.qq.com/s/hLlY786AoZ89I200bIKjEQ

在当今快速发展的数字环境中，实时协作已成为各种网络应用的重要特性。无论地理位置如何，能够无缝地共同工作已经改变了团队的协作和沟通方式。本文将展示如何使用React和Node构建一个提供实时协作白板的Web应用程序。

实时协作涉及多个用户在共同任务或项目上进行动态和即时的互动。与旧的协作方法不同，实时协作允许团队成员即时贡献、编辑和查看变更。这种即时同步促进了团队的凝聚力，并加快了决策过程，使其成为当代工作流程中不可或缺的工具。引入实时协作功能带来了许多好处：

没有地理空间限制：实时协作使远程团队能够像在同一地理位置一样进行合作。在远程工作成为常态的时代，这一功能尤为重要，使分布在全球各地的团队能够无缝协作。

一起发散思维：实时协作激发团队集思广益和分享创意，让每个人共同应对挑战并创造新鲜解决方案。

效率提升：实时协作消除了沟通延迟，让团队成员能够即时参与和贡献。这加快了问题解决速度并简化了工作流程。实时协作有不同的形式，例如：文档协作、视频会议、即时消息和聊天、项目管理工具、共同浏览、共享日历、互动演示、社交媒体协作和多人游戏。在本文中，我们将重点关注实时白板。实时白板是一种动态数字工具，在在线环境中复制了传统白板的功能。它为个人和团队提供了一个共享画布，可以实时协作，允许创造、操作和可视化想法、概念和信息。

我们的项目
使用 React 和 Node.js ，我们将深入探讨实时协作的激动人心领域，通过使用 React 和 Node.js 构建一个实时协作板。我们的项目将使用户能够实时在共享的虚拟板上工作，即时更新内容和更改，供所有参与者使用。我们将加入拖放功能，使用户可以轻松地在板上移动和排列元素，使协作更加直观和吸引人。无论您想为远程团队构建协作工具，教育平台，项目管理应用程序还是其他需要实时协作的项目，本文将为您提供开发交互式和高效实时应用程序的基本技能和知识。因此，让我们深入了解并发掘 React 和 Node.js. 的巨大潜力。为了为这个项目设置我们的React应用程序，我们将执行以下操作：

创建React应用程序：导航到您想要的目录，打开终端，并运行以下命令来创建一个新的React应用程序，使用 create-react-app ：

npx create-react-app collaborate_client
进入项目目录：要进入新创建的项目目录；

cd collaborate_client
安装依赖
在我们的项目初始化完成后，现在是时候安装必要的依赖项，以支持我们的实时协作白板了。这些依赖项包括 socket.io 用于实时通信，以及 RoughJS 用于绘图功能。

socket.io：安装 socket.io 库以建立WebSocket连接进行实时数据交换；

npm install `socket.io`
RoughJS：将rough.js库集成到协作板上，以实现绘图功能；

npm install --save roughjs
使用React创建协作板用户界面
‘Canvas’组件是我们实时协作白板的核心。Canvas是一个HTML元素，它作为一个空白画布，我们可以使用JavaScript来绘制、绘画和操作图形元素。对于用户界面，我们将创建一个 WhiteBoard 组件，用户可以在我们的 React 应用程序中操作图形元素。

使用React构建一个Canvas组件
在深入研究 RoughJS 和绘图功能之前，让我们先创建我们的 WhiteBoard 组件。在您的 React 项目中，导航到适当的目录并创建一个名为Whiteboard.js的新文件。在这个文件中，定义您的 WhiteBoard 组件：

import React, { useLayoutEffect } from "react";
const WhiteBoard = () => {
 useLayoutEffect(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // Set canvas dimensions and initial styles
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  // Implement drawing functionality here
 }, []);
 //implement event listeners for drawing interactions
 return (
  <>
   <canvas
    id="canvas"
    width={window.innerWidth}
    height={window.innerHeight}
   ></canvas>
  </>
 );
};
export default WhiteBoard;
在上面的代码中，我们导入了必要的依赖项，创建了一个 WhiteBoard 功能组件，并利用了 React 提供的 useLayoutEffect 钩子。在 useLayoutEffect 钩子内部，我们访问 canvas 元素及其2D渲染上下文，以配置其尺寸和初始样式。

在Canvas组件中集成RoughJS
RoughJS 是一个轻量级的库，可以让我们在画布上创建手绘、草图般的图形。通过集成 RoughJS ，我们可以将普通的白板变成一个创意的游乐场，线条、形状和纹理以有机、手工制作的感觉栩栩如生。要将 WhiteBoard 组件与组件文件中的 RoughJS 进行增强，请按照以下方式更新代码：

import React, { useLayoutEffect } from "react";
import rough from "roughjs";
const WhiteBoard = () => {
 useLayoutEffect(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // Initialize RoughJS instance
  const roughCanvas = rough.canvas(canvas);
  // Set canvas initial styles
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  // Add event listeners for drawing interactions
  // Implement drawing functionality here
 }, []);
 return (
  <>
   <canvas
    id="canvas"
    width={window.innerWidth}
    height={window.innerHeight}
   ></canvas>
  </>
 );
};
export default WhiteBoard;
在更新的代码中，我们导入了 RoughJS 库，并使用 rough.canvas() 方法创建了一个实例，将其与我们的 canvas 元素关联起来。这个实例存储在 roughCanvas 中，它将允许我们应用 RoughJS 的基本图形和效果，从而可以在白板上绘制。使用 RoughJS，我们可以绘制各种形状、线条和阴影，无限可能。在本文中，我们将介绍如何在白板上绘制线条和矩形。您可以在此基础上进一步了解并添加其他RoughJS支持的形状和功能。

在我们的画布上画线
使用 RoughJS 在我们的 canvas 上画线，我们需要按照以下步骤进行；

初始化绘图状态：首先设置必要的状态以跟踪绘图交互：

const [drawing, setDrawing] = useState(false);
const [elements, setElements] = useState([]);
处理鼠标按下事件：当用户按下鼠标按钮开始绘图时，我们将设置 drawing 状态为true，并创建一个新元素。在 handleMouseDown 函数中，我们利用初始 clientX 和 clientY 值来标记绘图的起点。当用户点击鼠标时，我们希望记录点击发生的位置，因为这将是他们即将绘制的线条的起点。

const handleMouseDown = (e) => {
 setDrawing(true);
 const { clientX, clientY } = e;
 // Create a new line element with the same start and end points
 const element = createElement(clientX, clientY, clientX, clientY);
 setElements((prevState) => [...prevState, element]);
};
处理鼠标移动事件：在鼠标按钮仍按下的情况下，我们不断更新在 handleMouseDown 中创建的元素，以鼠标当前路径为用户在 canvas 上移动鼠标时的路径

const handleMouseMove = (e) => {
 if (!drawing) return;
 const { clientX, clientY } = e;
 const index = elements.length - 1;
 const { x1, y1 } = elements[index];
 // Update the end point of the element and create an element
 const updatedElement = createElement(x1, y1, clientX, clientY);
 const elementsCopy = [...elements];
 elementsCopy[index] = updatedElement;
 setElements(elementsCopy);
};
创建我们的线：鼠标坐标将被发送到 createElement 函数，该函数利用 RoughJS 库生成元素的手绘表示。然后，该函数返回坐标和 RoughJS 元素，这些将被存储在我们的 elements 状态中。

const createElement = (x1, y1, x2, y2) => {
 // Use the RoughJS generator to create a rough element (line or rectangle)
 const roughElement = generator.line(x1, y1, x2, y2);
 // Return an object representing the element, including its coordinates and RoughJS representation
 return { x1, y1, x2, y2, roughElement };
};
渲染我们的元素：使用我们的 useLayoutEffect 函数，在每次更新 elements 状态时，我们渲染存储在 state 中的元素。

useLayoutEffect(() => {
 // 通过ID获取画布元素
 const canvas = document.getElementById("canvas");
 // 获取画布的2D渲染上下文
 const ctx = canvas.getContext("2d");
 // 创建与画布元素相关联的RoughJS画布实例
 const roughCanvas = rough.canvas(canvas);
 // 设置画布上下文的描边样式和线宽
 ctx.strokeStyle = "black";
 ctx.lineWidth = 5;
 // 清除整个画布以确保获得干净的绘图表面
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 // 如果有保存的元素需要渲染
 if (elements && elements.length > 0) {
  // 遍历每个保存的元素
  elements.forEach(({ roughElement }) => {
   // 使用RoughJS在画布上绘制元素
   roughCanvas.draw(roughElement);
  });
 }
}, [elements]); // 此效果依赖于 'elements' 状态；当其更改时重新运行
处理鼠标松开事件：当用户释放鼠标按钮时，我们将 drawing 状态设置为false，停止绘图过程；

const handleMouseUp = (e) => {
 setDrawing(false);
};
通过实施这些步骤，用户可以通过点击和拖动鼠标光标在 canvas 上绘制线条。这是具有在我们的 canvas 上绘制线条功能的 WhiteBoard 组件。

import React, { useState, useLayoutEffect } from "react";
import rough from "roughjs/bundled/rough.esm.js";

// 创建一个 RoughJS 生成器实例
const generator = rough.generator();

const WhiteBoard = () => {
  // 状态用于管理绘图元素和交互
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  // useLayoutEffect: 负责渲染绘图元素
  useLayoutEffect(() => {
    // 通过ID获取画布元素
    const canvas = document.getElementById("canvas");
    // 获取画布的2D渲染上下文
    const ctx = canvas.getContext("2d");
    // 创建与画布元素相关联的 RoughJS 画布实例
    const roughCanvas = rough.canvas(canvas);
    // 为画布上下文设置描边样式和线宽
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    // 清除整个画布以确保一个干净的绘制表面
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 如果有保存的元素需要渲染
    if (elements && elements.length > 0) {
      // 遍历每个保存的元素
      elements.forEach(({ roughElement }) => {
        // 使用 RoughJS 在画布上绘制元素
        roughCanvas.draw(roughElement);
      });
    }
  }, [elements]);

  // 函数用于创建新的绘图元素
  const createElement = (x1, y1, x2, y2) => {
    // 使用 RoughJS 生成器创建一个粗糙元素（线条或矩形）
    const roughElement = generator.line(x1, y1, x2, y2);
    // 返回一个表示元素的对象，包括其坐标和 RoughJS 表示
    return { x1, y1, x2, y2, roughElement };
  };

  // 鼠标按下的事件处理程序
  const handleMouseDown = (e) => {
    setDrawing(true);
    const { clientX, clientY } = e;
    // 当检测到鼠标按下时，创建一个新的绘图元素
    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);
  };

  // 鼠标移动的事件处理程序
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { clientX, clientY } = e;
    // 找到鼠标按下时创建的最后一个元素的索引
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    // 更新元素的坐标以进行动态绘制
    const updatedElement = createElement(x1, y1, clientX, clientY);
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  // 鼠标抬起的事件处理程序
  const handleMouseUp = () => {
    setDrawing(false);
  };

  // 返回 JSX 以渲染协作画布
  return (
    <>
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </>
  );
};

export default WhiteBoard;
让我们测试一下我们的应用程序：

图片

让我们来测试我们的应用程序：上面的视频显示我们的代码可以工作，并且可以使用鼠标坐标在我们的白板上绘制线条。

在我们的画布上画矩形线条
在我们的白板上绘制矩形的过程与绘制直线几乎相同，只有在使用 createElement 函数时才会有所变化。在我们看到 createElement 函数的更新之前，让我们先创建一个状态来存储用户打算使用的当前工具。

const [tool, setTool] = useState('line');
默认情况下，该工具设置为在线条上。现在我们可以更新我们的 createElement 函数以适应矩形。

const createElement = (x1, y1, x2, y2) => {
  let roughElement;
  // 使用 RoughJS 生成器创建粗糙元素（线条或矩形）
  if (tool === "line") {
    roughElement = generator.line(x1, y1, x2, y2);
  } else if (tool === "rect") {
    roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  }
  // 返回一个表示元素的对象，包括其坐标和 RoughJS 表示
  return { x1, y1, x2, y2, roughElement };
};
现在，我们需要添加按钮，让用户可以选择在我们的画布上使用哪种工具。

return (
 <>
  <div className="d-flex col-md-2 justify-content-center gap-1">
   <div className="d-flex gap-1 align-items-center">
    <label htmlFor="line">Line</label>
    <input
     type="radio"
     id="line"
     name="tool"
     value="line"
     checked={tool === "line"}
     className="mt-1"
     onChange={(e) => setTool(e.target.value)}
    />
   </div>
   <div className="d-flex gap-1 align-items-center">
    <label htmlFor="rect">Rectangle</label>
    <input
     type="radio"
     name="tool"
     id="rect"
     checked={tool === "rect"}
     value="rect"
     className="mt-1"
     onChange={(e) => setTool(e.target.value)}
    />
   </div>
  </div>
  <canvas
   id="canvas"
   onMouseDown={handleMouseDown}
   onMouseUp={handleMouseUp}
   onMouseMove={handleMouseMove}
   width={window.innerWidth}
   height={window.innerHeight}
  ></canvas>
 </>
);
现在，让我们测试我们的应用程序：

图片

现在，让我们来测试我们的应用程序：从上面的视频中，我们可以看到当我们选择矩形时，我们可以根据鼠标坐标在我们的白板上绘制矩形。

增强互动性：启用拖放功能
为了让用户能够在画布上拖放元素，我们将采取以下措施：

介绍选择工具：我们将为用户提供一个由单选按钮指示的选择工具。当选中按钮时，该工具将允许用户与现有元素进行交互和移动。

<input
  type="radio"
  id="selection"
  checked={tool === "selection"}
  onChange={() => setTool("selection")}
  />
<label htmlFor="selection">Drag n Drop</label>
检测光标悬停在元素上：为了确定光标是否悬停在元素上，我们将实现一个名为 getElementAtPosition 的函数。该函数将在鼠标按下时判断光标是否在任何现有 elements 的边界内。

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y) => {
  // 遍历 'elements' 数组中的每个元素
  return elements.find((element) => {
    const { elementType, x1, y1, x2, y2 } = element;
    // 根据元素类型（线条或矩形），执行不同的检查
    if (elementType === "rect") {
      // 检查光标位置（x, y）是否在矩形的边界内
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
      // 使用数学偏移量检查光标是否足够接近线条
      const a = { x: x1, y: y1 };
      const b = { x: x2, y: y2 };
      const c = { x, y };
      const offset = distance(a, b) - (distance(a, c) + distance(b, c));
      return Math.abs(offset) < 1;
    }
  });
};
getElementAtPosition 函数以当前光标坐标（x和y）作为参数。然后我们使用 .find() 方法遍历元素数组，该数组包含画布上的所有绘图元素。我们为数组中的每个元素检索 elementType 及其当前坐标。如果元素是一个矩形，我们计算最小和最大的 x 和 y 值来定义矩形的边界。然后我们检查光标的 x 坐标是否在矩形的 x 边界范围内，并且光标的 y 坐标是否在矩形的 y 边界范围内。如果两个条件都为真，则光标位于矩形上方，因此我们的函数返回true。如果元素是一条线，我们计算光标坐标与由元素的 x1 、 y1 、 x2 和 y2 属性定义的线段之间的距离。然后我们将计算出的偏移量与一个小的阈值（在本例中为1）进行比较。如果偏移量的绝对值小于阈值，则认为光标位于线段附近，因此我们的函数返回true。 如果光标没有定位在任何现有元素上，该函数将返回false。

存储可拖动的元素：当用户在选择工具处于活动状态且光标位于元素上方时按下鼠标时，我们将把该元素及光标与元素左上角之间的初始偏移量存储在一个状态中。

const handleMouseDown = (e) => {
  const { clientX, clientY } = e;
  // 检查当前工具是否为 "Selection"
  if (tool === "selection") {
    // 在点击位置查找元素
    const element = getElementAtPosition(clientX, clientY);
    // 如果找到元素
    if (element) {
      // 计算相对于元素左上角的偏移
      const offsetX = clientX - element.x1;
      const offsetY = clientY - element.y1;
      // 存储选定的元素以及偏移量
      setSelectedElement({ ...element, offsetX, offsetY });
      // 将操作设置为 "moving"，表示拖动正在进行中
      setAction("moving");
    }
  } else {
    // 如果工具不是 "Selection"，执行绘图的代码
    // ...（用于绘制的代码）
  }
};
更新元素坐标：在 handleMouseMove 函数中，当用户处于“移动”状态（即拖动元素）时，我们根据鼠标光标的位置和初始偏移量计算元素的新位置。然后使用 updateElement 函数更新元素的坐标。

const handleMouseMove = (e) => {
  const { clientX, clientY } = e;
  // 检查当前工具是否为 "Selection"
  if (tool === "selection") {
    // 根据鼠标是否在元素上确定光标样式
    e.target.style.cursor = getElementAtPosition(clientX, clientY, elements)
      ? "move"
      : "default";
  }
  // 检查当前操作
  if (action === "drawing") {
    // ...（用于绘制的代码）
  } else if (action === "moving") {
    // 如果处于 "moving" 操作中（拖动元素）
    const { id, x1, x2, y1, y2, elementType, offsetX, offsetY } =
      selectedElement;
    const width = x2 - x1;
    const height = y2 - y1;
    // 计算被拖动元素的新位置
    const newX = clientX - offsetX;
    const newY = clientY - offsetY;
    // 更新元素的坐标以执行拖动操作
    const updatedElement = createElement(
      id,
      newX,
      newY,
      newX + width,
      newY + height,
      elementType
    );
    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  }
};
按照这些步骤，我们为我们的画布添加了动态拖放功能。用户现在可以轻松地与现有元素进行交互，将它们在画布上移动。

图片

使用Node.js创建实时通信服务器
一个强大的协作体验需要一个能够无缝处理用户之间实时通信的服务器。为了设置我们的服务器，我们将执行以下操作：

安装所需的依赖项
在开始服务器设置之前，我们必须确保我们的工具包中有必要的工具。使用以下命令在我们的服务器上安装所需的依赖项：

npm install express cors socket.io
Express ：一个受欢迎且灵活的Node.js框架，简化了构建强大的Web应用程序和API的过程。它提供了中间件和路由功能，非常适合创建服务器端应用程序。

CORS （跨域资源共享）：一种中间件包，用于启用跨域请求。在我们的情况下，我们将使用它来确保我们的客户端应用程序（运行在不同的源上）可以与服务器进行交互。

Socket.io ：一个实时通信库，方便客户端和服务器之间的双向通信。它通过WebSocket连接工作，但在必要时也能优雅地降级到其他传输机制。

配置Express和导入依赖项：
开始服务器设置，创建一个名为server.js（或您选择的文件名）的文件。

touch server.js
然后我们将导入依赖项并为 Express 设置配置：

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
配置CORS并启动服务器：
为了确保跨源通信的正常进行，我们将配置CORS设置并启动服务器：

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
 cors: {
  origin: "http://localhost:3000", // Specify your front-end origin
  AccessControlAllowOrigin: "http://localhost:3000",
  allowedHeaders: ["Access-Control-Allow-Origin"],
  credentials: true,
 },
});
httpServer.listen(PORT, () => {
 console.log(`Server is listening on port ${PORT}`);
});
在这个设置中，我们创建了一个 Express 应用程序，并设置了 CORS 配置，以允许客户端（在端口3000上运行）和服务器之间的通信。 socket.io 库已集成到 httpServer 实例中，实现实时通信。

实施实时通信
为了实现用户之间的实时协作，我们需要配置我们的客户端（React应用程序），通过更新我们的Canvas组件来连接到我们的服务器，代码如下：

const [socket, setSocket] = useState(null);

// useEffect 钩子用于建立和管理套接字连接
useEffect(() => {
  // 定义服务器 URL
  const server = "http://localhost:5000";

  // 套接字连接的配置选项
  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  // 建立新的套接字连接
  const newSocket = io(server, connectionOptions);
  setSocket(newSocket);

  // 用于成功连接的事件监听器
  newSocket.on("connect", () => {
    console.log("已连接到 newSocket.io 服务器！");
  });

  // 用于从服务器接收服务元素的事件监听器
  newSocket.on("servedElements", (elementsCopy) => {
    setElements(elementsCopy.elements);
  });

  // 在组件卸载时清理套接字连接
  return () => {
    newSocket.disconnect();
  };
}, []); // 空的依赖数组确保该效果仅在组件挂载时运行一次
我们将利用 socket.io 的事件驱动架构，采用其 on 和 emit 机制，以促进客户端和服务器之间的无缝数据传输。在客户端方面，我们将增强 updateElement 功能，使其在每次元素更新时将数据传输到服务器。

const updateElement = (id, x1, y1, x2, y2, tool) => {
 const UpdatedElement = createElement(id, x1, y1, x2, y2, tool);
 const elementsCopy = [...elements];
 elementsCopy[id] = UpdatedElement;
 setElements(elementsCopy);
 socket.emit("elements", elementsCopy);
};
随后，我们的服务器将把接收到的数据发送给网络中的其他连接客户端。这确保了所有参与者之间的实时同步和协作。

let connections = [];
let elements;
socket.on("elements", (data) => {
 elements = data;
 connections.forEach((con) => {
  if (con.id !== socket.id) {
   con.emit("servedElements", { elements });
  }
 });
});
当数据传递给其他客户端时，我们将更新接收到的状态，从而导致重新渲染，从而在画布上绘制更新后的元素

new socket.on("servedElements", (elementsCopy) => {
 setElements(elementsCopy.elements);
});
完成此操作后，每当一个客户端进行更新时，连接到我们服务器的所有其他客户端都会收到更新。现在，让我们测试我们的应用程序：

图片

完成这个后，每当一个客户端进行更新，所有连接到我们服务器的其他客户端都会收到更新。现在，让我们测试我们的应用程序：从上面的视频中，我们可以看到一旦一个客户端开始绘图，其他客户端会收到更新并可以添加到绘图中，从而实现所有客户端在网络上的实时协作。

案例源码
https://github.com/King-AJr/collaborative_board

结束
在本文中，我们踏上了一个令人兴奋的旅程，创建了一个由 React.js 和 Node.js 强力驱动的实时协作板，同时结合了 socket.io 和 RoughJS 这些强大的工具。我们还深入探讨了无缝团队合作的领域，重点是在画布上绘制线条和矩形，并实现拖放功能。此外，还可以将更多的形状和功能集成到这个项目中。除了我们已经探索过的内容， RoughJS 提供了丰富的灵感，可以增强您的创作。凭借 React.js 、 Node.js 和在这里获得的见解，您可以为您的项目注入实时协作的魔力。