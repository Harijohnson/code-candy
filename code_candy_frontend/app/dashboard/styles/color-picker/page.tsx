'use client';
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function Page() {
  const [color, setColor] = useState("#b32aa9");

  const copyColorToClipboard = () => {
    navigator.clipboard.writeText(color).then(() => {
    //   alert("Color copied to clipboard!");
    }, (err) => {
      console.error("Failed to copy color: ", err);
    });
  };

  return (
    <div className="justify-center align-center space-around">
        <div>
            <HexColorPicker color={color} onChange={setColor} style={{ height: "50vh", width: "80vw", margin: "auto" }} />

            <div className="value bg-black hidden" style={{ borderLeftColor: color }}>
                Current color is {color}
            </div>

            <div className="justify-center text-center p-5">
            <button type="button"  onClick={copyColorToClipboard} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Copy This Color</button>
            
            </div>
        </div>
    </div>
  );
}
