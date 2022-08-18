const gql = require('graphql');
const Task = require('../models/task');
const Project = require('../models/project');

const TaskType = new gql.GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: {type: gql.GraphQLID},
      title: {type: gql.GraphQLString},
      weight: {type: gql.GraphQLInt},
      description: {type: gql.GraphQLString},
      project: {
        type: ProjectType,
        resolve: (parent) => Project.findById(parent.projectId),
      },
    })
});

const ProjectType = new gql.GraphQLObjectType({
  name: 'Project',
  fields: {
    id: {type: gql.GraphQLID},
    title: {type: gql.GraphQLString},
    weight: {type: gql.GraphQLInt},
    description: {type: gql.GraphQLString},
    tasks: {
      type: new gql.GraphQLList(TaskType),
      resolve: (parent) => Task.find({projectId: parent.id}),
    },
  }
});

const RootQuery = new gql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: {type: gql.GraphQLID},
      },
      resolve: (_, args) => Task.findById(args.id),
    },
    tasks: {
      type: new gql.GraphQLList(TaskType),
      resolve: () => Task.find(),
    },
    project: {
      type: ProjectType,
      args: {
        id: {type: gql.GraphQLID},
      },
      resolve: (_, args) => Project.findById(args.id),
    },
    projects: {
      type: new gql.GraphQLList(ProjectType),
      resolve: () => Project.find(),
    },
  },
});

const mutation = new gql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: {type: new gql.GraphQLNonNull(gql.GraphQLString)},
        weight: {type: new gql.GraphQLNonNull(gql.GraphQLInt)},
        description: {type: new gql.GraphQLNonNull(gql.GraphQLString)},
        projectId: {type: new gql.GraphQLNonNull(gql.GraphQLString)},
      },
      resolve: (_, args) => new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        }).save(),
    },
    addTaskz: {
      type: new gql.GraphQLList(TaskType),
      resolve: async () => {
        res = await RootQuery._fields.tasks.resolve();
        for (t of res) {
          if (t.title && t.weight && t.description) {
            new Task({
              title: t.title,
              weight: t.weight,
              description: t.description,
              projectId: t.projectId,
            }).save();
          }
        }
        return res;
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        title: {type: new gql.GraphQLNonNull(gql.GraphQLString)},
        weight: {type: new gql.GraphQLNonNull(gql.GraphQLInt)},
        description: {type: new gql.GraphQLNonNull(gql.GraphQLString)},
      },
      resolve: (_, args) => new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        }).save(),
    },
    addProjectz: {
      type: new gql.GraphQLList(ProjectType),
      resolve: async () => {
        res = await RootQuery._fields.projects.resolve();
        for (p of res) {
          if (p.title && p.weight && p.description) {
            new Project({
              title: p.title,
              weight: p.weight,
              description: p.description,
            }).save();
          }
        }
        return res;
      }
    },
  }
});

const schema = new gql.GraphQLSchema({
  query: RootQuery,
  mutation,
});

module.exports = schema;
"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first frong-end web development."
