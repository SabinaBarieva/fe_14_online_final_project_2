import React from 'react';
import {
  Avatar,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import UserProfileInfo from '../../components/UserProfileInfo';

function UserPage() {
  return (
    <Grid
      container
      sx={{
        textAlign: 'center',
      }}>
      <Grid item xs={12} md={6}>
        <UserProfileInfo />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box my={2}>
          <Typography variant="h6" gutterBottom>
            Recent Orders
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>1</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #1" secondary="July 20, 2023" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>2</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #2" secondary="July 19, 2023" />
            </ListItem>
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}
export default UserPage;
