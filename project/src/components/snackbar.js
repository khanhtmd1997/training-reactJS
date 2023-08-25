import { Alert, Box, Snackbar } from "@mui/material";

function SnackbarComponent(props) {
  const {
    vertical = "top",
    horizontal = "right",
    handleClose,
    open = false,
    message,
    severity = "error", //success || warning || info
    autoHideDuration = 5000,
  } = props;

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={autoHideDuration}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SnackbarComponent;
