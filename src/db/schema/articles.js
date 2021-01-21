module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define("articles", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subhead: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Articles.associate = (models) => {
    Articles.belongsTo(models.Authors, { allowNull: false });
    Articles.belongsToMany(models.Category, { through: "articleCategory", allowNull: false });
    Articles.hasMany(models.Reviews);
    Articles.hasMany(models.Claps);
  };
  return Articles;
};
