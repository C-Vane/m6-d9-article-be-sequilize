const { Sequelize, DataTypes } = require("sequelize");
const Article = require("./schema/articles");
const Author = require("./schema/authors");
const Category = require("./schema/category");
const Claps = require("./schema/claps");
const Reviews = require("./schema/reviews");
const ArticleCategory = require("./schema/articleCategory");
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
});

const models = {
  Articles: Article(sequelize, DataTypes),
  Authors: Author(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Claps: Claps(sequelize, DataTypes),
  Reviews: Reviews(sequelize, DataTypes),
  ArticleCategory: ArticleCategory(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

//TO DO?
models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
