import React, { useState } from 'react';
import './create-content.css';
import Button from 'react-bootstrap/Button';

const CreateContentComponent = () => {
    const [formData, setFormData] = useState({
        contentTitle: '',
        producer: '',
        genre: '',
        publisher: '',
        videoUrl: null,  // Change this to null, as it will be set later as a File object
        pg: '',  // Change this to null, as it will be set later as a File object
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const maxSizeInBytes = 100 * 1024 * 1024;

            if (selectedFile.size > maxSizeInBytes) {
                alert('File size exceeds the limit (100 MB). Please select a smaller file.');
                e.target.value = '';
                return;
            }

            // Set the videoUrl state to the File object
            setFormData({
                ...formData,
                videoUrl: selectedFile,
            });
        }
    };

    const handleCreateVideoRequest = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('contentTitle', formData.contentTitle);
            formDataToSend.append('producer', formData.producer);
            formDataToSend.append('genre', formData.genre);
            formDataToSend.append('publisher', formData.publisher);
            formDataToSend.append('videoUrl', formData.videoUrl);
            formDataToSend.append('pg', formData.pg);

            const response = await fetch('https://backend-netflix.azurewebsites.net/create-videos', {
            // const response = await fetch('http://localhost:5000/create-videos', {
                method: 'POST',
                body: formDataToSend,
                headers: {

                },
            });

            // Handle the response data, if needed
            const responseData = await response.json();
            setFormData({
                contentTitle: '',
                producer: '',
                genre: '',
                publisher: '',
                videoUrl: null,
                pg: '',
            });
            console.log('Response data:', responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };




    return (

        <>
            <div>
                <form className="form-div" onSubmit={handleCreateVideoRequest}>
                    <h3 className="center-div">Create Video Content</h3>
                    <div className="form-data">
                        <input
                            className="input-class"
                            type="text"
                            name="contentTitle"
                            value={formData?.contentTitle}
                            placeholder="Content Title"
                            onChange={handleChange}
                        />
                        <input
                            className="input-class"
                            name="publisher"
                            value={formData?.publisher}
                            type="text"
                            placeholder="Publisher"
                            onChange={handleChange}
                        />
                        <input
                            className="input-class"
                            name="producer"
                            value={formData?.producer}
                            type="text"
                            placeholder="Producer"
                            onChange={handleChange}
                        />
                        <input
                            className="input-class"
                            name="genre"
                            value={formData?.genre}
                            type="text"
                            placeholder="Genre"
                            onChange={handleChange}
                        />
                        <input
                            className="input-class"
                            name="pg"
                            value={formData?.pg}
                            type="text"
                            placeholder="pg"
                            onChange={handleChange}
                        />
                        <input
                            className="input-class"
                            name="videoUrl"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                        />
                        <Button type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateContentComponent;
