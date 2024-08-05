"use client";
import { useState } from "react";
import { SketchPicker } from 'react-color';

export default function Page() {
  const [color, setColor] = useState('#ffffff'); // Initial color

  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  return (
    <div>
      <section>
        <div className="flex justify-center min-h-screen ">
          <div
            className="flex items-center justify-center text-center bg-black"
            style={{  height: '45vh', width: '86vw' }}
          >
            Welcome
          </div>
        </div>
      </section>
      <section>
        <div className="flex justify-center min-h-screen object-cover">
          <div className="bg-red-700" style={{ height: '35vh', width: '66vw' }}>
            <SketchPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
