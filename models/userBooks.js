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
      rentAt: {
        type: DataTypes.DATE,
      },
      rentBy: {
        type: DataTypes.DATE,
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
