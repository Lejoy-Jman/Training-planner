import React, { useState, useEffect, useMemo } from 'react'
import Users from './Users';
import './style.scss'
import { Navigate, useLocation } from 'react-router-dom';
import Navbar from '../user_component/usernavbar';
import { ToastContainer, toast } from 'react-toastify';
import View_trainings from './view_trainings';
import { useNavigate } from 'react-router-dom';
import userapiService from '../../services/user/userservice';

function UserForm() {
    const [searchQuery, setSearchQuery] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [traindata, setTraindata] = useState([])
    const [id, setId] = useState('')
    const [user_name, setUsername] = useState('')
    const [updateduser, Setupdateduser] = useState()
    const [updatedtraininguser, Setupdatedtraininguser] = useState()
    const location = useLocation()
    const navigate = useNavigate();
    const user_data = location.state
    const username = user_data.user.data.name
    const user_id = user_data.user.data.id
    const getUserdata = async () => {

        try {

            setId(user_id)
            setUsername(username)
            console.log(user_id)
            const req = await userapiService.fetchUserData(user_id);
            if (req.data.length > 0) {

                setUserdata(req.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getregisteredUserdata = async () => {
        try {

            setId(user_id)
            const req = await userapiService.fetchRegisteredUserData(user_id);
            const resData = req.data
            if (resData.length > 0) {
                setTraindata(resData);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserdata();
        getregisteredUserdata();
    }, [updatedtraininguser, updateduser]);

    useEffect(() => {
        const jwtToken = localStorage.getItem('userjwtToken');
        console.log(jwtToken)
        if (!jwtToken) {
            toast.error('Unauthorized access');
            navigate('/');
        }
    }, []); 


    const handleRegister = async (index) => {
        const updatedUsersData = [...userdata];
        const userData = updatedUsersData[index];

        if (userData.no_of_seats > 0) {
            const confirmation = window.confirm('Do you want to register?');

            if (confirmation) {
                userData.no_of_seats -= 1;
                userData.register = true
                try {
                    const reg_train = await userapiService.registerTraining({
                        training_id: userData.id,
                        user_id: id,
                    }).then((response) => {

                        if (response.data.message === 'Register Data Updated successfully') {
                            const updatedUsersData = [...userdata];
                            updatedUsersData[index] = userData;
                            updatedUsersData.splice(index, 1);
                            toast.success("Registeration successful")
                            setUserdata(updatedUsersData);
                            Setupdateduser(userdata)
                        }
                        else {
                            toast.error("Failed to register")
                        }
                    }).catch((e) => {
                        console.log(e)
                    })

                } catch (error) {
                    toast.error('Error registering user:', error);
                }
            }

        }
    };

    const handleUnregister = async (index) => {
        const updatedUsersData = [...traindata];
        const userData = updatedUsersData[index];
        const confirmation = window.confirm('Do you want to unregister this training?');
        if (confirmation) {
            try {
                const unregister = await userapiService.unregisterTraining({
                    training_id: userData.id,
                    user_id: id
                }).then((response) => {
                    if (response.data === 'unregistered successfully') {
                        const updatedUsersData = [...traindata];
                        updatedUsersData[index] = userData;
                        updatedUsersData.splice(index, 1);
                        toast.info("Training unregistered successfully")

                        setTraindata(updatedUsersData)
                        Setupdatedtraininguser(traindata)
                    }
                    else {
                        toast.error("Failed to Unenroll")
                    }
                })
            } catch (error) {
                console.log("error from db")
            }
        }
    }

    return (
        <div>
            <h1>Training Planner</h1>
            <div className="for w-100">
                <div className="container-fluid">
                    <Navbar user={user_data} />
                    <ToastContainer />
                    <React.Fragment>
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        <strong>Available Trainings </strong>
                                    </button>
                                </h2>

                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        <div className="table-responsive table-responsive-sm">
                                            <table className="table table-hover table-bordered results" id="allTrainings">
                                                <thead>
                                                    <tr>
                                                        <th >Domain Name</th>
                                                        <th >Training Name</th>
                                                        <th>Trainer</th>
                                                        <th >Start Date </th>
                                                        <th >Start Time</th>
                                                        <th >End Date</th>
                                                        <th >End Time</th>
                                                        <th >Available Seats</th>
                                                        <th >Enroll</th>
                                                    </tr>
                                                    <tr className="warning no-result">
                                                        <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <Users usersData={userdata} searchQuery={searchQuery} handleRegister={handleRegister} />
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion accordion-flush " id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <strong>Registered Trainings</strong>
                                    </button>
                                </h2>

                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <div className="table-responsive table-responsive-sm">
                                            <table className="table table-hover table-bordered results" id="allTrainings">
                                                <thead>
                                                    <tr>

                                                        <th >Domain Name</th>
                                                        <th >Training Name</th>
                                                        <th>Trainer</th>
                                                        <th >Start Date </th>
                                                        <th >Start Time</th>
                                                        <th >End Date</th>
                                                        <th >End Time</th>
                                                        <th > UnEnroll</th>
                                                    </tr>
                                                    <tr className="warning no-result">
                                                        <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <View_trainings usersData={traindata} handleRegister={handleUnregister} />
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment >
                </div>
            </div>
        </div>
    );
}


export default UserForm;