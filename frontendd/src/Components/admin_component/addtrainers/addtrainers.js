import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Addtrainer(props) {
    const [modalShow, setModalShow] = useState(false);
    const [trainers, setTrainers] = useState({
        trainer: '',
        domain: ''
    });
    const formRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();

    };
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
                        Add a Trainer
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="train">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col-xs" >

                                    <form onSubmit={handleSubmit} ref={formRef}>

                                        <div className="form-group">
                                            <label for="trainer">Trainer Name<span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="trainer"
                                                placeholder="Trainer"
                                                name="trainer"

                                                onChange={(e) => setTrainers({ ...trainers, trainer: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="domain">Domain <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="domain"
                                                placeholder="Title"
                                                name="domain"

                                                onChange={(e) => setTrainers({ ...trainers, domain: e.target.value })}
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
            <Addtrainer
                show={modalShow}
                onHide={() => setModalShow(false)}
            />


        </>
    );
}

export default Addtrainer;