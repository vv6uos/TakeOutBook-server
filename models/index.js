"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Book = require("./book")(sequelize, Sequelize);
db.UserBook = require("./userBook")(sequelize, Sequelize);

db.Book.belongsToMany(db.User, {
  through: db.UserBook,
  as: "Readers",
  //유저정보가 사라질시 해당하는 데이터들이 사라짐
  foreignKey: "fk_book_id",
  onDelete: "cascade",
});
db.User.belongsToMany(db.Book, {
  through: db.UserBook,
  foreignKey: "fk_user_id",
  as: "ReadBooks",
});

db.User.hasMany(db.UserBook, { foreignKey: "fk_user_id", onDelete: "cascade" });
db.UserBook.belongsTo(db.User, { foreignKey: "fk_user_id" });

db.Book.hasMany(db.UserBook, { foreignKey: "fk_book_id" });
db.UserBook.belongsTo(db.Book, { foreignKey: "fk_book_id" });

module.exports = db;
