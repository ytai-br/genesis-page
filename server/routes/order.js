const express = require('express');
const orderModel = require('../models/order');
var ResponseUtil = require('../utils/responseUtil');
const app = express();

app.get('/list/:id', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const orders = await orderModel.find({ userId: req.params.id });
        response.success = true;
        response.message = "Se obtuvieron los pedidos";
        response.data = orders;
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
        const order = await orderModel.findById(req.params.id);
        if (!order) {
            response.success = false;
            response.message = "No se encontro la orden";
            res.json(response);
        }
        response.success = true;
        response.message = "Se encontro la orden";
        response.data = order;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
});

app.post('/save', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const order = new orderModel(req.body);
        await order.save();
        response.success = true;
        response.message = "Se creo la orden";
        response.data = order;
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
        const order = await orderModel.findByIdAndDelete(req.params.id);
        if (!order) {
            response.success = false;
            response.message = "No se encontro la orden";
            res.json(response);
        }
        response.success = true;
        response.message = "Se elimino la orden";
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
})

app.patch('/update/:id', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        await orderModel.findByIdAndUpdate(req.params.id, req.body);
        response.success = true;
        response.message = "Se actualizo la orden";
        response.data = req.body;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
})

module.exports = app