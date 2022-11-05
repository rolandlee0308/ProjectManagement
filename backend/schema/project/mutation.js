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
  deleteProject: async (parent, args) => {
    return await Project.findByIdAndRemove(args.id);
  },
  updateProject: async (parent, args) => {
    return await Project.findByIdAndUpdate(
      args.data.id,
      {
        $set: {
          name: args.data.name,
          description: args.data.description,
          status: args.data.status,
        },
      },
      { new: true }
    );
  },
};
