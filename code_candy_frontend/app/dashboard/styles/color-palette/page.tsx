'use client';
import React, { useState, useEffect, useCallback } from "react";
import { FaCopy, FaCrown } from 'react-icons/fa';
import Color from 'color'

export default function Page() {
    const [colors, setColors] = useState<Array<string>>(Array(6).fill('#000000'));
    const [numColors, setNumColors] = useState<number>(6);
    const [isOrdered, setIsOrdered] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState<'random' | 'ordered' | 'web' | null>('random');
    const [startColor, setStartColor] = useState<string>('#ff0000'); // Default start color
    const [endColor, setEndColor] = useState<string>('#0000ff'); // Default end color

    const getWebColors = (color: string) => {
        const colorInstance = Color(color);  // Create a Color instance from the input color
        const getLighterColor = (colorInstance: { lighten: (arg0: number) => { (): any; new(): any; hex: { (): any; new(): any; }; }; }, percent: number) => colorInstance.lighten(percent / 100).hex();
        const getDarkerColor = (colorInstance: { darken: (arg0: number) => { (): any; new(): any; hex: { (): any; new(): any; }; }; }, percent: number) => colorInstance.darken(percent / 100).hex();
    
        const darkColor = getDarkerColor(colorInstance, 30);  // Darken the color by 30%
        const secondaryColor = getLighterColor(colorInstance, 10);  // Lighten the color by 10%
    
        return [darkColor, secondaryColor];
    }
    const [webColors, setWebColors] = useState<Array<string>>(getWebColors('#ff0000'));
    const [darkColor, setDarkColor] = useState<string>('#000000');
    const [secondaryColor, setSecondaryColor] = useState<string>('#444444');

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

    const interpolateColor = (color1: string, color2: string, factor: number) => {
        const hex = (color: string) => parseInt(color.slice(1), 16);
        const r = (hex(color1) >> 16) + factor * ((hex(color2) >> 16) - (hex(color1) >> 16));
        const g = ((hex(color1) >> 8) & 0xff) + factor * (((hex(color2) >> 8) & 0xff) - ((hex(color1) >> 8) & 0xff));
        const b = (hex(color1) & 0xff) + factor * ((hex(color2) & 0xff) - (hex(color1) & 0xff));

        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    };

    const generateOrderedColors = () => {
        const step = 1 / (numColors - 1);

        return Array.from({ length: numColors }, (_, index) => {
            if (index === 0) {
                return startColor; // First color is solid
            } else {
                const factor = (index - 1) * step;
                const color = interpolateColor(startColor, endColor, factor);
                const opacity = 1 - (index - 1) * (1 / (numColors - 1)); // Gradual opacity decrease
                return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
            }
        });
    };

    const generateHighContrastColors = () => {
        const baseColor = generateRandomColor();
        return Array.from({ length: numColors }, (_, index) => {
            if (index === 0) {
                return baseColor;
            } else {
                const r = parseInt(baseColor.slice(1, 3), 16);
                const g = parseInt(baseColor.slice(3, 5), 16);
                const b = parseInt(baseColor.slice(5, 7), 16);
                const opacity = 0.3 + 0.7 * (index / (numColors - 1)); // Increase opacity from 0.3 to 1
                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
        });
    };

    // New function to generate web colors
    const generateWebColors = () => {
        const additionalColors = Array.from({ length: Math.max(0, numColors - 2) }, () => generateRandomColor());
        const baseColor = generateRandomColor();
        
        return [baseColor, ...additionalColors];
    };

    const handleRandomClick = () => {
        setIsOrdered(false);
        const newColors = Array(numColors).fill('').map(() => generateRandomColor());
        console.log("Generated Random Colors:", newColors);
        setColors(newColors);
        setSelectedButton('random');
    };

    const handleOrderedClick = () => {
        setIsOrdered(true);
        const newColors = generateOrderedColors();
        console.log("Generated Ordered Colors:", newColors);
        setColors(newColors);
        setSelectedButton('ordered');
    };

    const handleWebClick = () => {
        const newColors = generateWebColors();
        console.log("Generated Web Colors:", newColors);
        setColors(newColors);
        setSelectedButton('web');
    };

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            if (selectedButton === 'ordered') {
                const newColors = generateHighContrastColors();
                console.log("Generated High Contrast Colors:", newColors);
                setColors(newColors);
            } else if (selectedButton === 'random') {
                handleRandomClick();
            } else if (selectedButton === 'web') {
                handleWebClick();
            }
        }
    }, [selectedButton, numColors]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        console.log('Colors Updated:', colors);
    }, [colors]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0 && value <= 6) { // Limit to a maximum of 6 colors for web palette
            setNumColors(value);
            if (isOrdered) {
                setColors(generateOrderedColors());
            } else if (selectedButton === 'web') {
                setColors(generateWebColors());
            } else {
                setColors(Array(value).fill('').map(() => generateRandomColor()));
            }
        }
    };

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
                <label htmlFor="number-input" className="text-black">Enter Number of Color Palettes You Want</label>
                <input 
                    type="number" 
                    value={numColors} 
                    onChange={handleInputChange} 
                    min="1" 
                    max="6" // Adjusted max value for web colors
                    className="bg-gray-100 text-black p-2 rounded w-full" 
                    id="number-input"
                />
            </div>
            <div className="flex space-x-2 p-4">
                <button 
                    onClick={handleRandomClick} 
                    className={`p-2 rounded ${selectedButton === 'random' ? 'border-2 border-blue-200' : 'bg-yellow-300 text-black'}`}
                >
                    Random Colors
                </button>
                <button 
                    onClick={handleOrderedClick} 
                    className={`p-2 rounded ${selectedButton === 'ordered' ? 'border-2 border-green-700' : 'bg-green-300 text-black'}`}
                >
                    Ordered Colors
                </button>
                <button 
                    onClick={handleWebClick} 
                    className={`p-2 rounded ${selectedButton === 'web' ? 'border-2 border-red-700' : 'bg-red-300 text-black'} hidden`}
                >
                    Web Colors
                </button>
            </div>
            <div className="w-full flex flex-row place-content-center flex-no-wrap">
                {colors.map((color, index) => {
                    const textColor = getTextColor(color);
                    return (
                        <div key={index} className="relative min-w-9 w-60 flex items-center justify-center overflow-hidden" style={{ height: '67vh' }}>
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
