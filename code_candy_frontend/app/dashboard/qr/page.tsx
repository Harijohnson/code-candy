'use client';
import React from "react";
import QRCodePage from "../../../components/qr_code/QRCodePage";
import { QRCodeCanvas } from "qrcode.react"; // Assuming you're using `qrcode.react` for QR code generation.

const Home: React.FC = () => {
    const [value, setValue] = React.useState("Hai");
    const [level, setLevel] = React.useState("L");
    const [size, setSize] = React.useState(256); // Default size 256x256
    const [downloadSize, setDownloadSize] = React.useState(256); // Default download size 256x256
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const handleDownload = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'qr-code.png';
            link.click();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '50vw', padding: '3rem' ,borderRight: '1px solid black'}} >
                <h1 className="text-black">QR Code Generator</h1>
                <div style={{ marginBottom: '20px' }}>
                    <textarea
                        name="word"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{ width: '30vw', marginBottom: '10px', resize: 'none' }}
                        className="text-black rounded p-2"
                        rows={5}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="level" className="text-black">Error Correction Level:</label>
                    <br />
                    <select
                        name="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        style={{ width: '30vw', marginBottom: '10px', height: "2.5rem" }}
                        className="text-black rounded p-2"
                    >
                        <option value="L" className="text-black">Low (L)</option>
                        <option value="M" className="text-black">Medium (M)</option>
                        <option value="Q" className="text-black">Quartile (Q)</option>
                        <option value="H" className="text-black">High (H)</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="size" className="text-black">Size:</label>
                    <br />
                    <select
                        name="size"
                        value={downloadSize}
                        onChange={(e) => setDownloadSize(parseInt(e.target.value))}
                        style={{ width: '30vw', marginBottom: '10px', height: "2.5rem" }}
                        className="text-black rounded p-2"
                    >
                        <option value={128} className="text-black">128x128</option>
                        <option value={256} className="text-black">256x256</option>
                        <option value={512} className="text-black">512x512</option>
                        <option value={1024} className="text-black">1024x1024</option>
                    </select>
                </div>
                <button onClick={handleDownload} style={{ width: '200px' }} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Download QR Code</button>
            </div>
            <div style={{ width: '50vw', padding: '3rem', scrollBehavior: 'auto' }} className="flex items-center justify-center">
                <QRCodeCanvas
                    value={value}
                    size={downloadSize}
                    level={level}
                    includeMargin={true}
                    ref={canvasRef}
                    style={{ display: 'none' }} // Hide the default QR code
                />
                <QRCodePage value={value} level={level} size={size} /> {/* Display QR code with default size */}
            </div>
        </div>
    );
};

export default Home;
