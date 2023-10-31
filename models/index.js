  const { Sequelize,DataTypes,Model } = require('sequelize');
  const sequelize = new Sequelize('world', 'root', 'Yashika@2708', {
    host: 'localhost',
    logging:false,
    dialect:'mysql'
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const db={}
  db.sequelize=sequelize
  db.Sequelize=Sequelize
  db.contact=require('./contact')(sequelize,DataTypes)
  db.user=require('./user')(sequelize,DataTypes,Model)
  db.sequelize.sync({force:false})
  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log('Database synchronized');
  // });
  
  module.exports=db