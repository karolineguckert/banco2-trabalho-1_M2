import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';
import Employee from "./Employee.js";
import Department from "./Department.js";
class Salary extends Model {
    getAllSalaries() {
        try {
            return Salary.findAll({limit: 1, include: [Employee]});
        }
        catch(e){
            console.error("ERROR getAllSalaries---- ", e);
        }
    }
}

Salary.init({
    emp_no: {
        type: Employee,
        primaryKey: true
    },
    salary: {
        type: DataTypes.INTEGER,
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
    modelName: 'salaries',
    timestamps: false,
    tableName: 'salaries'
});

Salary.belongsTo(Employee, { foreignKey: 'emp_no' });
Employee.hasMany(Salary, { foreignKey: 'emp_no'});

export default Salary;