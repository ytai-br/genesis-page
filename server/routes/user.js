const express = require('express');
const userModel = require('../models/user');
var ResponseUtil = require('../utils/responseUtil');
const app = express();

app.get('/list', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const users = await userModel.find({});
        response.success = true;
        response.message = "Se obutvieron los usuarios";
        response.data = users;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.get('/get/:id', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            response.success = false;
            response.message = "No se encontro el usuario";
            res.json(response);
        }
        response.success = true;
        response.message = "Se encontro el usuario";
        response.data = user;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.post('/save-employe', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const userAux = await userModel.find({ email: res.body.email }).exec();
        if (userAux) {
            response.success = false;
            response.message = "Ya existe un usuario con ese email";
            res.json(response);
        }
        req.body.role = "EMPLOYE";
        const user = new userModel(req.body);
        await user.save();
        response.success = true;
        response.message = "Se registro el usuario";
        response.data = user;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.post('/sign-in', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const userAux = await userModel.find({ email: res.body.email }).exec();
        if (userAux) {
            response.success = false;
            response.message = "Ya existe un usuario con ese email";
            res.json(response);
        }
        const user = new userModel(req.body);
        await user.save();
        response.success = true;
        response.message = "Se registro el usuario";
        response.data = user;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.post('/login', async(req, res) => {
    var response = ResponseUtils.prepareResponse();
    try {
        var user = await userModel.find({ email: res.body.email }).exec();
        if (userAux && user.password == req.body.password) {
            user.status = true;
            await userModel.findByIdAndUpdate(req.params.id, user);
            response.success = true;
            response.message = "Ingreso correctamente";
            response.data = user;
            res.json(response);
        }
        response.success = false;
        response.message = "La contrasenha o el usuario son incorrectas";
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.post('/logout', async(req, res) => {
    var response = ResponseUtils.prepareResponse();
    try {
        var user = await userModel.find({ email: res.body.email }).exec();
        if (userAux) {
            user.status = false;
            await userModel.findByIdAndUpdate(req.params.id, user);
            response.success = true;
            response.message = "Salio correctamente";
            response.data = user;
            res.json(response);
        }
        response.success = false;
        response.message = "Tuvimos un problema al cerrar su cuenta";
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.delete('/delete/:id', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            response.success = false;
            response.message = "No se encontro el usuario";
            res.json(response);
        }
        response.success = true;
        response.message = "Se elimino el usuario";
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
})

app.patch('/update/:id', async(req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.params.id, req.body);
        response.success = true;
        response.message = "Se actualizo el usuario";
        response.data = req.body;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
})

module.exports = app