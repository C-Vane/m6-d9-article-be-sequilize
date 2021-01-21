module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define("authors", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
  });
  Authors.associate = (models) => {
    Authors.hasMany(models.Articles);
    Authors.hasMany(models.Claps);
    Authors.hasMany(models.Reviews);
  };
  return Authors;
};
