import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClientInfo from "../component/ClientInfo";
import Spinner from "../component/Spinner";
import { GET_PROJECT, GET_PROJECTS } from "../queries/project";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_PROJECT } from "../mutations/project";
import EditProject from "../component/EditProject";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => navigate("/"),
    update(cache, { data: { deleteProject } }) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project: any) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {!loading && !error && (
        <Box>
          <Typography variant="h3">{data.project.name}</Typography>
          <Typography variant="subtitle1">{data.project.status}</Typography>
          <Typography variant="body1" sx={{ mt: 5 }}>
            {data.project.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 5 }}>
            Client Information:
          </Typography>
          <ClientInfo
            name={data.project.client.name}
            phone={data.project.client.phone}
            email={data.project.client.email}
          />
          <Box sx={{ display: "flex" }}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{ mt: 2 }}
              onClick={() => deleteProject({ variables: { id } })}
              color="error"
            >
              Delete Project
            </Button>
            <EditProject info={data.project} />
          </Box>
        </Box>
      )}
    </>
  );
}
