import React from 'react';
import './Error.css'
import { Alert, Snackbar } from '@mui/material';

function Error(props) {

  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  return (
    <div className='app--error'>
      <Snackbar anchorOrigin={{ vertical, horizontal }}
        open={open}
        style={{
          width: "300px"
        }}>
        <Alert severity="error">
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Error