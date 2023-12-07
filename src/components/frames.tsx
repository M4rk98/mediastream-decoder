import React, { useEffect, useRef } from "react";

export default function Frames({ frames }: { frames: any[] }) {
  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
      {frames.map((frame) => (
        <Frame frame={frame} />
      ))}
    </div>
  );
}

function Frame({ frame }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(frame, 300, 250, 480, 640, 0, 0, 480, 640);
      }
    }
  }, [canvasRef.current]);

  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <canvas ref={canvasRef} className="w-full rounded-2xl" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
    </article>
  );
}
