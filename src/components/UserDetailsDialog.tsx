import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import type { User } from '../types';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkIcon from '@mui/icons-material/Link';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';

interface UserDetailsDialogProps {
  user: User | null;
  open: boolean;
  handleClose: () => void;
}

function UserDetailsDialog({
  user,
  open,
  handleClose,
}: UserDetailsDialogProps) {
  if (!user) return null;

  const details = [
    { icon: <EmailIcon />, label: 'Email', value: user.email },
    { icon: <PhoneIcon />, label: 'Phone', value: user.phone },
    { icon: <LinkIcon />, label: 'Website', value: user.website },
    {
      icon: <HomeIcon />,
      label: 'Address',
      value: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
    },
    {
      icon: <BusinessIcon />,
      label: 'Company info',
      value: `${user.company.name} - ${user.company.catchPhrase}`,
    },
  ];

  return (
    <Dialog open={open} keepMounted onClose={handleClose} fullWidth>
      <DialogTitle>{user.name}</DialogTitle>
      <DialogContent dividers>
        <List className="w-full">
          {details.map((item) => (
            <ListItem key={item.label}>
              <ListItemAvatar>
                <Avatar>{item.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.label} secondary={item.value} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDetailsDialog;
