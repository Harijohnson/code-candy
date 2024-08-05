'use client';

import React, { useState } from 'react';

export default function Page() {
    const [text, setText] = useState<string>('');
    const [count, setCount] = useState<number | ''>('');
    const [size, setSize] = useState<number | ''>('');

    // Function to generate random words
    const generateRandomWords = (count: number): string => {
        const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do"];
        return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    };

    // Function to generate random text of specified length
    const generateRandomText = (length: number): string => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    };

    // Function to generate text with a target file size
    const generateTextForSize = (targetSizeMB: number): string => {
        const bytesPerMB = 1024 * 1024; // Bytes in 1 MB
        const targetSizeBytes = targetSizeMB * bytesPerMB;

        let generatedText = '';
        let currentSize = 0;

        while (currentSize < targetSizeBytes) {
            // Generate a chunk of text and update size
            const chunkSize = 1024 * 1024; // 1 MB chunk
            const chunk = generateRandomWords(chunkSize);
            generatedText += chunk;
            currentSize = new Blob([generatedText]).size; // Calculate size in bytes
        }

        return generatedText.slice(0, targetSizeBytes); // Trim to exact size
    };

    const handleCountSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (count > 0) {
            const generatedText = generateRandomWords(count);
            setText(generatedText);
        }
    };

    const handleSizeSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (size > 0) {
            const generatedText = generateTextForSize(size);
            setText(generatedText);
        }
    };

    const handleCopyText = () => {
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => console.log('Text copied to clipboard!'))
                .catch(err => alert('Failed to copy text: ' + err));
        }
    };

    const handleDownloadText = () => {
        if (text) {
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated-text.txt';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="bg-red-700 p-5">
            <form className="flex gap-4 mt-4 justify-center pb-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="count">Count of words</label>
                    <input
                        id="count"
                        type="number"
                        value={count}
                        className='text-black'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
                    />
                    <button type="button" onClick={handleCountSubmit}>Submit Count</button>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="size">Size of text file (MB)</label>
                    <input
                        id="size"
                        type="number"
                        step="0.01"
                        value={size}
                        className='text-black'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value))}
                    />
                    <button type="button" onClick={handleSizeSubmit}>Submit Size</button>
                </div>
            </form>
            <div className="bg-white justify-center align-center text-center m-auto text-black overflow-auto p-5" style={{ height: "45vh", width: "86vw" }}>
                {text}
            </div>
            <div className="flex justify-center mt-4">
                <button type="button" onClick={handleCopyText} className="bg-blue-500 text-white p-2 rounded">Copy Text</button>
                <button type="button" onClick={handleDownloadText} className="bg-green-500 text-white p-2 rounded ml-4">Download Text</button>
            </div>
        </div>
    );
}
