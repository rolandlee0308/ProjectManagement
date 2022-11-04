// const Client = require("./db");
const { clients } = require("../_mockData");

module.exports.ClientQuery = {
  clients: (parent, args) => {
    // return Client.find();
    return clients;
  },
  client: (parent, args) => {
    // return Client.findById(args.id);
    return clients.find((client) => client.id === args.id);
  },
};
