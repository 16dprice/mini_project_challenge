import {useState} from 'react';
import WizardForm from "./projectWizard/projectForm.component";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import '../styles/create-project-wizard.css'

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
        padding: theme.spacing(2, 4, 2),
    }
}));

export default function NewProject() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <span className="new-card" onClick={handleOpen}>
                <i className="material-icons">book</i>
                New Project
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
                    <WizardForm className={classes.paper} />
                </Fade>
            </Modal>
        </>
    );

}