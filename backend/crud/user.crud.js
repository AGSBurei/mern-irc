const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const sendMail = require('../sendMail');

module.exports = (app) => {
    app.post('/User', async(req, res) =>{       
        if(!req.body){
            res.status(400).send({
                message: "Please complete all fields"
            });
        }
        User.find({mail: req.body.mail}, async(err, data) =>{
            if(data.length == 0){
                bcrypt.hash(req.body.password, 10, async (err, p) => {
                    await User.create({name: req.body.name, mail: req.body.mail, password: p}).then( async(r) => {
                        sendMail(req.body.mail, r.id);
                        res.status(200).send({
                            message: "connect"
                        });
                    });
                });
            }else{
                res.status(400).send({
                    message: "The user is already existing"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.post('/User/login', async(req,res) =>{
        await User.find({email: req.body.email}).then(async(data) => {
            if(data.length != 0){
                data.forEach(async(p) => {
                    if(await bcrypt.compare(req.body.password, p.password)){
                        res.status(200).send({
                            message: "connect"
                        });
                    }else{
                        res.status(400).send({
                            message: "The mail or the password is wrong"
                        });
                    }
                });
            }else{
                res.status(400).send({
                    message: "The mail or the password is wrong1"
                });
            }
                        
        }).catch(err => {
            res.status(500).send({
                message: "Some error occurred"
            });
        });
    });

    app.get('/User/Active/:id', async(req, res) =>{
        if(!req.body) {
            res.status(400).send({
                message: "User content can not be empty"
            });
        }

        await User.findByIdAndUpdate(req.params.id, { isActive: true }).then(r => {
            if(!r) {
                res.status(404).send("Can't find the User");
            }
            res.status(200).send('<div><h1>Your account is active</h1><h2>Click <a href="http://localhost:3000/chat">here</a> to return to the site</h2></div><style>body{background-color: #777777;overflow: hidden;display: flex;align-items: center;justify-content: center;}div{margin-bottom: 200px;}</style>');
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                res.status(404).send("Can't find the User");                
            }
            res.status(500).send("Some error occurred");
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