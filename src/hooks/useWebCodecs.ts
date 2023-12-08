import { useCallback, useEffect, useState } from "react";

const config = {
  codec: "vp8",
  width: 640,
  height: 480,
};

export default function useWebCodecs() {
  const [encoder, setEncoder] = useState<any>();
  const [decoder, setDecoder] = useState<any>();
  const [chunks, setChunks] = useState<any>([]);
  const [frames, setFrames] = useState<any>([]);
  function handleChunk(chunk: any) {
    setChunks((val: any) => [...val, chunk]);
  }

  function handleFrame(frame: any) {
    setFrames((val: any) => [...val, frame]);
  }

  const getEncoder = useCallback(async () => {
    const { supported } = await (window as any).VideoEncoder.isConfigSupported(
      config,
    );
    if (supported) {
      const videoEncoder = new (window as any).VideoEncoder({
        output: handleChunk,
        error: (e: any) => {
          console.log(e.message);
        },
      });
      videoEncoder.configure(config);
      setEncoder(videoEncoder);
    }
    return null;
  }, []);

  const getDecoder = useCallback(async () => {
    const { supported } = await (window as any).VideoDecoder.isConfigSupported(
      config,
    );
    if (supported) {
      const videoDecoder = new (window as any).VideoDecoder({
        output: handleFrame,
        error: (e: any) => {
          console.log(e.message);
        },
      });
      videoDecoder.configure(config);
      setDecoder(videoDecoder);
    }
    return null;
  }, []);

  useEffect(() => {
    getEncoder();
    getDecoder();
  }, []);

  return {
    encoder,
    chunks,
    frames,
    decoder,
  };
}
