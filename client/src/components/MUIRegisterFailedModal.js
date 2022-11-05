import { useContext } from 'react'
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
    const { store } = useContext(GlobalStoreContext);
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
                    {auth.response}
                </div>
            </div>
            <div className="modal-south">
                <input type="button" 
                    id="remove-song-confirm-button" 
                    className="modal-button" 
                    onClick={handleConfirmRegisterFailed} 
                    value='Ok' />
            </div>
        </div>
    </div>
            </Box>
        </Modal>
    );
}