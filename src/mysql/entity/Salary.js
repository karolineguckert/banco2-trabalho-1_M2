import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';
import Employee from "./Employee.js";
import Department from "./Department.js";
class Salary extends Model {
    getAllSalariesByEmployeeNumber(emp_no) {
        try {
            return Salary.findAll( {
                where: {
                    emp_no: emp_no
                }
            });
        }
        catch(e){
            console.error("ERROR getAllSalariesByEmployeeNumber ---- ", e);
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