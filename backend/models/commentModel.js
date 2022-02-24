const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      postId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE", // Si on supprime un post, on supprime ses réponses //
    });
  };
  return Comment;
};
