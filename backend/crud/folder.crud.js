const folder = require('../model/folder.model.js');

module.exports = (app) => {
    app.post('/folder', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "folder content can not be empty"
            });
        }
        await folder.create(res.body);
    });

    app.get('/folder', async(req, res) =>{
        await folder.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/folder/:id', async(req, res) =>{
        await folder.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the folder"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the folder"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/folder/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "folder content can not be empty"
            });
        }

        await folder.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the folder"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the folder"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/folder/:id', async(req, res) =>{
        await folder.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the folder"
                });
            }
            res.status(200).send({
                message: "folder deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the folder"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}