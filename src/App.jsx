import React from "react";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800">AI Image Enhancer{" "}</h1>
        <p className="text-lg text-gray-600 mt-4">Upload Your image and lets enhance it!</p>
      </div>
      <Home />
      <div className="text-sm text-gray-500 mt-4">
        
        Powered by @DhruvAI
      </div>
    </div>
  );
};

export default App;
