import { Box, CircularProgress, Typography } from '@mui/material';
import UsersTable from './components/UsersTable';
import { useState } from 'react';
import UserDetailsDialog from './components/UserDetailsDialog';
import type { User } from './types';
import ErrorSnackbar from './components/ErrorSnackbar';
import { useUsers } from './hooks/useUsers';

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const { users, showError, loading, fetchUsers, dismissError } = useUsers();

  function handleViewDetailsClick(userId: number) {
    const activeUser = users.find((u) => u.id === userId) || null;
    if (activeUser) {
      setActiveUser(activeUser);
    }
    setOpenDialog(true);
  }

  return (
    <div className="flex justify-center py-[50px] flex-col gap-5 container mx-auto items-center">
      <Typography variant="h2" className="text-sky-500 pb-[80px]">
        User Explorer
      </Typography>

      {showError && (
        <ErrorSnackbar handleRetry={fetchUsers} showError={showError} />
      )}

      {loading ? (
        <Box className={'flex items-center justify-center h-[20vh]'}>
          <CircularProgress />
        </Box>
      ) : !showError ? (
        <UsersTable
          users={users}
          handleViewDetailsClick={handleViewDetailsClick}
        />
      ) : (
        <></>
      )}

      <UserDetailsDialog
        handleClose={() => {
          setOpenDialog(false);
        }}
        open={openDialog}
        user={activeUser}
      />
    </div>
  );
}

export default App;
