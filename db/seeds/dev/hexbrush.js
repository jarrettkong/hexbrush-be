const projects = require("../../../data/projects");
const randomHex = require("randomcolor");

const createProject = (knex, project) => {
  return knex("projects")
    .insert(project, "id")
    .then(id => {
      return knex("palettes").insert({
        project_id: id[0],
        color_1: randomHex(),
        color_2: randomHex(),
        color_3: randomHex(),
        color_4: randomHex(),
        color_5: randomHex()
      });
    });
};

exports.seed = function(knex) {
  return knex("palettes")
    .del()
    .then(() => {
      return knex("projects").del();
    })
    .then(async () => {
      await knex.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");
      await knex.raw("TRUNCATE TABLE palettes RESTART IDENTITY CASCADE");
    })
    .then(() => {
      const projectPromises = [];
      projects.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });
      return Promise.all(projectPromises);
    });
};
