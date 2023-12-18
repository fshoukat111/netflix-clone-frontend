import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './viewer-video-detail.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsStar, BsStarFill } from 'react-icons/bs';
import VPlayer from "vnetwork-player";
import "vnetwork-player/dist/vnetwork-player.min.css"
const ViewerVideoDetail = () => {
    const [dataDetail, setDataDetail] = useState({
        videoUrl: null,
    });
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [formData, setFormData] = useState({
        comment: '',
        rating: '',
    });


    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await fetch(`https://backend-netflix.azurewebsites.net/video/${id}`);
                // const response = await fetch(`http://localhost:5000/video/${id}`);
                const contentData = await response.json();
                setDataDetail({
                    contentTitle: contentData.video.contentTitle,
                    producer: contentData.video.producer,
                    genre: contentData.video.genre,
                    publisher: contentData.video.publisher,
                    videoUrl: contentData?.video?.videoUrl || null,
                });


            } catch (error) {
                console.error('Error fetching content data:', error.message);
            }
        };

        fetchContentData();
    }, [id]);

    const getFeedBack = async () => {
        const videoId = id;
        try {
            const response = await fetch(`https://backend-netflix.azurewebsites.net/video/feedback/${videoId}`);

            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            const feedbackData = await response.json();
            console.log('Feedback fetched successfully:', feedbackData);

            // Assuming you have separate state variables for comments and ratings
            setComments(feedbackData.video);

        } catch (error) {
            console.error('Error fetching feedback:', error.message);
        }
    };

    useEffect(() => {
        getFeedBack();
    }, []);

    const handleAddFeedback = async () => {
            const videoId = id;
        try {
            const response = await fetch(`https://backend-netflix.azurewebsites.net/video/create/${videoId}/feedback`, {
            // const response = await fetch(`http://localhost:5000/video/create/${videoId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const responseData = await response.json();
                getFeedBack();

                setFormData({
                    comment: '',
                    rating: '',
                });
                console.log('Response data:', responseData);
            } else {
                // Handle non-JSON response
                const textData = await response.text();
                console.log('Non-JSON response:', textData);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleMouseEnter = (star) => {
        setHoveredRating(star);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (star) => {
        setFormData(prevData => ({ ...prevData, rating: star }));
    };

    return (
        <div className="main-detail-section">
            <Card className="mb-3 card-detail">
                <VPlayer className='video-player-detail'
                    source={
                        [
                            { label: "480p", url: dataDetail.videoUrl },
                            { label: "720p", url: dataDetail.videoUrl }
                        ]
                    }
                />
                <Card.Body>
                    <p>Producer: {dataDetail?.producer}</p>
                    <p>Genre: {dataDetail?.genre}</p>
                </Card.Body>

                <div className="feedback-section">
                    <h4>Comments/Ratings</h4>
                    <ul>
                        {comments?.map(comment => (
                            <li key={comment?.id}>{comment?.comment}/{comment.rating}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={formData.comment}
                        name="comment"
                        onChange={e => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Add a comment"
                    />
                    <div>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                className="cursor-pointer"
                                onMouseEnter={() => handleMouseEnter(star)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(star)}
                            >
                                {star <= (hoveredRating || formData.rating) ? (
                                    <BsStarFill color="#ffc107" />
                                ) : (
                                    <BsStar color="#ffc107" />
                                )}
                            </span>
                        ))}
                    </div>
                    <Button onClick={handleAddFeedback}>Add Feedback</Button>
                </div>
            </Card>
        </div>
    );
};

export default ViewerVideoDetail;
