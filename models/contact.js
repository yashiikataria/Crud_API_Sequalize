module.exports=(sequelize,DataTypes)=>{
const Contacts = sequelize.define('Contacts', {
  // Model attributes are defined here
  permanant_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  current_address: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
    tableName:'Contacts'
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Contacts === sequelize.models.Contacts); // true

}