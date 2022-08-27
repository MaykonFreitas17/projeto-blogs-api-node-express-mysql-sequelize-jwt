'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  }, { timestamps: false });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostCategory;
};