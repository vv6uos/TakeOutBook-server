module.exports = function (sequelize, DataTypes) {
  let userBook = sequelize.define(
    "UserBook",
    {
      rental_id: {
        filed: "rental_id",
        type: DataTypes.INTEGER(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fk_user_id: {
        filed: "fk_user_id",
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      fk_book_id: {
        filed: "fk_user_id",
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      rentAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rentBy: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "UserBooks",
    }
  );

  return userBook;
};
