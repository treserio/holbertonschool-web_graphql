const gql = require('graphql');
const lod = require('lodash');
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
        resolve: (parent) => lod.find(projects, {id: parent.projectId}),
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
      resolve: (parent) => lod.filter(tasks, {projectId: parent.id}),
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
      resolve: (_, args) => lod.find(tasks, {id: args.id}),
    },
    tasks: {
      type: new gql.GraphQLList(TaskType),
      resolve: () => tasks,
    },
    project: {
      type: ProjectType,
      args: {
        id: {type: gql.GraphQLID},
      },
      resolve: (_, args) => lod.find(projects, {id: args.id}),
    },
    projects: {
      type: new gql.GraphQLList(ProjectType),
      resolve: () => projects,
    },
  },
});

const tasks = [
  {
    id: "1",
    title: "Create your first webpage",
    weight: 1,
    description:
      "Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)",
    projectId: "62fd7a9c026aae0d85d3a20f",
  },
  {
    id: "2",
    title: "Structure your webpage",
    weight: 1,
    description:
      "Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order",
    projectId: "62fd7a9c026aae0d85d3a20f",
  }
];

const projects = [
  {
    id: "1",
    title: "Advanced HTML",
    weight: 1,
    description:
      "Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!",
  },
  {
    id: "2",
    title: "Bootstrap",
    weight: 1,
    description:
      "Bootstrap is a free and open-source front-end web framework for developing with HTML, CSS, and JS. It contains HTML, CSS, and JS components for faster and easier web development. Bootstrap is the world’s most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",
  },
];

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
      resolve: () => {
        for (t of RootQuery._fields.tasks.resolve()) {
          if (t.title && t.weight && t.description) {
            new Task({
              title: t.title,
              weight: t.weight,
              description: t.description,
              projectId: t.projectId,
            }).save();
          }
        }
        return tasks;
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
      resolve: () => {
        for (p of RootQuery._fields.projects.resolve()) {
          if (p.title && p.weight && p.description) {
            new Project({
              title: p.title,
              weight: p.weight,
              description: p.description,
            }).save();
          }
        }
        return projects;
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
