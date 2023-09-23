module.exports = (sequelize, DataTypes) => {
    const Trainer = sequelize.define('trainer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trainer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
           
    },
    {
        timestamps: false, 
    });


    return Trainer;
}
