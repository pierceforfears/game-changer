var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  // custom method added to the User model. it compares the users "password" to the hashed password stored in the database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  // hashes the users password before it is even created.
  User.beforeCreate(function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
