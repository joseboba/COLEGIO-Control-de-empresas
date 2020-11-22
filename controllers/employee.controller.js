'use sctrict';

var Employee = require('../models/employee.model');
var Enterprise = require('../models/enterpirse.model');

function saveEmployee(req, res){
    let params = req.body;
    let employee = new Employee();
    
    if(params.name && params.lastname && params.email && params.email && params.dpi && params.enterprise && params.departament && params.position){
        Employee.findOne({dpi: params.dpi}, (err, employeeFound) =>{
            if(err){
                res.status(500).send(err);
            }else if(employeeFound){
                res.status(403).send({message: 'Este empleado ya fue asignado:', employeeFound});
            }else{
                employee.name = params.name;
                employee.lastname = params.lastname;
                employee.phone = params.phone;
                employee.email = params.email;
                employee.position = params.position;
                employee.departament = params.departament;
                employee.salary = params.salary;
                employee.supervisor = params.supervisor;
                employee.dpi = params.dpi;
                employee.enterprise = params.enterprise;
                employee.save((err, employeeSaved) =>{
                    if(err){
                        res.status(500).send(err);
                    }else if(employeeSaved){
                        Enterprise.findOneAndUpdate({name: params.enterprise}, {$push:{employees: employee}}, {new: true}, (err, enterpriseUpdated) =>{
                            if(err){
                                res.status(500).send(err);
                            }else if(enterpriseUpdated){
                                res.send({message: 'Se ha guardado el siguiente empleado:', employeeSaved});
                            }else{
                                res.status(418).send({message: 'No se ha guardado el empleado en la empresa'});
                            }
                        });
                    }else{
                        res.status(418).send({message: 'No se ha podido guardar el empleado'});
                    }
                });
            }
        });
    }else{
        res.send({message: 'Ingrese los campos necesarios'})
    }
}


function updateEmployee(req, res){
    let employeeId = req.params.id;
    let change = req.body;
    Employee.findOne({$or:[{dpi: change.dpi}, {email: change.email}, {phone: change.phone}]},(err, employeeFound) =>{
        if(err){
            res.status(500).send(err);
        }else if(employeeFound){
            res.send({message: 'No puede asignar valores de otros empleados'});
        }else{  
        Employee.findByIdAndUpdate(employeeId, change, {new: true}, (err, employeeChanged)=>{
            if(err){
                res.status(500).send(err)
            }else if(employeeChanged){
                res.send(employeeChanged);
            }else{
                res.status(404).send({message: 'Ingrese un ID existente'});
            }
        });
        }
    });
}

function removeEmployee(req, res){
    let employeeId = req.params.id;
    let enterpirse = req.body;
    Employee.findById(employeeId, (err, employeeFound)=>{
        if(err){
            res.status(500).send(err);
        }else if(employeeFound){
            Employee.findByIdAndRemove(employeeId, (err, employeeDelete)=>{
                if(err){
                    res.status(500).send(err);
                }else if(employeeDelete){
                    Enterprise.findOneAndUpdate({name: enterpirse.enterprise}, {$unset:{employees:{_id:employeeId}}},{new: true}, (err, employeeDeleted)=>{
                        if(err){
                            res.status(500).send(err);
                        }else if(employeeDeleted){
                            res.send({message: 'El empleado eliminado fue:', employeeDeleted});
                        }else{
                            res.status(404).send({message: 'Este empleado ya fue eliminado'})
                        }
                    }).populate('employees');
                }else{
                    res.send({message: 'No se ha eliminado el empleado'})
                }
            });
        }else{
            res.status(404).send({message:'Este usuario ya fue eliminado'});
        }
    })
	
}


function searchEmployee(req, res){
    let params = req.body;

    Employee.find({$or:[{name: {$regex:'^' + params.name, $options: 'i'}},
                        {position: {$regex:'^' + params.position, $options: 'i'}}, 
                        {departament:{$regex:'^' + params.departament, $options: 'i'}}, 
                        {_id:{$regex:'^' + params.id, $options: 'i'}}]}, 
                        (err, employeesFound) =>{
                            if(err){
                                res.status(500).send(err);
                            }else if(employeesFound){
                                res.send(employeesFound);
                            }else{
                                res.status(404).send({message: 'No hay coincidencias con sus parametros'});
                            }
    });
}


module.exports = {
    saveEmployee,
    updateEmployee,
    removeEmployee,
    searchEmployee
}