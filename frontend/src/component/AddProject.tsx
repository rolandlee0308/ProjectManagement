import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/project";
import { GET_CLIENTS } from "../queries/client";
import { ADD_PROJECT } from "../mutations/project";

export default function AddProject() {
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState({
    name: "",
    description: "",
    status: "new",
    clientId: "",
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProject({
      name: "",
      description: "",
      status: "new",
      clientId: "",
    });
  };

  if (loading) return <></>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div style={{ marginLeft: 15 }}>
      <Button
        variant="outlined"
        startIcon={<PlaylistAddIcon />}
        sx={{ mt: 2 }}
        onClick={handleClickOpen}
      >
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center" }}>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onBlur={(e) => setProject({ ...project, name: e.target.value })}
            required
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="des"
            type="text"
            onBlur={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            label="Description"
            name="des"
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Status *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project.status}
              label="Status"
              onChange={(e) =>
                setProject({ ...project, status: e.target.value })
              }
            >
              <MenuItem value={"new"}>Not Started</MenuItem>
              <MenuItem value={"progress"}>In Progress</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="clientId">Client *</InputLabel>
            <Select
              labelId="clientId"
              id="clientId-select"
              value={project.clientId}
              label="clientId"
              onChange={(e) =>
                setProject({ ...project, clientId: e.target.value })
              }
            >
              {data.clients.map((item: any) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (
                !project.name ||
                !project.status ||
                !project.description ||
                !project.clientId
              ) {
                return alert("Please fill in all fields");
              }
              addProject({ variables: { data: project } });
              handleClose();
            }}
          >
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
