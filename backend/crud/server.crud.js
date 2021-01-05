const server = require('../model/server.model.js');

module.exports = (app) => {
    app.post('/server', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "server content can not be empty"
            });
        }
        await server.create(res.body);
    });

    app.get('/server', async(req, res) =>{
        await server.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/server/:id', async(req, res) =>{
        await server.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the server"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the server"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/server/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "server content can not be empty"
            });
        }

        await server.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the server"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the server"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/server/:id', async(req, res) =>{
        await server.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the server"
                });
            }
            res.status(200).send({
                message: "server deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the server"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}