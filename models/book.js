module.exports = function (sequelize, DataTypes) {
  const book = sequelize.define("Book", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    imgURL: {
      type: DataTypes.STRING(500),
    },

    address: {
      field: "address",
      type: DataTypes.STRING(30),
    },
  });
  return book;
};
