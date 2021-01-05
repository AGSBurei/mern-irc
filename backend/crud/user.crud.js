const user = require('../model/user.model.js');

module.exports = (app) => {
    app.post('/user', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "user content can not be empty"
            });
        }
        await user.create(res.body);
    });

    app.get('/user', async(req, res) =>{
        await user.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/user/:id', async(req, res) =>{
        await user.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the user"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the user"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/user/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "user content can not be empty"
            });
        }

        await user.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the user"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the user"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/user/:id', async(req, res) =>{
        await user.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the user"
                });
            }
            res.status(200).send({
                message: "user deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the user"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}