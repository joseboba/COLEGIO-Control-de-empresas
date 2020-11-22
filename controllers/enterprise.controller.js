'use strict';

var Enterprise = require('../models/enterpirse.model');
var Employee = require('../models/enterpirse.model');
function saveEnterprise(req, res){
    var enterprise = new Enterprise();
    var params = req.body;

    if(params.CEO && params.name && params.email && params.phones && params.direction && params.socialApproach){
       Enterprise.findOne({name: params.name}, (err, enterpriseFound) =>{
            if(err){
                res.status(500).send(err);
            }else if(enterpriseFound){
                res.send({message: 'Esta empresa ya fue creada, no puedes registrar dos veces la misma empresa'});
            }else{
                enterprise.name = params.name;
                enterprise.email = params.email;
                enterprise.socialMedia = params.socialMedia;
                enterprise.phones = params.phones;
                enterprise.direction = params.direction;
                enterprise.CEO = params.CEO;
                enterprise.socialApproach = params.socialApproach;
                enterprise.employees = params.employees;
                enterprise.save((err, enterpriseSaved) =>{
                    if(err){
                        res.status(500).send(err);
                    }else if(enterpriseSaved){
                        res.send(enterpriseSaved);
                    }else{
                        res.status(418).send({message: 'No se guardó la empresa'});
                    }
                });
            }
       });
    }else{
        res.send({message: 'Ingrese los campos necesarios'});
    }
}

function updateEnterprise(req, res){
    let enterpriseId = req.params.id;
    let update = req.body;

    Enterprise.findByIdAndUpdate(enterpriseId, update, {new: true}, (err, enterpirseUpdated)=>{
        if(err){
            res.status(500).send(err);
        }else if(enterpirseUpdated){
            res.send({message: 'Los cambios han sido efectuados con exito', enterpirseUpdated});
        }else{
            res.status(404).send({message: 'Ingrese un ID existente'});
        }
    });
}

function removeEnterprise(req, res){
    let enterpriseId = req.params.id;
    
    Enterprise.findOne({_id: enterpriseId}, (err, enterpirseRes) =>{
        if(err){
            res.send(err);
        }else if(enterpirseRes){
            Enterprise.findByIdAndRemove(enterpriseId, (err, deleted) =>{
                if(err){
                    res.status(500).send(err);
                }else if(deleted){
                    res.send({message: 'Se ha eliminado con exito la siguiente empresa:', deleted})
                }else{
                    res.status(418).send({message: 'No se ha eliminado la empresa'});
                }
            });
        }else{
            res.status(404).send({message: 'Ya se ha eliminado ese registro'});
        }
    });
    
}

function count(req, res){
    let enterpriseId = req.params.id;
    let enterprise = new Enterprise();
   Enterprise.findById(enterpriseId, (err, found)=>{
        if(err){
            res.status(500).send(err);
        }else if(found){
            res.send({message:'La empresa contiene la siguiente cantidad de empleados activos: '+found.employees.length});
        }else{
            res.status(404).send({message: 'No existe la empresa'})
        }
   });
}
module.exports = {
    saveEnterprise,
    updateEnterprise, 
    removeEnterprise,
    count
}