import React, { useState, useEffect } from 'react';
import './viewer-dashboard.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import VPlayer from "vnetwork-player";

const ViewerDashboard = () => {
    const [data, setData] = useState(null);
    const [userAge, setUserAge] = useState(0); // Set the actual user age here
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUserAge = localStorage.getItem('currentUserAge');
                setUserAge(currentUserAge);
                const apiUrl = searchQuery
                    ? `http://localhost:5000/videos?search=${searchQuery}`
                    : 'http://localhost:5000/videos';

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the response as JSON
                const result = await response.json();
                setData(result.videos);
            } catch (error) {
                // Log an error if there is an issue fetching data
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [searchQuery]);

    const routeToDetail = (video) => {
        navigate(`/video/${video.id}`);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Container>
            <h3 className="text-center">Video List</h3>
            <input className="search-video" placeholder="Search Video" value={searchQuery} onChange={handleSearchChange} />
            <Row className="justify-content-center">
                {data?.map((video, index) => {
                    const canWatch = userAge >= video.pg;

                    return (
                        <Col key={index} className="mb-3">
                            <Card style={{ minWidth: '40rem', maxWidth: '40rem', height: "175px" }}>
                                <Row noGutters>
                                    {canWatch ? (
                                        <Col>
                                            <VPlayer className='videos-player'
                                                source={[
                                                    { label: "480p", url: video.videoUrl },
                                                    { label: "720p", url: video.videoUrl }
                                                ]}
                                            />
                                        </Col>
                                    ) : (
                                        <Col>
                                            <Card.Body>
                                                <p className="text-danger">
                                                    This video is restricted for users above {video.ageRestriction} years old.
                                                </p>
                                            </Card.Body>
                                        </Col>
                                    )}

                                    <Col>
                                        <Card.Body>
                                            <Card.Title>Title: {video.contentTitle}</Card.Title>

                                            {canWatch && (
                                                <Button variant="primary" onClick={() => routeToDetail(video)}>Detail</Button>
                                            )}
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default ViewerDashboard;
