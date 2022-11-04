module.exports.ProjectTypes = `
    type Project {
        id: ID
        name: String
        description: String
        status: String,
        client: Client
    }
    extend type Query {
        projects: [Project]
        project(id: String!): Project
    }
    enum Status {
      new
      progress
      completed
    }
    input AddProjectInput {
      name: String
      description: String
      status: Status
      clientId: ID!
    }
    extend type Mutation {
      addProject(data: AddProjectInput!): Project
    }
`;
