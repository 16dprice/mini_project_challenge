import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
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

export const AddContributor = props => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getAvailableContributors = () => {
        const users = UserApiAdapter.userList()
        const currentContributorIds = props.project.contributors.map(contributor => contributor.id);

        const availableContributors = users.filter(
            user => !currentContributorIds.includes(user.id)
        );

        return availableContributors.map(contributor => {
            return (
                <div key={contributor.id}>
                    <span>{contributor.firstName} {contributor.lastName}</span>
                    <button style={{float: 'right'}} onClick={() => props.handleContributorAdd(contributor)}>Add</button>
                </div>
            )
        });
    }

    return (
        <>
            <button className="addContributor-button" onClick={handleOpen}>
                <i class="material-icons">person_add</i>Add Contributor
                </button>
            <Modal
                aria-labelledby="add-contributor-modal-title"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div id="add-contributor-modal-title">Users</div>
                        {getAvailableContributors()}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </Fade>
            </Modal>
        </>
    )

}