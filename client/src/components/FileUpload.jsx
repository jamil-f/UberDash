function FileUpload({ onFileUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
        <h2>Upload Your Uber Data</h2>
      <input 
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      />
    </div>
  );
}

export default FileUpload;