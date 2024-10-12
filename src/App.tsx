import { ChangeEvent, DragEvent, useState } from 'react';
import './App.css';

function App() {
  const [uploadStatus, setUploadStatus] = useState<string>(''); // Track the upload status

  // Handle file selection or drop and trigger upload
  const handleFile = async (file: File) => {
    setUploadStatus('Uploading...');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://d.cess.network/file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus('File uploaded successfully!');
        console.log('Upload response:', result);
      } else {
        setUploadStatus('Upload failed.');
        console.error('Upload error:', response.statusText);
      }
    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error('Error:', error);
    }
  };

  // Trigger upload when a file is selected from the input
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await handleFile(file);
  };

  // Handle file drop from drag-and-drop
  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) await handleFile(file);
  };

  // Prevent default behavior to allow dropping files
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>TG Mini App File Upload</h1>

      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Drag & Drop a file here, or click to select one.</p>

        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />

        <label htmlFor="fileInput" className="file-input-label">
          Select File
        </label>
      </div>

      {uploadStatus && <p>{uploadStatus}</p>}
    </>
  );
}

export default App;
