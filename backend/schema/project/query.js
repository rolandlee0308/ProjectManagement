const Project = require("./db");

module.exports.ProjectQuery = {
  projects: async (parent, args) => {
    return await Project.find();
  },
  project: async (parent, args) => {
    return await Project.findById(args.id);
  },
};
