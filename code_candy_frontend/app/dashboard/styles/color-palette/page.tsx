'use client';
import React, { useState, useEffect } from "react";
import { FaCopy, FaCrown } from 'react-icons/fa';

export default function Page() {
    const [colors, setColors] = useState<Array<string>>(Array(6).fill('#000000'));
    const [numColors, setNumColors] = useState<number>(6);

    const randomNumberInRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const generateRandomColor = () => {
        const color_code_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += color_code_1[randomNumberInRange(0, color_code_1.length)];
        }
        return color;
    };

    const handleClick = () => {
        setColors(Array(numColors).fill('').map(() => generateRandomColor()));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
            handleClick();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0 && value <= 12) {
            setNumColors(value);
            setColors(Array(value).fill('').map(() => generateRandomColor()));
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color);
    };

    const getLuminance = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const a = [r, g, b].map((v) =>
            v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
        );

        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const getTextColor = (backgroundColor: string) => {
        return getLuminance(backgroundColor) > 0.5 ? '#000000' : '#FFFFFF';
    };

    return (
        <>
        <div className="w-full text-black-700 p-4">
            <label htmlFor="number-input" className="text-black">Enter Number of Color Palets You want</label>
                <input 
                    type="number" 
                    value={numColors} 
                    onChange={handleInputChange} 
                    min="1" 
                    max="12"
                    className="bg-gray-100 text-black p-2 rounded w-full" 
                    id="number-input"
                />
                <button onClick={handleClick} className="hidden bg-blue-500 text-white p-2 rounded ml-2">
                    Generate Colors
                </button>
            </div>
            <div className="w-full flex flex-row place-content-center flex-no-wrap flex-no-wrap">
                {colors.map((color, index) => {
                    const textColor = getTextColor(color);
                    return (
                        <div key={index} className="relative min-w-9 w-60 flex items-center justify-center" style={{ height: '67vh' }}>
                            <div 
                                className="absolute inset-0 cursor-pointer flex items-center justify-center transition-opacity hover:opacity-80" 
                                style={{ backgroundColor: color, color: textColor }}
                                onClick={() => copyToClipboard(color)}
                            >
                                <FaCrown className="text-2xl" />
                            </div>
                            <div className="relative z-10 text-center p-2 mt-12" style={{ color: textColor }}>
                                {color}
                            </div>
                        </div>
                    );
                })}
            </div>
            
        </>
    );
}
