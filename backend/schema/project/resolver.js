const Client = require("../client/db");

module.exports.ProjectResolver = {
  client: async (parent, args) => {
    return await Client.findById(parent.clientId);
  },
};
