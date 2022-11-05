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
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/project";
import { GET_CLIENTS } from "../queries/client";
import { EDIT_PROJECT } from "../mutations/project";

const StatusType: any = {
  "Not Started": "new",
  "In Progress": "progress",
  Completed: "completed",
};

export default function EditProject({ info }: any) {
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState({
    id: info.id,
    name: info.name,
    description: info.description,
    status: StatusType[info.status],
    clientId: info.client.id,
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);
  //   const { loading, error, data } = useQuery(GET_PROJECTS);

  // NOTE: GET_PROJECTS needs to be executed prior in order to update cache. (refresh project page will cause error)
  const [updateProject] = useMutation(EDIT_PROJECT, {
    // refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    update(cache, { data: { updateProject } }) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.map((item: any) => {
            if (item.id === updateProject.id) {
              return updateProject;
            }
            return item;
          }),
        },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <></>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div style={{ marginLeft: 15 }}>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        sx={{ mt: 2 }}
        onClick={handleClickOpen}
      >
        Edit Project
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center" }}>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="des"
            type="text"
            value={project.description}
            onChange={(e) =>
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
              updateProject({ variables: { data: project } });
              handleClose();
            }}
          >
            Edit Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
