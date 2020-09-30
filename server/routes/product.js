const express = require('express');
const productModel = require('../models/product');
var ResponseUtil = require('../utils/responseUtil');
const app = express();

app.get('/list', async(req, res) => {
    var response = ResponseUtil.prepareResponse();
    try {
        const products = await productModel.find({});
        response.success = true;
        response.message = "Se obtuvieron los productos";
        response.data = products;
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
        const product = await productModel.findById(req.params.id);
        if (!product) {
            response.success = false;
            response.message = "No se encontro el producto";
            res.json(response);
        }
        response.success = true;
        response.message = "Se encontro el producto";
        response.data = product;
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
        const product = new productModel(req.body);
        await product.save();
        response.success = true;
        response.message = "Se creo el producto";
        response.data = product;
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
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            response.success = false;
            response.message = "No se encontro el producto";
            res.json(response);
        }
        response.success = true;
        response.message = "Se elimino el producto";
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
        await productModel.findByIdAndUpdate(req.params.id, req.body);
        response.success = true;
        response.message = "Se actualizo el producto";
        response.data = req.body;
        res.json(response);
    } catch (err) {
        response.message = err;
        response.success = false;
        res.json(response);
    }
})

module.exports = app