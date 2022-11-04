const Client = require("./db");
module.exports.ClientMutation = {
  addClient: (parent, args) => {
    const client = new Client({
      name: args.data.name,
      email: args.data.email,
      phone: args.data.phone,
    });
    return client.save();
  },
  deleteClient: async (parent, args) => {
    return await Client.findByIdAndRemove(args.id)
  },
};
