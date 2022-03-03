const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 1000],
        },
      },
      pictureUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "http://localhost:3000/images/default_profile_picture.png",
      },
      bio: {
        type: DataTypes.STRING(200),
        defaultValue: "Pas de biographie",
        validate: {
          len: [0, 200],
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
    });
  };
  return User;
};
