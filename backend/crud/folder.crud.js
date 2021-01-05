const Folder = require('../model/folder.model.js');

module.exports = (app) => {
    app.post('/Folder', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Folder content can not be empty"
            });
        }
        await Folder.create(rep.body);
    });

    app.get('/Folder', async(req, res) =>{
        await Folder.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/Folder/:id', async(req, res) =>{
        await Folder.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Folder"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Folder"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/Folder/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "Folder content can not be empty"
            });
        }

        await Folder.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Folder"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the Folder"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/Folder/:id', async(req, res) =>{
        await Folder.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the Folder"
                });
            }
            res.status(200).send({
                message: "Folder deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the Folder"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}