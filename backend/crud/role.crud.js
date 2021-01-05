const Role = require('../model/role.model.js');

module.exports = (app) => {
    app.post('/Role', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Role content can not be empty"
            });
        }
        await Role.create(rep.body);
    });

    app.get('/Role', async(req, res) =>{
        await Role.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/Role/:id', async(req, res) =>{
        await Role.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Role"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Role"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/Role/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Role content can not be empty"
            });
        }

        await Role.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Role"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Role"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/Role/:id', async(req, res) =>{
        await Role.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Role"
                });
            }
            res.status(200).send({
                message: "Role deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the Role"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}