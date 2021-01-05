const Channel = require('../model/channel.model.js');

module.exports = (app) => {
    app.post('/Channel', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Channel content can not be empty"
            });
        }
        await Channel.create(rep.body);
    });

    app.get('/Channel', async(req, res) =>{
        await Channel.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/Channel/:id', async(req, res) =>{
        await Channel.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Channel"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Channel"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/Channel/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Channel content can not be empty"
            });
        }

        await Channel.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Channel"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Channel"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/Channel/:id', async(req, res) =>{
        await Channel.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Channel"
                });
            }
            res.status(200).send({
                message: "Channel deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the Channel"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}