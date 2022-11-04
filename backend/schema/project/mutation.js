const Project = require("./db");
module.exports.ProjectMutation = {
  addProject: (parent, args) => {
    const project = new Project({
      name: args.data.name,
      description: args.data.description,
      status: args.data.status,
      clientId: args.data.clientId,
    });
    return project.save();
  },
};
