module.exports = (sequelize, DataTypes) => {
  const ArticleCategory = sequelize.define("articleCategory", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "articles",
        key: "_id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "_id",
      },
    },
  });
  return ArticleCategory;
};
