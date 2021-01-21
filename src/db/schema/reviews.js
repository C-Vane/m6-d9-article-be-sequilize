module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("reviews", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Articles);
    Reviews.belongsTo(models.Authors);
  };
  return Reviews;
};
