import { Button, Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
  showError: boolean;
  handleRetry: () => void;
}

function ErrorSnackbar({ showError, handleRetry }: ErrorSnackbarProps) {
  return (
    <Snackbar open={showError}>
      <Alert
        action={
          <Button color="inherit" size="small" onClick={handleRetry}>
            Retry
          </Button>
        }
        severity="error"
      >
        Something went wrong
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
