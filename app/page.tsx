'use client';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as fal from "@fal-ai/serverless-client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ModelIcon } from "@/components/icons/model-icon";
import Link from "next/link";
import ShinyButton from "@/components/magicui/shiny-button";
import { getRandomIdeas } from "@/prompts"; // Update the import path

const randomSeed = () => Math.floor(Math.random() * 10000000).toFixed(0);

fal.config({
  proxyUrl: "/api/proxy",
});

const INPUT_DEFAULTS = {
  _force_msgpack: new Uint8Array([]),
  enable_safety_checker: true,
  image_size: "square_hd",
  sync_mode: true,
  num_images: 1,
  num_inference_steps: "2",
};

export default function Lightning() {
  const [image, setImage] = useState<null | string>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [seed, setSeed] = useState<string>(randomSeed());
  const [inferenceTime, setInferenceTime] = useState<number>(NaN);

  const connection = fal.realtime.connect("fal-ai/fast-lightning-sdxl", {
    connectionKey: "lightning-sdxl",
    throttleInterval: 64,
    onResult: (result) => {
      const blob = new Blob([result.images[0].content], { type: "image/jpeg" });
      setImage(URL.createObjectURL(blob));
      setInferenceTime(result.timings.inference);
    },
  });

  const timer = useRef<any | undefined>(undefined);

  const handleOnChange = async (prompt: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setPrompt(prompt);
    const input = {
      ...INPUT_DEFAULTS,
      prompt: prompt,
      seed: seed ? Number(seed) : Number(randomSeed()),
    };
    connection.send(input);
    timer.current = setTimeout(() => {
      connection.send({ ...input, num_inference_steps: "4" });
    }, 500);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.cookie = "fal-app=true; path=/; samesite=strict; secure;";
    }
    // Set a random prompt from the available options
    const [randomPrompt] = getRandomIdeas();
    setPrompt(randomPrompt || "Default prompt if none selected");
    // initial image
    connection.send({
      ...INPUT_DEFAULTS,
      num_inference_steps: "4",
      prompt: randomPrompt || "Default prompt if none selected",
      seed: seed ? Number(seed) : Number(randomSeed()),
    });
  }, []);

  // Function to handle image download
  const handleDownload = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'adhamai.jpg'; // You can change the filename if needed
      link.click();
    }
  };

  return (
    <main>
      <head>
        <link rel="icon" href="/public/favicon.ico" />
      </head>
      <div className="flex flex-col justify-between h-[calc(100vh-56px)]">
        <div className="py-4 md:py-10 px-0 space-y-4 lg:space-y-8 mx-auto w-full max-w-xl">
          <div className="container px-3 md:px-0 flex flex-col space-y-2">
            <div className="flex flex-col max-md:space-y-4 md:flex-row md:space-x-4 max-w-full">
              <div className="flex-1 space-y-1">
                <label>Prompt</label>
                <Input
                  onChange={(e) => {
                    handleOnChange(e.target.value);
                  }}
                  className="font-light w-full bg-black text-white"
                  placeholder="Type something..."
                  value={prompt}
                />
              </div>
              <div className="space-y-1">
                <label>Seed</label>
                <Input
                  onChange={(e) => {
                    setSeed(e.target.value);
                    handleOnChange(prompt);
                  }}
                  className="font-light w-28 bg-black text-white"
                  placeholder="random"
                  type="number"
                  value={seed}
                />
                <h6 className="text-neutral-600 text-xs mt-2 md:mt-2 pt-1">Note: Change Seed For Different Generation</h6>
              </div>
            </div>
          </div>
          <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:p-0">
            <div className="flex-1 flex-col flex items-center justify-center">
              {image && inferenceTime && (
                <div className="flex flex-row space-x-1 text-sm w-full mb-2">
                  <span className="text-neutral-500">Inference time:</span>
                  <span
                    className={
                      !inferenceTime ? "text-neutral-500" : "text-green-400"
                    }
                  >
                    {inferenceTime
                      ? `${(inferenceTime * 1000).toFixed(0)}ms`
                      : `n/a`}
                  </span>
                </div>
              )}
              <div className="md:min-h-[512px] max-w-fit fade-in">
                {image && (
                  <>
                    <img id="imageDisplay" src={image} alt="Dynamic Image" />
                    <ShinyButton text="Download" className="mt-4 " onClick={handleDownload} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
