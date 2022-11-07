import { useContext } from 'react'
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};




export default function MUIRegisterFailedModal() {

    const { auth } = useContext(AuthContext);

    function handleConfirmRegisterFailed(){
        auth.closeModal();
    }
    

    return (
        <Modal
            open={auth.registerError}
        >
            <Box sx={style}>
            <div
        id="register-failed-modal"
        // className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-root" id='register-failed-root'>
            <div className="modal-north">
                Registration failed
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    <Alert severity="error">{auth.response}</Alert>
                </div>
            </div>
            <div className="modal-south">
                <Button variant='contained'
                    id="remove-song-confirm-button" 
                    className="modal-button"
                    onClick={handleConfirmRegisterFailed}>Ok</Button>

            </div>
        </div>
    </div>
            </Box>
        </Modal>
    );
}