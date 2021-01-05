module.exports = (app) => {
    require('./crud/channel.crud.js')(app);
    require('./crud/folder.crud.js')(app);
    require('./crud/role.crud.js')(app);
    require('./crud/server.crud.js')(app);
    require('./crud/user.crud.js')(app);
};