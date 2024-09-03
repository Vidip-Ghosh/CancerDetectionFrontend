import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Predict = () => {
    const Options = [
        { value: 'acute-lymphoblastic-leukemia', label: 'Acute Lymphoblastic Leukemia', color: '#00B8D9' },
        { value: 'brain-cancer', label: 'Brain Cancer', color: '#0052CC' },
        { value: 'breast-cancer', label: 'Breast Cancer', color: '#5243AA' },
        { value: 'cervical-cancer', label: 'Cervical Cancer', color: '#FF5630' },
        { value: 'kidney-cancer', label: 'Kidney Cancer', color: '#FF8B00' },
        { value: 'lung-and-colon-cancer', label: 'Lung and Colon Cancer', color: '#FFC400' },
        { value: 'lymphoma', label: 'Lymphoma', color: '#36B37E' },
        { value: 'oral-cancer', label: 'Oral Cancer', color: '#00875A' },
    ];    

    const [selectedOption, setSelectedOption] = useState(null);
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState('');

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleClick = () => {
        if (file && selectedOption) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('cancer_type', selectedOption.value);

            axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res.data);
                setResponse(res.data.prediction);
            }).catch((err) => {
                console.error(err);
            });
        } else {
            alert('Please select a cancer type and upload an image.');
        }
    };
    console.log(response);

    return (
        <div>
            <Select
                defaultValue={Options[0]}
                options={Options}
                onChange={handleSelectChange}
            />
            <label 
                className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2" 
                htmlFor="file_input"
            >
                Select an image to upload
            </label>
            <input 
                className="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                aria-describedby="file_input" 
                id="file_input" 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
            />
            <button
                className="mt-4 w-50 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                onClick={handleClick}
            >
                Predict
            </button>
            {response && (
                <div className="mt-4 w-full text-white text-center font-bold py-2 px-4 rounded-lg">
                    Predicted Class: {response}
                </div>
            )}
        </div>
    )
};

export default Predict;
