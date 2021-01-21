module.exports = (sequelize, DataTypes) => {
  const Claps = sequelize.define("claps", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  Claps.associate = (models) => {
    Claps.belongsTo(models.Articles);
    Claps.belongsTo(models.Authors);
  };
  return Claps;
};
