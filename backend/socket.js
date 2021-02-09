const User = require('./model/user.model');
const Server = require('./model/server.model.js');

const socketIO = require('socket.io');
const bcrypt = require('bcrypt');
const sendMail = require('./sendMail');
const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const io = require('socket.io')(server, {
        path: '/',
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
    });

    io.on("connection", (socket) => {
        //join
        socket.on('join', (room, session) => {
            const messageList = new Array();
            Server.findById(room).then(async(server) =>{
                await server.message.forEach(async(m) => {
                    const u = await User.findById(m._id);
                    messageList.push({msg: m.msg, username: u.name});
                    io.emit(session, "messageList", messageList);
                });
            })
        });

        //message
        socket.on("message", async(_idServer, message, user) => {
            if(message != null || message != ""){
                await Server.findByIdAndUpdate(_idServer, { $push: {message:{_id: user, msg: message}}}).then(async(r) => {
                    const messageList = new Array();
                    Server.findById(_idServer).then(async(s) =>{
                        await s.message.forEach(async(m) => {
                            const u = await User.findById(m._id);
                            messageList.push({msg: m.msg, username: u.name});
                            io.emit("newMessage", messageList);
                        });
                    });
                });
            }
        });


        //signup
        socket.on('signup', async (name, email, password, passwordConfirm, session) => {
            if (name == null || name == "" && email == null || email == "" && password == null || password == "" && passwordConfirm == null || passwordConfirm == "") {
                io.emit(session, "error", "Please complete all fields");
                return;
            }

            if (password != passwordConfirm) {
                io.emit(session, "error", "the two passwords are not the same");
                return;
            }

            User.find({ mail: email }, (err, data) => {
                if (data.length == 0) {
                    bcrypt.hash(password, 10, (err, p) => {
                        User.create({ name: name, mail: email, password: p }).then(r => {
                            sendMail(email, r.id);
                            io.emit(session, "success", "The account is created, an account activation email has been sent");
                            return;
                        })
                    });
                } else {
                    io.emit(session, "error", "The user is already existing");
                    return;
                }
            });
        });

        //login
        socket.on('login', async (UserEmail, UserPassword, session) => {
            await User.find({mail: UserEmail}).then(async(data) => {
                if(data.length != 0){
                    data.forEach(async(res) => {
                        if(await bcrypt.compare(UserPassword, res.password)){
                            io.emit(session, "token", jwt.sign({ data: res._id, iat: Math.floor(18000)}, 'Yx5uXMg3D5fakA86uVjT'));
                            return;
                        }else{
                            io.emit(session, "error", "The mail or the password is wrong");
                            return;
                        }
                    });
                }else{
                    io.emit(session, "error", "The mail or the password is wrong");
                    return;
                }
            });
        });

        //active
        socket.on('active', async (id, session) => {
            if(id.id == null || id.id == "") {
                io.emit(session, "error", "Id content can not be empty");
                return;
            }

            await User.findByIdAndUpdate(id.id, { isActive: true }).then(() => {
                io.emit(session, "success", "The account is active");
                return;
            }).catch(err => {
                io.emit(session, "error", "Some error occurred");
                return;
            });
        });

        //token
        socket.on('token', async (token, session) => {
            if(token == null || token == "") {
                io.emit(session, "error", "Id content can not be empty");
                return;
            }

            jwt.verify(token, 'Yx5uXMg3D5fakA86uVjT', async(err, decoded) => {
                await User.findById(decoded.data).then(u => {
                    if(u.length != 0){
                        io.emit(session, "login", u);
                        return;
                    }else{
                        io.emit(session, "error", "removeToken");
                        return
                    }
                }).catch(err => {
                    io.emit(session, "error", "removeToken");
                    return;
                });
            });
        });

        //create server
        socket.on('server', async (_idUser, titre, session) => {
            if (_idUser == null || _idUser == "" && server == null || server == "") {
                io.emit(session, "error", "Server content can not be empty");
                return;
            }else{
                const user = await User.findById(_idUser);

                const newServer = new Server({
                    "name": titre,
                    "owner": user,
                    "message": []
                });

                newServer.collectionOfUser.push(user);
                await newServer.save();

                user.listOfServer.push(newServer);
                await user.save();

                io.emit("refreshedServer", true);
                return;
            }
        });

        //server list of user
        socket.on('serverList', async(_idUser, session) => {
            if (_idUser == null || _idUser == "") {
                io.emit(session, "error", "Id content can not be empty");
                return;
            }else{
                const user = await User.findById(_idUser);
                const serverList = new Array();

                user.listOfServer.forEach(async(server) => {
                    const serverName = await Server.findById(server._id);
                    serverList.push({_idServer: server._id, name: serverName.name}); 
                    io.emit(session, "serverList", serverList);
                });               
                return;
            }
        });

        //server user list
        socket.on('serverUser', async(_idServer, session) => {
            if (_idServer == null || _idServer == "") {
                io.emit(session, "error", "Id content can not be empty");
                return;
            }else{
                const server = await Server.findById(_idServer);
                const serverUser = new Array();

                server.collectionOfUser.forEach(async(e) => {
                    const user = await User.findById(e._id);
                    serverUser.push({name: user.name})
                    io.emit(session, "serverUser", serverUser);
                });
                return;
            }
        });
    })
};