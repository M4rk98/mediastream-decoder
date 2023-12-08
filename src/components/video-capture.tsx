import React, { useCallback, useEffect, useRef, useState } from "react";

import useWebCodecs from "hooks/useWebCodecs";
import Frames from "components/frames";
import { cn } from "utils";

const content = {
  cta: "Record",
  processing: "Processing...",
};

function Spinner() {
  return (
    <svg className="inline animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function VideoCapture() {
  const { encoder, decoder, chunks, frames } = useWebCodecs();

  const [captureInterval, setCaptureInterval] = useState<NodeJS.Timer>();
  const [streamTracks, setStreamTracks] = useState<MediaStreamTrack[]>();
  const [counter, setCounter] = React.useState(0);
  const counterRef = useRef(counter);

  /**
   * Whenever the number of captured frames changes we trigger this side effect
   */
  useEffect(() => {
    counterRef.current = counter;
    if (counter !== 20) return;

    // Once have 20 frames we can stop capturing them
    clearInterval(captureInterval);
    setCaptureInterval(undefined);
    encoder.flush();
    // Stop the camera
    streamTracks?.forEach(function (track) {
      track.stop();
    });
  }, [counter]);

  /**
   * Once the capturing & encoding finished we can decode the EncodedVideoChunks
   */
  useEffect(() => {
    if (chunks.length !== 0 && !captureInterval) {
      chunks.forEach((chunk: any) => {
        decoder.decode(chunk);
      });
      decoder.flush();
    }
  }, [chunks]);

  const captureFrame = useCallback(
    async (reader: any) => {
      if (!encoder) return;
      const result = await reader.read();
      const frame = result.value;

      /**
       * Here would be the right place to apply any patterns to the frame
       * I wasn't sure about the exact requirements about this so I thought
       * it's probably worth clarifying before going any further
       *
       * "Capture in the pattern (0 = black, 1 - white): 00110011001100110011"
       * this can have multiple interpretations. It's safe to assume that the frames
       * and pixels in each frame should probably be matched to the pattern
       * in some way making all or some pixels black or white
       */

      // We use the counter in a side effect to stop capturing frames once we have 20
      setCounter((count) => count + 1);
      encoder.encode(frame, {
        keyframe: counterRef.current === 1 || counterRef.current === 20,
      });

      frame.close();
    },
    [encoder],
  );

  const startCapture = async () => {
    // Turn on user's camera and store Stream traccks so we can turn it off once we have all the frames
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const tracks = stream.getVideoTracks();
    const track = tracks[0];
    setStreamTracks(tracks);

    // reset frame counter
    setCounter(0);
    const trackProcessor = new (window as any).MediaStreamTrackProcessor(track);
    const reader = trackProcessor.readable.getReader();

    // Capture a frame every 0,5 second to get 20 frames in 10 seconds
    const interval = setInterval(() => captureFrame(reader), 500);
    setCaptureInterval(interval);
  };

  const ctaClassName = cn(
    "mt-4 rounded-lg mx-auto bg-indigo-600 px-4 py-2.5 text-lg font-light text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    { "hover:bg-indigo-600": captureInterval },
  );
  return (
    <div className="text-center">
      <button
        disabled={Boolean(captureInterval)}
        onClick={startCapture}
        type="button"
        className={ctaClassName}
      >
        {captureInterval ? (
          <span>
            <Spinner />
            {content.processing} {counter} / 20
          </span>
        ) : (
          content.cta
        )}
      </button>
      <Frames frames={frames} />
    </div>
  );
}

export default VideoCapture;
