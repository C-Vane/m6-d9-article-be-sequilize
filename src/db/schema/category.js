module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Category.associate = (models) => {
    Category.belongsToMany(models.Articles, { through: "articleCategory", allowNull: false });
  };
  return Category;
};
