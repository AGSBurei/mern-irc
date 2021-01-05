const User = require('../model/user.model.js');

module.exports = (app) => {
    app.post('/User', async(req, res) =>{
        
    });

    app.get('/User', async(req, res) =>{
        await User.find().then(r => {
            res.status(200).send(r);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/User/:id', async(req, res) =>{
        await User.findById(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the User"
                });            
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the User"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.put('/User/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "User content can not be empty"
            });
        }

        await User.findByIdAndUpdate(req.params.id, req.body).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the User"
                });
            }
            res.status(200).send(r);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send({
                    message: "Can't find the User"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.delete('/User/:id', async(req, res) =>{
        await User.findByIdAndRemove(req.params.id).then(r => {
            if(!r) {
                res.status(404).send({
                    message: "Can't find the User"
                });
            }
            res.status(200).send({
                message: "User deleted successfully!"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404).send({
                    message: "Can't find the User"
                });                
            }
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });
}