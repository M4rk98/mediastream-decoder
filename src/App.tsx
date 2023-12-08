import React from "react";

import VideoCapture from "components/video-capture";

const content = {
  title: "Frame Forges",
  description:
    "Click &quot;Start&quot; to record an amazing 10s long video and check out 20 frames from it",
};

function App() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {content.description}
          </p>
        </div>
        <VideoCapture />
      </div>
    </div>
  );
}

export default App;
