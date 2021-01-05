const Server = require('../model/server.model.js');

module.exports = (app) => {
    app.post('/Server', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Server content can not be empty"
            });
        }
        await Server.create(rep.body);
    });

    app.get('/Server', async(req, res) =>{
        await Server.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/Server/:id', async(req, res) =>{
        await Server.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Server"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Server"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/Server/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Server content can not be empty"
            });
        }

        await Server.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Server"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Server"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/Server/:id', async(req, res) =>{
        await Server.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Server"
                });
            }
            res.status(200).send({
                message: "Server deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the Server"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}