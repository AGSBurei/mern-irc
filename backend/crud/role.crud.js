const role = require('../model/role.model.js');

module.exports = (app) => {
    app.post('/role', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "role content can not be empty"
            });
        }
        await role.create(res.body);
    });

    app.get('/role', async(req, res) =>{
        await role.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/role/:id', async(req, res) =>{
        await role.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the role"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the role"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/role/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "role content can not be empty"
            });
        }

        await role.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the role"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the role"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/role/:id', async(req, res) =>{
        await role.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the role"
                });
            }
            res.status(200).send({
                message: "role deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the role"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}