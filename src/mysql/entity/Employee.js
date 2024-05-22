import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';

class Employee extends Model {
    getAllEmployees() {
        try {
            return Employee.findAll({limit: 10});
        }
        catch(e){
            console.error("ERROR getAllEmployees ---- ", e);
        }
    }
}

Employee.init({
    emp_no: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(14),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    hire_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'employees',
    timestamps: false,
    tableName: 'employees'
})
Employee.sync();
export default Employee;

