import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';
import Employee from "./Employee.js";

class Title extends Model {
    getAllTitlesByEmployeeNumber(emp_no) {
        try {
            return Title.findAll({ where: {
                    emp_no: emp_no
                }});
        }
        catch(e){
            console.error("ERROR getAllTitlesByEmployeeNumber ---- ", e);
        }
    }
}

Title.init({
    emp_no: {
        type: Employee,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    from_date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
    to_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'titles',
    timestamps: false,
    tableName: 'titles'
});

Title.belongsTo(Employee, { foreignKey: 'emp_no' });
Employee.hasMany(Title, { foreignKey: 'emp_no'});

export default Title;