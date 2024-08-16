import React from 'react';
import './Notification.css';
import { Alert, Snackbar } from '@mui/material';

function Notification(props) {

    const statusCode = {
        "200": "success",
        "400": "warning",
        "401": "warning",
        "403": "warning",
        "500": "error",
    }

    var code = statusCode[`"${props.code}"`];

    const [state, setState] = React.useState({
        open: true,
        vertical: "top",
        horizontal: "right",
    });

    const { vertical, horizontal, open } = state;

    return (
        <div className='app--notification'>
            <Snackbar anchorOrigin={{ vertical, horizontal }}
                open={open}
                style={{
                    width: "300px"
                }}>
                <Alert severity={code}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification