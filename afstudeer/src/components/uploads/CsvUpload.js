import React, { useState } from 'react';
import Papa from 'papaparse';
import { SuccessAlert, ErrorAlert } from '../../global-components/Alert';


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
                    message: 'CSV file uploaded successfully'
                });
            },
            error: function (error) {
                console.log(error);
                setAlert({
                    type: 'error',
                    message: 'Failed to parse CSV file'
                });
            }
        });
    };

    return (
        <div className="modal-box relative">
            <button
                id="datasource-modal-close"
                onClick={handleBackClick}
                className="btn btn-sm btn-circle absolute right-2 top-2"
            >
                ✕
            </button>
            <h1 className="font-bold text-2xl mb-2">CSV Upload</h1>
            <p className="text-lg mb-5">Upload a CSV file</p>
            <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleCsvUpload}
            />
            {alert && (
                <div className="mt-5">
                    {alert.type === 'success' ? (
                        <SuccessAlert message={alert.message} />
                    ) : (
                        <ErrorAlert message={alert.message} />
                    )}
                </div>
            )}
            {csvData && (
                <div className="mt-6 max-w-xl">
                    {/* <h2 className="text-lg font-medium mb-2 mt-4">
                        Choose a name for your datasource
                    </h2>
                    <input
                        type="text"
                        placeholder="Choose a name"
                        className="input input-bordered w-full "
                    /> */}
                    <h2 className="text-lg font-medium mb-2 mt-5">CSV Data</h2>
                    <div className="max-h-[400px] overflow-y-auto bg-gray-700 text-gray-100 p-4 rounded-md">
                        <pre className="text-sm">
                            {JSON.stringify(csvData, null, 2)}
                        </pre>
                    </div>
                    <button
                        className="btn float-right mt-3"
                        onClick={() => onSubmit(csvData)}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}