import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    maxWidth: "170px",
    marginBottom: "24px",
  },
  button: {
    marginTop: "20px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "& h4": {
      margin: "16px 0px",
    },
    "& p": {
      marginBottom: "24px",
    },
  },
}));

const PurchaseDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleOk = () => {
    handleClose();
    history.push("/requestpolicy");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="purchase-dialog-title"
      aria-describedby="purchase-dialog-description"
    >
      <DialogContent className={classes.content}>
        <img
          src="/images/appointmentComfirm.png"
          alt="appointmentComfirm"
          className={classes.img}
        />
        <Typography variant="h4">Purchase Request!</Typography>
        <Typography variant="body2" id="purchase-dialog-description">
          Your request for purchasing the policy has been sent successfully.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleOk}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseDialog;
