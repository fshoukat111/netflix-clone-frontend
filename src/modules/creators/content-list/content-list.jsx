import React, { useState, useEffect } from 'react';
import './content-list.css';
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const ContentListComponent = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://backend-netflix.azurewebsites.net/videos');
                // const response = await fetch('http://localhost:5000/videos');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.videos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (video) => {
        console.log("video", video)
        navigate(`/creator/create-content/${video.id}}`)
    }


    return (
        <div className="main-video-div">
            {data?.map((video, index) => (
                <Card key={index} className="mb-3">
                    <ReactPlayer
                        className="video-player-section"
                        url={video?.videoUrl}
                        controls={true}
                        fullscreen={true}
                        config={{
                            youtube: {
                                playerVars: {
                                    modestbranding: 1,
                                    controls: 1,
                                    fs: 1,
                                },
                            },
                        }}
                    />
                    {/* <Card.Body>
                        <Button variant="primary" onClick={() => handleEdit(video)}>
                            Edit
                        </Button>
                    </Card.Body> */}
                </Card>
            ))}
        </div>
    );
};

export default ContentListComponent;
