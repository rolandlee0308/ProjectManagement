const Client = require("./db");

module.exports.ClientQuery = {
  clients: async (parent, args) => {
    return await Client.find();
  },
  client: async (parent, args) => {
    return await Client.findById(args.id);
  },
};
