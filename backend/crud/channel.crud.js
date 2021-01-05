const channel = require('../model/channel.model.js');

module.exports = (app) => {
    app.post('/channel', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "channel content can not be empty"
            });
        }
        await channel.create(res.body);
    });

    app.get('/channel', async(req, res) =>{
        await channel.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/channel/:id', async(req, res) =>{
        await channel.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the channel"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the channel"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/channel/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "channel content can not be empty"
            });
        }

        await channel.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the channel"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the channel"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/channel/:id', async(req, res) =>{
        await channel.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the channel"
                });
            }
            res.status(200).send({
                message: "channel deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the channel"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}