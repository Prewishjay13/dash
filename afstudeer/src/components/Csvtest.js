import React, { useState } from 'react';
import Papa from 'papaparse';

export default function CsvUpload({ handleBackClick, onSubmit }) {
  const [csvData, setCsvData] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !file.name.endsWith('.csv')) {
      setAlert({ type: 'error', message: 'Please upload a CSV file' });
      return;
    }

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        console.log(results.data);
        setCsvData(results.data);
        setAlert({
          type: 'success',
          message: 'CSV file uploaded successfully',
        });
        logCsvHeaders(results.data); // Log CSV headers
      },
      error: function (error) {
        console.log(error);
        setAlert({
          type: 'error',
          message: 'Failed to parse CSV file',
        });
      },
    });
  };

  const logCsvHeaders = (data) => {
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      console.log('CSV Headers:', headers);
    }
  };

  return (
    <div className="modal-box relative">
      {/* Rest of the component code */}
    </div>
  );
}
