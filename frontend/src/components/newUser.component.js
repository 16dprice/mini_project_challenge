import {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import UserApiAdapter from "../api/userApiAdapter";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default function NewUser() {

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

        UserApiAdapter.createNewUser(userName, firstName, lastName);
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
            <span className="new-card">
                <i className="material-icons">person_add</i>
                <a onClick={handleOpen}>New User</a>
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
                        <p id="new-user-modal-title">Create User</p>
                        <div><input type="text" onChange={e => setUserName(e.target.value)} value={userName}/></div>
                        <div><input type="text" onChange={e => setFirstName(e.target.value)} value={firstName}/></div>
                        <div><input type="text" onChange={e => setLastName(e.target.value)} value={lastName}/></div>
                        <div>
                            <button onClick={handleCancel}>Cancel</button>
                            <input type="submit" value="Submit" disabled={!submitEnabled}/>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </>
    );
}