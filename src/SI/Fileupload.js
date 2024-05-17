import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const storeFileInLocalStorage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileDataUrl = reader.result;
      localStorage.setItem('uploadedFile', fileDataUrl);
      console.log('File stored in localStorage');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    try {
      const response = await axios.post('https://policedashboard.000webhostapp.com/upload.php', formData);
      console.log(response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }

    // Store the file in localStorage
    storeFileInLocalStorage(file);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
