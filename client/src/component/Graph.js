import React, { useRef, useEffect } from "react";

const Graph = ({ size, data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawGraph();
  }, []);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;

    const colors = ["#F48FE4", "#E2B669", "#5868D0"];

    const total = data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i] / total) * 2 * Math.PI;
      context.fillStyle = colors[i];
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(
        centerX,
        centerY,
        radius,
        startAngle,
        startAngle + sliceAngle
      );
      context.closePath();
      context.fill();

      const angle = startAngle + sliceAngle / 2;
      const x = centerX + (radius / 2) * Math.cos(angle);
      const y = centerY + (radius / 2) * Math.sin(angle);

      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "12px Arial";
      const percentage = ((data[i] / total) * 100).toFixed(0);
      context.fillText(`${percentage}%`, x, y);

      startAngle += sliceAngle;
    }
  };

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
};

export default Graph;
