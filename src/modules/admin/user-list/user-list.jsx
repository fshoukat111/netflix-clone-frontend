import React, { useState, useEffect } from 'react';
import './user-list.css';
import { useNavigate } from 'react-router-dom';
import { Table,Button  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserListComponent = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const filterUser = result.users.filter((user) => {
        return user.role !== "admin"
      })
      setData(filterUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {


    fetchData();
  }, []);

  const handleEditUser = (user) => {
    navigate(`/admin/user/edit/${user.id}`)
  }

  const handleDeleteUser = async (user) => {
    const deleteUrl = `http://localhost:5000/admin/delete/${user.id}`;

    try {
      // Defining the options for the DELETE request
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add additional headers if needed
        },
      };

      const response = await fetch(deleteUrl, deleteOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally display a success message or perform other actions after successful deletion
      console.log(`User with ID ${user.id} has been successfully deleted.`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      // Handle error if needed
      console.error('Error deleting user data:', error);
      // Optionally display an error message to the user
      alert('An error occurred while deleting the user. Please try again.');
    }
  };

  return (
    <div className='main-users-section'>
      <h2>User List</h2>

      <div className="container mt-4">
        <Table>
          <thead>
            <tr>
              <th>username</th>
              <th>email</th>
              <th>age</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.age}</td>
                <td>{user?.role}</td>
                <td>
                  <Button variant="primary" className='button-class' onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button variant="danger"className='button-class' onClick={() => handleDeleteUser(user)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </div>
  )
}

export default UserListComponent