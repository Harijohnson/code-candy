'use client';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/monokai'; // Theme for editors
import 'brace/ext/language_tools'; // Autocomplete
import 'brace/ext/emmet'; // Emmet support
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../globals.css';
import $ from 'jquery';


export default function Page() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const sourceDoc = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;
    setIframeSrc(sourceDoc);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="w-full flex flex-col items-center bg-[#1e1e1e] text-white">
      <div className="w-full flex flex-wrap">
        <div className="w-full flex">
          <div className="w-1/3 p-2">
            <h2 className="text-xl font-bold mb-2">HTML</h2>
            <ResizableBox
              width={'29vw'}
              height={200}
              minConstraints={[150, 100]}
              maxConstraints={[600, 400]}
              className="resizable-box border p-2"
            >
              <AceEditor
                mode="html"
                theme="monokai"
                value={htmlCode}
                onChange={(newValue) => setHtmlCode(newValue)}
                name="html-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{ useWorker: true, enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
                style={{ width: '100%', height: '100%' }}
              />
            </ResizableBox>
          </div>
          <div className="w-1/3 p-2">
            <h2 className="text-xl font-bold mb-2">CSS</h2>
            <ResizableBox
              width={'29vw'}
              height={200}
              minConstraints={[150, 100]}
              maxConstraints={[600, 400]}
              className="resizable-box border p-2"
            >
              <AceEditor
                mode="css"
                theme="monokai"
                value={cssCode}
                onChange={(newValue) => setCssCode(newValue)}
                name="css-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{ useWorker: true, enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
                style={{ width: '100%', height: '100%' }}
              />
            </ResizableBox>
          </div>
          <div className="w-1/3 p-2">
            <h2 className="text-xl font-bold mb-2">JavaScript</h2>
            <ResizableBox
              width={'29vw'}
              height={200}
              minConstraints={[150, 100]}
              maxConstraints={[600, 400]}
              className="resizable-box border p-2"
            >
              <AceEditor
                mode="javascript"
                theme="monokai"
                value={jsCode}
                onChange={(newValue) => setJsCode(newValue)}
                name="js-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{ useWorker: true, enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
                style={{ width: '100%', height: '100%' }}
              />
            </ResizableBox>
          </div>
        </div>
      </div>
      <div className="w-full h-96 border mt-4">
        <iframe
          srcDoc={iframeSrc}
          title="Preview"
          className="w-full h-full"
          sandbox="allow-scripts"
          style={{ backgroundColor: '#fff', color: '#000' }} // Light theme for preview
        />
      </div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </div>
  );
}
