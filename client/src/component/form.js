import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import './dashboard.css'
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        iso2: '',
    });
    const dashboardContainerRef = useRef(null);

    const handleCreate = (e) => {
        e.preventDefault();


        fetch('http://localhost:3001/Create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'Registered') {
                    alert('Country created successfully');
                    window.location.reload();
                } else {

                    alert('Error creating country');
                }
            })
            .catch((error) => {
                alert('Error:', error);
            });
    };


    const handleFetchExternalData = async () => {
        try {
            const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                headers: {
                    'X-CSCAPI-KEY': 'UWowS1B5TkZDbDQ5QlI2UjlXQTFNN09hYkEwZmJqdGptZjVZN09yZQ==',
                },
            });

            setCountry(response.data)
            alert("External data are fetched successfully");
           
        } catch (error) {
            console.error('Error fetching external data:', error);
            alert('An error occurred while fetching external data');
        }
    };
    const [country, setCountry] = useState([]);
 console.log(country);

    useEffect(() => {

        async function fetchBookings() {
            try {
                const response = await axios.get('http://localhost:3001/Get_user');
                setCountry(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchBookings();
    }, []);
    const handleShowDashboard = () => {

        dashboardContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/Delete_user/${id}`);

            if (response.data.status === 'deleted') {
                alert('Country successfully deleted');


                setCountry(country.filter((country) => country.id !== id));
            } else if (response.status === 404) {
                alert('Country not found');
            } else {
                alert('Error deleting the country');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the country');
        }
    };

    
    const storeDataInDatabase = async () => {
        try {
          // Insert each item from apiData into the MySQL database
          
            // Perform database insertion using Axios to send a POST request to your Node.js server
           const apiData = await axios.post('http://localhost:3001/api/insertData', {data:country}); // Assuming item contains the data to insert
           console.log(apiData);
          
          alert('Data stored in the database successfully.');
        } catch (error) {
          alert('Error storing data in the database:', error);
        }
      }


    return (
        <>
            <section className='border border-rounded'>
                <div className='mr-3'>
                    <div className='login-box border border-rounded-warning'>
                        <form onSubmit={handleCreate} >
                            <h2 className='text-warning p-3'>Country Code</h2>
                            <div className='input-box mt-3'>
                                <FaUser size={32} className='icon m' />;
                                <input type='text' id='name' name='name' value={formData.name}
                                    onChange={handleInputChange} />
                                <label className=''>Country_name</label>
                            </div>

                            <div className='input-box mt-3'>
                                <FaGlobe size={32} className='icon' />;
                                <input type='text' id='iso2' name='iso2' value={formData.iso2}
                                    onChange={handleInputChange} />
                                <label>Country_code</label>
                            </div>
                            <div className='input-box '>
                                <button type='submit'>Create</button>
                                <button type='button' onClick={handleFetchExternalData}>Sync</button>
                                <button onClick={storeDataInDatabase}>Data Sync To DataBase</button>

                                <button type='button mb-5' onClick={handleShowDashboard} className='mb-4 bg-primary'>Show</button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
            <div className="dash-container" ref={dashboardContainerRef}>
                <table className="dash-table table table-bordered">

                    <thead className=''>
                        <tr>
                            <th>Id</th>
                            <th>Country_name</th>
                            <th>Country_code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='border border-dark'>
                        {country.map((code, index) => (
                            <tr key={index.id}>
                                <td>{code.id}</td>
                                <td>{code.name}</td>
                                <td>{code.iso2}</td>

                                <td>

                                    <button className="bg-primary col-lg-6">Edit</button>
                                    <button className="bg-danger col-lg-6" onClick={() => handleDelete(code.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}