module.exports = function (sequelize, DataTypes) {
  let user = sequelize.define(
    "User",
    {
      user_id: {
        filed: "user_id",
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      user_name: {
        field: "user_name",
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      address: {
        field: "address",
        type: DataTypes.STRING(30),
      },
      email: {
        field: "email",
        type: DataTypes.STRING(30),
      },
      phoneNumber: {
        field: "phoneNumber",
        type: DataTypes.STRING(20),
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "users",
    }
  );
  return user;
};
