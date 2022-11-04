module.exports.ClientTypes = `
    type Client {
        id: ID
        name: String
        email: String
        phone: String
    }
    extend type Query {
        clients: [Client]
        client(id: String!): Client
    }
    input AddClientInput {
        name: String!
        email: String
        phone: String
    }
    extend type Mutation {
        addClient(data: AddClientInput!): Client
        deleteClient(id: ID!): Client
    }
`;
