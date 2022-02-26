module.exports = function (sequelize, DataTypes) {
  const book = sequelize.define(
    "Book",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      imgURL: {
        type: DataTypes.STRING(500),
      },
      onRent: {
        field: "onRent",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "렌트중인지 아닌지 알수있음",
      },
      author: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "Books",
    }
  );

  return book;
};
