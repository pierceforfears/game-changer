var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const Searches = sequelize.define("Searches", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    xbprice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gsprice: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Searches.associate = function(models) {
    Searches.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Searches;
};
