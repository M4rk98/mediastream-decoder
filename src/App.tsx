import React, { useState } from "react";

import VideoCapture from "components/video-capture";
import { cn } from "utils";
import Toggle from "components/toggle";

const content = {
  title: "Frame Forge",
  description:
    'Click "Record" to record an amazing 10s long video and check out 20 frames from it',
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={cn("h-full", { dark: darkMode })}>
      <div className="bg-white dark:bg-black py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-[100vh]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {content.title}
              <Toggle enabled={darkMode} setEnabled={setDarkMode} />
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {content.description}
            </p>
          </div>
          <VideoCapture />
        </div>
      </div>
    </div>
  );
}

export default App;
