import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation AddProject($data: AddProjectInput!) {
    addProject(data: $data) {
      id
      name
      description
      status
      client {
        name
        email
        phone
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation updateProject($data: UpdateProjectInput!) {
    updateProject(data: $data) {
      id
      name
      description
      status
      client {
        id
      }
    }
  }
`;
