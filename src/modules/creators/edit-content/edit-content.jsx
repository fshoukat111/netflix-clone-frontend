import React, { useState, useEffect } from 'react';
import './edit-content.css';  // Replace with the appropriate CSS file
import { useParams, useNavigate } from 'react-router-dom';

const EditContentComponent = () => {
    const { id } = useParams();
    const [sideItem, setSideItem] = useState();
    const navigate = useNavigate('');

    const [formData, setFormData] = useState({
        contentTitle: '',
        producer: '',
        genre: '',
        publisher: '',
        videoUrl: null,
    });

    useEffect(() => {
        const navArray = [
            { id: 1, title: "Create Content", path: '/creator/create-content' },
            { id: 2, title: "Content List", path: '/creator/content-list' },
        ]
        setSideItem(navArray)
    }, [])

    useEffect(() => {
        // Fetch content data based on the ID when the component mounts
        const fetchContentData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/video/${id}`);
                const contentData = await response.json();
                setFormData({
                    contentTitle: contentData.video.contentTitle,
                    producer: contentData.video.producer,
                    genre: contentData.video.genre,
                    publisher: contentData.video.publisher,
                    videoUrl: contentData?.video?.videoUrl || null,  // Assuming the video URL is not editable
                });
            } catch (error) {
                console.error('Error fetching content data:', error.message);
            }
        };

        fetchContentData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateVideoRequest = async (e) => {
        e.preventDefault();

        try {
            const formDataToUpdate = new FormData();
            formDataToUpdate.append('contentTitle', formData.contentTitle);
            formDataToUpdate.append('producer', formData.producer);
            formDataToUpdate.append('genre', formData.genre);
            formDataToUpdate.append('publisher', formData.publisher);
            formDataToUpdate.append('videoUrl', formData.videoUrl);

            // Assuming videoUrl is not editable, so it won't be sent in the update request

            const response = await fetch(`http://localhost:5000/update-video/${id}`, {
                method: 'PUT',
                body: formDataToUpdate,
                headers: {
                    // Include any headers you need, for example:
                    // 'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response data, if needed
            const responseData = await response.json();
            console.log('Response data:', responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleNavigate = (path) => {
        console.log("ppp", path)
        if (path === "/creator/create-content") {
            navigate("/creator/dashboard")

        }
        else if (path === "/creator/content-list") {
            navigate("/creator/content-list")

        }
    }

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

    return (
        <>
            <div className="main-div">
                <div className="sidebar">
                    <h3>Creator Dashboard</h3>
                    <div className="sidebar-navbar">
                        {sideItem?.map((nav, key) => (
                            <div key={key.id} onClick={() => { handleNavigate(nav.path) }} >
                                <h4>{nav.title}</h4>
                            </div>
                        )
                        )}

                    </div>
                </div>
                <div className="side-body">
                    <form className="form-div" onSubmit={handleUpdateVideoRequest}>
                        <h3 className="center-div">Edit Video Content</h3>
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
                                name="videoUrl"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <span className="current-video-url">{formData.videoUrl}</span>
                            <button className="input-class" type="submit">
                                Update
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default EditContentComponent;
