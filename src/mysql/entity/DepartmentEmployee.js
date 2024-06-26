import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';
import Employee from "./Employee.js";
import Department from "./Department.js";
class DepartmentEmployee extends Model {
    getAllDepartmentsEmployeesByEmployeeNumber(emp_no) {
        try {
            return DepartmentEmployee.findAll({where: emp_no, include: [Department]});
        }
        catch(e){
            console.error("ERROR getAllDepartmentsEmployeesByEmployeeNumber---- ", e);
        }
    }
}

DepartmentEmployee.init({
    emp_no: {
        type: Employee,
        primaryKey: true
    },
    dept_no: {
        type: Department,
        primaryKey: true
    },
    from_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    to_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'dept_emp',
    timestamps: false,
    tableName: 'dept_emp'
});

DepartmentEmployee.belongsTo(Employee, { foreignKey: 'emp_no' });
Employee.hasOne(DepartmentEmployee, { foreignKey: 'emp_no'});

DepartmentEmployee.belongsTo(Department, { foreignKey: 'dept_no' });
Department.hasOne(DepartmentEmployee, { foreignKey: 'dept_no'});

export default DepartmentEmployee;