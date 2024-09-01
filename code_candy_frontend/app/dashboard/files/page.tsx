'use client';
import { useState } from 'react';
import axios from 'axios';

// Helper function to slugify text using underscores
const slugify = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
};

// Define a type for operations
type Operations = {
    [key: string]: string;
};

// Define operations with display names and slugs
const operations = {
    'pdf_to_word': 'Convert PDF files into editable Word documents (.docx).',
    'image_to_pdf': 'Convert image files (e.g., PNG, JPG) into PDF format.',
    'word_to_pdf': 'Convert Word documents (.docx) into PDF format.',
    'jpg_to_png': 'Convert JPG images to PNG format.',
    'png_to_jpg': 'Convert PNG images to JPG format.',
    'excel_to_csv': 'Convert Excel files (.xlsx) to CSV format.',
    'csv_to_excel': 'Convert CSV files to Excel format (.xlsx).',
    'html_to_pdf': 'Convert HTML files to PDF format.',
    'pdf_to_html': 'Convert PDF files to HTML format.',
    'powerpoint_to_pdf': 'Convert PowerPoint presentations (.pptx) to PDF format.',
    'pdf_to_powerpoint': 'Convert PDF files to PowerPoint presentations (.pptx).',
    'text_to_pdf': 'Convert text files (.txt) to PDF format.',
    'pdf_to_text': 'Convert PDF files to text format (.txt).',
    'tiff_to_jpg': 'Convert TIFF images to JPG format.',
    'jpg_to_tiff': 'Convert JPG images to TIFF format.',
    'heic_to_jpg': 'Convert HEIC images to JPG format.',
    'heic_to_png': 'Convert HEIC images to PNG format.',
    'pdf_to_docx': 'Convert PDF files to DOCX format.',
    'docx_to_pdf': 'Convert DOCX files to PDF format.',
    'markdown_to_pdf': 'Convert Markdown files (.md) to PDF format.',
    'svg_to_png': 'Convert SVG files to PNG format.',
    'png_to_svg': 'Convert PNG files to SVG format.',
    'hevc_to_jpg': 'Convert HEVC videos to JPG images.',
    'hevc_to_png': 'Convert HEVC videos to PNG images.',
    'heic_to_tiff': 'Convert HEIC images to TIFF format.',
    'tiff_to_png': 'Convert TIFF images to PNG format.',
    'png_to_tiff': 'Convert PNG images to TIFF format.',
};

export default function FileConverter() {
    const [selectedOperation, setSelectedOperation] = useState<string>(Object.keys(operations)[0]);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setFileName(file.name);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileName(null);
        setDownloadUrl(null);
    };

    const handleConvert = async () => {
        if (!file) return;

        setIsProcessing(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('operation', slugify(selectedOperation));
        console.log(formData);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/convert/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setDownloadUrl(response.data.file_url);
        } catch (error) {
            console.error('Conversion failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                <ul>
                    {Object.keys(operations).map((operation) => (
                        <li
                            key={operation}
                            className={`p-2 cursor-pointer ${selectedOperation === operation ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            onClick={() => setSelectedOperation(operation)}
                        >
                            {operation.replace(/_/g, ' ')}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 flex flex-col justify-center items-center bg-white p-4">
                <h2 className="mb-4 text-xl font-bold">{selectedOperation.replace(/_/g, ' ')}</h2>
                <div className="mb-4 text-gray-600">
                    {operations[selectedOperation]}
                </div>
                <div className="relative w-80">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="border border-gray-300 p-2 mb-2"
                        style={{ height: '15rem', width: '20rem' }}
                    />
                    {fileName && (
                        <div className="absolute top-0 right-0 p-2 bg-gray-200 rounded">
                            <span className="text-gray-700">{fileName}</span>
                            <button
                                onClick={handleRemoveFile}
                                className="ml-2 text-red-500"
                                aria-label="Remove file"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleConvert}
                    className={`bg-blue-500 text-white py-2 px-4 rounded mt-4 ${isProcessing ? 'cursor-wait' : ''}`}
                    disabled={isProcessing || !file}
                >
                    {isProcessing ? 'Processing...' : 'Convert'}
                </button>
                {isProcessing && (
                    <div className="mt-4 flex items-center">
                        <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm12 0a8 8 0 00-8 8v2a10 10 0 0010-10h-2z"></path>
                        </svg>
                    </div>
                )}
                {downloadUrl && !isProcessing && (
                    <a href={downloadUrl} download className="bg-green-500 text-white py-2 px-4 rounded mt-4">
                        Download
                    </a>
                )}
            </div>
        </div>
    );
}
