import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      description
      name
      status
      client {
        id
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
