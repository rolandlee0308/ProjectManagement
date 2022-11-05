import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { GET_PROJECTS } from "../queries/project";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function Projects() {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {data.projects.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ mt: 2 }}
        >
          {data.projects.map((item: any) => (
            <Grid xs={2} sm={4} md={4} key={item.id}>
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  sx={{ flexGrow: 1 }}
                  title={item.name}
                  subheader={item.status}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`projects/${item.id}`}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
