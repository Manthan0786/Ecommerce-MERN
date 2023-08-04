import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open] = React.useState(true);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Sign up or LogIn"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=> window.location.href = '/signup' }>Sign Up</Button>
          <Button onClick={()=> window.location.href = '/login' }>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}