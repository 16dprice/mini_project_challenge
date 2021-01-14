import {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../styles/modal.css'

import UserApiAdapter from "../api/userApiAdapter";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 8,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
    }
}));

export const NewUser = props => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clearState = () => {
        setUserName('');
        setFirstName('');
        setLastName('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        UserApiAdapter.createNewUser(userName, firstName, lastName)
            .then(res => props.getUserObjects());
        clearState();
        handleClose();
    };

    const handleCancel = (event) => {
        event.preventDefault();

        clearState();
        handleClose();
    };

    useEffect(() => {
            if(userName.length === 0 || firstName.length === 0 || lastName.length === 0) {
                setSubmitEnabled(false);
            } else {
                setSubmitEnabled(true);
            }
        }, [userName, firstName, lastName]
    );

    return (
        <>
            <span className="new-card" onClick={handleOpen}>
                <i className="material-icons">person_add</i>
                New User
            </span>
            <Modal
                aria-labelledby="new-user-modal-title"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={open}>
                    <form className={classes.paper} onSubmit={handleSubmit}>
                        <p id="new-user-modal-title" className="modal-title">Create User</p>
                        <div>
                            <input type="text" onChange={e => setUserName(e.target.value)} 
                                value={userName} placeholder="Enter username"/>
                        </div>
                        <div>
                            <input type="text" onChange={e => setFirstName(e.target.value)} 
                                value={firstName} placeholder="Enter First Name"/>
                        </div>
                        <div>
                            <input type="text" onChange={e => setLastName(e.target.value)} 
                                value={lastName} placeholder="Enter Last Name"/>
                        </div>
                        <div className="form-control-group">
                            <button className="form-button" onClick={handleCancel}>
                                <i className="material-icons">clear</i>Cancel
                            </button>
                            <input id="submitButton" className="form-button" type="submit" value="Create" disabled={!submitEnabled}/>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </>
    );
}