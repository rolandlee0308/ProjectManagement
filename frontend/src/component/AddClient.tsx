import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import { ADD_CLIENT } from "../mutations/client";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/client";

export default function AddClient() {
  const [open, setOpen] = React.useState(false);
  const [client, setClient] = React.useState({
    name: "",
    phone: "",
    email: "",
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    update(cache, { data: { addClient } }) {
      const { clients }: any = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClient({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<PersonAddIcon />}
        sx={{ mt: 2 }}
        onClick={handleClickOpen}
      >
        Add Client
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center" }}>Add Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onBlur={(e) => setClient({ ...client, name: e.target.value })}
            required
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            onBlur={(e) => setClient({ ...client, email: e.target.value })}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            type="tel"
            onBlur={(e) => setClient({ ...client, phone: e.target.value })}
            label="Phone Number"
            name="phone"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (!client.name || !client.email || !client.phone) {
                return alert("Please fill in all fields");
              }
              addClient({ variables: { data: client } });
              handleClose();
            }}
          >
            Add Client
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
