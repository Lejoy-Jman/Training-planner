// IMPORT ALL NECESSARY PACKAGES
import './style.scss'
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import View_training from '../viewTraining/view_trainings';
import Archieve from '../archieveTrainings/archieve';
import Navbar from '../navigationBar/adminnavbar';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApiService from '../../../services/admin/adminservice';
import Addtrainer from '../addtrainers/addtrainers';

function MyFormModal(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [training, setTraining] = useState({
        training_name: '',
        trainer: '',
        skill: '',
        description: '',
        domain: 'Full Stack',
        seats: 1,
    });
    const formRef = useRef()
    const navigate = useNavigate();

    // // pdf upload
    // const [selectedFile, setSelectedFile] = useState(null);
    // const handleFileUpload = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedFile(file);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminApiService.createTraining(training);
            if (response.data.message === 'response success') {
                toast.success("Training created")
                setTimeout(() => {
                    formRef.current.reset()
                    window.location.reload()
                }, 1500);

            } else {
                toast.error('Set training failed');
                formRef.current.reset()
            }
        } catch (error) {
            toast.error('Registering error:', error);
            formRef.current.reset()
        }
    };
    useEffect(() => {
        const jwtToken = localStorage.getItem('adminjwtToken');
        console.log(jwtToken)
        if (!jwtToken) {
            toast.error('Unauthorized access');
            navigate('/');
        }
    }, []);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Schedule a Training
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="train">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col-xs" >

                                    <form onSubmit={handleSubmit} ref={formRef}>

                                        <div className="form-group">
                                            <label for="trainingName">Training Name <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="trainingName"
                                                placeholder="Training Name"

                                                onChange={(e) => setTraining({ ...training, training_name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="trainer">Trainer <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="trainer"
                                                placeholder="Trainer"

                                                onChange={(e) => setTraining({ ...training, trainer: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="skillTitle">Skill Title <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="skillTitle"
                                                placeholder="Title"

                                                onChange={(e) => setTraining({ ...training, skill: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="description">Description</label>
                                            <textarea
                                                id="description"
                                                placeholder="Leave a comment here"

                                                onChange={(e) => setTraining({ ...training, description: e.target.value })}

                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label for="domain">Domain <span className='reqfield'> * </span></label>
                                            <select
                                                id="domain"

                                                onChange={(e) => setTraining({ ...training, domain: e.target.value })}
                                                required
                                            >
                                                <option value="Full Stack">Full Stack</option>
                                                <option value="Data">Data</option>
                                                <option value="Consulting">Consulting</option>
                                            </select>
                                        </div>
                                        <div className='time'>
                                            <div className="form-group">

                                                <label for="startDate">Start Date <span className='reqfield'> * </span></label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        setTraining({ ...training, startDate: date });
                                                    }}
                                                    dateFormat="Pp"
                                                    showTimeSelect
                                                    timeFormat="p"
                                                    minDate={new Date()}
                                                    required
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label for="endDate">End Date <span className='reqfield'> * </span></label>
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={(date) => {
                                                        setEndDate(date);
                                                        setTraining({ ...training, endDate: date });
                                                    }}
                                                    dateFormat="Pp"
                                                    showTimeSelect
                                                    timeFormat="p"
                                                    minDate={startDate}
                                                    required
                                                />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="seats">No of Seats <span className='reqfield'> * </span></label>
                                            <input
                                                type="number"
                                                id="seats"
                                                placeholder="Seats"
                                                min="1"
                                                max="99"

                                                onChange={(e) => setTraining({ ...training, seats: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className='end'>
                                            <Button type="submit" className="button_" name="Submit">
                                                Submit
                                            </Button>
                                            <Button className="close" onClick={props.onHide}>
                                                Close
                                            </Button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default function Admin_training() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <h1 className='headings'>Training Planner</h1>
            <div className='maincontent'>

                <div >
                    <Navbar />
                    <div >
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Create a training
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        <div className='add'>
                                            <div>

                                                <Button className='newtrainer' variant="primary" onClick={() => setModalShow(true)}>
                                                    <i class="fa-solid fa-user-plus"></i>
                                                </Button>

                                            </div>
                                            <div>
                                                <Button className='create' variant="primary" onClick={() => setModalShow(true)}>
                                                    <i class="fa-solid fa-plus"></i>
                                                </Button>
                                            </div>
                                        </div>

                                        <View_training />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion accordion-flush " id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Archieved Trainings
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div classNameName="accordion-body">
                                        <Archieve />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MyFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
