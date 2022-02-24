const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init(
    {
      post: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      pictureUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "users",
      onDelete: "CASCADE", // Si on supprime un user, on supprime ses posts
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };
  return Post;
};
