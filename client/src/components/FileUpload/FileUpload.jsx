import { useState } from 'react';
import "./FileUpload.css";

function FileUpload({ onFileUpload }) {

  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) {
      return;
    }

    setFileName(file.name);
    onFileUpload(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="file-upload">
      <h2>Upload Your Uber Data</h2>

      <p className="upload-description">
        Upload the Trips Data CSV from your Uber data download.
      </p>

      <label
        className={`upload-dropzone ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          hidden
        />

        <span className="upload-title">
          Drag and drop your Uber CSV here 
        </span>

        <span className="upload-divider">
          or
        </span>

        <span className="browse-button">
          Browse Files
        </span>

        <span className="supported-file">
          CSV files only
        </span>
      </label>

      {fileName && (
        <p className="selected-file">
          Selected: {fileName}
        </p>
      )}
    </div>
  )
}

export default FileUpload;