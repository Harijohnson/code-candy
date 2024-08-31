'use client';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

// Configure Modal to use the correct element
// Modal.setAppElement('#__next');

const filterPresets = [
    { name: 'Sepia', filter: 'grayscale(0%) sepia(100%) brightness(1) contrast(1)' },
    { name: 'Grayscale', filter: 'grayscale(100%) sepia(0%) brightness(1) contrast(1)' },
    { name: 'Brightness', filter: 'grayscale(0%) sepia(0%) brightness(1.5) contrast(1)' },
    { name: 'Contrast', filter: 'grayscale(0%) sepia(0%) brightness(1) contrast(2)' },
    { name: 'Blur', filter: 'blur(5px)' },
    { name: 'Invert', filter: 'invert(1)' },
    { name: 'Hue', filter: 'hue-rotate(180deg)' },
    { name: 'Saturate', filter: 'saturate(3)' },
    { name: 'Brightness and Contrast', filter: 'brightness(0.5) contrast(1.5)' },
    { name: 'Drop Shadow', filter: 'drop-shadow(0 0 0.5rem black)' },
    { name: 'Opacity', filter: 'opacity(0.5)' },
];

const FileExportModal = ({ isOpen, onRequestClose, onExport }) => {
    const [exportType, setExportType] = useState('png');

    const handleExport = () => {
        onExport(exportType);
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Export Modal">
            <h2>Select Export Type</h2>
            <select value={exportType} onChange={(e) => setExportType(e.target.value)}>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="pdf">PDF</option>
            </select>
            <button onClick={handleExport}>Export</button>
            <button onClick={onRequestClose}>Cancel</button>
        </Modal>
    );
};

export default function Page() {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [opacity, setOpacity] = useState<number>(1);
    const [grayscale, setGrayscale] = useState<number>(0);
    const [sepia, setSepia] = useState<number>(0);
    const [brightness, setBrightness] = useState<number>(1);
    const [contrast, setContrast] = useState<number>(1);
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [presetThumbnails, setPresetThumbnails] = useState<{ [key: string]: string }>({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (image) {
            setLoading(true);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = new Image();
            img.src = image as string;

            img.onload = () => {
                if (context) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0);
                    context.globalAlpha = opacity;
                    context.filter = `grayscale(${grayscale}%) sepia(${sepia}%) brightness(${brightness}) contrast(${contrast})`;
                    context.drawImage(img, 0, 0);
                    setPreviewUrl(canvas.toDataURL());
                    setLoading(false);
                }
            };

            img.onerror = () => {
                console.error('Image failed to load');
                setLoading(false);
            };
        }
    }, [image, opacity, grayscale, sepia, brightness, contrast]);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.src = image as string;
            img.onload = () => {
                filterPresets.forEach(({ name, filter }) => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    if (context) {
                        canvas.width = 100;
                        canvas.height = 100;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        context.filter = filter;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        setPresetThumbnails((prev) => ({
                            ...prev,
                            [name]: canvas.toDataURL()
                        }));
                    }
                });
            };
        }
    }, [image]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setOpacity(1);
                setGrayscale(0);
                setSepia(0);
                setBrightness(1);
                setContrast(1);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setOpacity(1);
                setGrayscale(0);
                setSepia(0);
                setBrightness(1);
                setContrast(1);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const downloadImage = () => {
        if (previewUrl) {
            const link = document.createElement('a');
            link.href = previewUrl as string;
            link.download = 'edited-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleExport = (type: string) => {
        if (previewUrl) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = previewUrl as string;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                
                if (type === 'pdf') {
                    const pdf = new jsPDF();
                    pdf.addImage(previewUrl as string, 'PNG', 0, 0);
                    pdf.save('edited-image.pdf');
                } else {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            saveAs(blob, `edited-image.${type}`);
                        }
                    }, `image/${type}`);
                }
            };
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div
                className="w-[45vw] h-[15vh] border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer relative"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="w-full h-full absolute opacity-0"
                    onChange={handleFileChange}
                />
                <p className="text-black text-center">Drag and drop or select an image</p>
            </div>
            {loading && <div className="mt-4">Loading...</div>}
            {image && !loading && (
                <div className="flex flex-col md:flex-row mt-4 space-x-8">
                    <div className="w-[45vw] h-[55vh] flex flex-col items-center justify-center">
                        <div className="mb-4 w-full h-full bg-gray-200 flex items-center justify-center">
                            <img
                                src={previewUrl as string}
                                alt="Filtered Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={downloadImage}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Download
                            </button>
                            <button
                                onClick={() => setModalIsOpen(true)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 hidden"
                            >
                                Export
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="w-[200px]">
                            <label className="block text-gray-700 mb-2">Adjust Opacity</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={opacity}
                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="w-[200px]">
                            <label className="block text-gray-700 mb-2">Adjust Grayscale</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={grayscale}
                                onChange={(e) => setGrayscale(parseInt(e.target.value, 10))}
                                className="w-full"
                            />
                        </div>
                        <div className="w-[200px]">
                            <label className="block text-gray-700 mb-2">Adjust Sepia</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sepia}
                                onChange={(e) => setSepia(parseInt(e.target.value, 10))}
                                className="w-full"
                            />
                        </div>
                        <div className="w-[200px]">
                            <label className="block text-gray-700 mb-2">Adjust Brightness</label>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.01"
                                value={brightness}
                                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="w-[200px]">
                            <label className="block text-gray-700 mb-2">Adjust Contrast</label>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.01"
                                value={contrast}
                                onChange={(e) => setContrast(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-wrap">
                            {filterPresets.map(({ name, filter }) => (
                                <div key={name} className="w-24 h-24 m-2">
                                    <img
                                        src={presetThumbnails[name]}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                        style={{ filter }}
                                    />
                                    <p className="text-center">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <FileExportModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onExport={handleExport}
            />
        </div>
    );
}
