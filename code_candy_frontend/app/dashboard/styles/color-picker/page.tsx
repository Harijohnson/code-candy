'use client';
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Color from 'color';

export default function Page() {
  const [color, setColor] = useState("#b32aa9");
  const [opacity, setOpacity] = useState(1); // State for opacity

  const copyColorToClipboard = (colorCode: string) => {
    navigator.clipboard.writeText(colorCode).then(() => {
      //   alert("Color copied to clipboard!");
    }, (err) => {
      console.error("Failed to copy color: ", err);
    });
  };

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseFloat(event.target.value));
  };

  const colorObj = Color(color).alpha(opacity);
  
  // Color format conversions
  const rgbaColor = colorObj.rgb().string(); // RGBA
  const rgbColor = colorObj.rgb().string(); // RGB
  const hsbColor = colorObj.hsv().string(); // HSV
  const hexColor = colorObj.hex(); // HEX
  const hexShortColor = colorObj.hex().substring(0, 7); // Short HEX
  const hexAlphaColor = colorObj.alpha() ? colorObj.hex().toUpperCase() : colorObj.hex(); // HEX with Alpha
  const hslColor = colorObj.hsl().string(); // HSL
  
  // Manually create HSLA string
  const { h, s, l } = colorObj.hsl();
  const hslaColor = colorObj.alpha() 
    ? `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${colorObj.alpha()})` 
    : hslColor;

  const labColor = colorObj.lab().string(); // LAB
  const lchColor = colorObj.lch().string(); // LCH
  const cmykColor = colorObj.cmyk().string(); // CMYK
  const xyzColor = colorObj.xyz().string(); // XYZ

  return (
    <div className="justify-center align-center space-around">
      <div>
        <HexColorPicker color={color} onChange={setColor} style={{ height: "50vh", width: "80vw", margin: "auto" }} />

        <div className="value bg-black hidden" style={{ borderLeftColor: color }}>
          Current color is {color}
        </div>

        <div className="flex justify-center items-center p-3">
          <div className="text-center">
            <p className="text-black p-3">Opacity: {Math.round(opacity * 100)}%</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={handleOpacityChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-center items-center p-3 rounded-lg">
            <div className="text-center">
              <p className="text-black p-3">Preview Color</p>
              <div style={{ backgroundColor: rgbaColor, height: "20vh", width: "80vw", margin: "auto" }} className="rounded-lg">
              </div>
          </div>
        </div>
        <div className="justify-center text-center p-5">
          <button
            type="button"
            onClick={() => copyColorToClipboard(hexColor)}
            className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy HEX {hexColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(rgbaColor)}
            className="text-black bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy RGBA {rgbaColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(rgbColor)}
            className="text-black bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy RGB {rgbColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(hsbColor)}
            className="text-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy HSV {hsbColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(hslColor)}
            className="text-black bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy HSL {hslColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(hslaColor)}
            className="text-black bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy HSLA {hslaColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(labColor)}
            className="text-black bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy LAB {labColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(lchColor)}
            className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy LCH {lchColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(cmykColor)}
            className="text-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy CMYK {cmykColor}
          </button>
          <button
            type="button"
            onClick={() => copyColorToClipboard(xyzColor)}
            className="text-black bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Copy XYZ {xyzColor}
          </button>
        </div>
      </div>
    </div>
  );
}
