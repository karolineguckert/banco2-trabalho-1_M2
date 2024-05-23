import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';

class Department extends Model {
    getAllDepartments() {
        try {
            return Department.findAll({});
        }
        catch(e){
            console.error("ERROR getAllDepartments---- ", e);
        }
    }
}

Department.init({
    dept_no: {
        type: DataTypes.STRING(4),
        primaryKey: true,
    },
    dept_name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'departments',
    timestamps: false,
    tableName: 'departments'
})
Department.sync();
export default Department;

