import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './edit-user.css';
import { Form, Button } from 'react-bootstrap';


const EditUserComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate('');

    const [formData, setFormData] = useState({
        role: '',
        username: '',
        email: '',
        age: '',
    });

    useEffect(() => {
        // Fetch content data based on the ID when the component mounts
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${id}`);
                const userData = await response.json();
                setFormData({
                    role: userData.user.role,
                    username: userData.user.username,
                    email: userData.user.email,
                    age: userData.user.age,
                });
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateUserRequest = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(`http://localhost:5000/admin/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            navigate('/admin/dashboard')
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSelectChange = (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            role: value,
        }));
        console.log('value:', value);

    };;

    return (
        <>
            <div className="main-div">
                <div className="sidebar">
                    <h3>Admin Dashboard</h3>
                    {/* <div className="sidebar-navbar">
                        {sideItem?.map((nav, key) => (
                            <div key={key.id} onClick={() => { handleNavigate(nav.path) }} >
                                <h4>{nav.title}</h4>
                            </div>
                        )
                        )}

                    </div> */}
                </div>
                <div className="side-body">
                    <Form className="form-div" onSubmit={handleUpdateUserRequest}>
                        <h3 className="center-div">Edit User</h3>
                        <div className="form-data">

                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    className="input-class"
                                    name="username"
                                    value={formData?.username}
                                    type="text"
                                    placeholder="Producer"
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    className="input-class"
                                    name="email"
                                    value={formData?.email}
                                    type="text"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group controlId="formAge">
                                <Form.Control
                                    className="input-class"
                                    name="age"
                                    value={formData?.age}
                                    type="text"
                                    placeholder="Age"
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group controlId="formRole" className="select-section">
                                <Form.Control as="select" value={formData?.role} onChange={handleSelectChange}>
                                    <option value="">Select an option</option>
                                    <option value="viewer">Viewer</option>
                                    <option value="creator">Creator</option>
                                    {/* Add other options as needed */}
                                </Form.Control>
                            </Form.Group>

                            <Button  type="submit" className='btn'>
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default EditUserComponent