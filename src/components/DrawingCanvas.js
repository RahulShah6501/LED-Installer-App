import React, { useRef, useEffect } from "react";

// Forward ref to allow parent components to access the canvas element
const DrawingCanvas = React.forwardRef(({ selectedModel }, forwardedRef) => {
  const internalCanvasRef = useRef(null); // Internal ref for the canvas

  useEffect(() => {
    const canvas = forwardedRef?.current || internalCanvasRef.current; // Use forwarded ref or internal ref
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Example: Drawing a sample diagram
    ctx.fillStyle = "#ffcc00"; // Fill color for the rectangle
    ctx.fillRect(50, 50, 150, 100); // Example rectangle for the diagram

    // Add text displaying the selected model
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000"; // Text color
    ctx.fillText(`Model: ${selectedModel || "N/A"}`, 10, 20);
  }, [selectedModel, forwardedRef]);

  return (
    <canvas
      ref={(el) => {
        internalCanvasRef.current = el;
        if (typeof forwardedRef === "function") {
          forwardedRef(el); // Support functional refs
        } else if (forwardedRef) {
          forwardedRef.current = el; // Assign to forwarded ref
        }
      }}
      width={400}
      height={300}
      style={{ border: "1px solid black" }}
    />
  );
});

export default DrawingCanvas;
