// IMPORT ALL NECESSARY PACKAGES
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import adminApiService from '../../../services/admin/adminservice';

function History() {
    const [tableData, setTableData] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [updated, setUpdated] = useState()
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handlerestore = async (itemId) => {

        const id = itemId
        try {
            const response = await adminApiService.restoreTraining(itemId);

            if (response.data.message === 'Training restored successfully') {

                const updatedTableData = tableData.filter(item => item.id !== itemId);
                setTableData(updatedTableData);
                toast.success("Training restored succesfully")
                setUpdated(updatedTableData)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)


            } else {
                toast.error('Error deleting item');
            }
        } catch (error) {
            console.log('Error deleting item:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await adminApiService.fetchDeletedTrainings();
            if (response.status === 200) {
                setTableData(response.data.data);

            } else {
                console.log('Error response:');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();

    }, [updated]);

    return (
        <>
            <div className="main-user">
                <div className="table-responsive table-responsive-sm">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" >Project Name</th>
                                <th scope="col" >Trainer</th>
                                <th scope="col" >Domain</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Date</th>
                                <th scope="col">End Time</th>
                                <th scope="col">RegisteredUsers</th>
                                <th scope="col">VacanciesLeft</th>
                                <th scope="col"> Recycle</th>

                            </tr>
                        </thead>
                        <tbody>

                            {tableData ? tableData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.training_name}</td>
                                    <td>{item.trainer}</td>
                                    <td>{item.domain}</td>
                                    
                                    <td>{(item.startdate).split('T')[0]}</td>
                                    <td>{new Date((item.startdate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                    <td>{(item.enddate).split('T')[0]}</td>
                                    <td>{new Date((item.enddate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>

                                    <td>{(item.initial_seats) - (item.no_of_seats)}</td>
                                    <td>{item.no_of_seats}</td>
                                    <td><button className='icon' onClick={() => handlerestore(item.id)}><i class="fa-solid fa-clock-rotate-left"></i></button></td>

                                </tr>
                            )) : ""}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    );
}

export default History;