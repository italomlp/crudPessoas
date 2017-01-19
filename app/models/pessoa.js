var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        sobrenome: {
            type: String,
            required: true
        },
        dataNasc: {
            type: Date,
            required: true
        },
        sexo: {
            type: String
        },
        endereco: {
            type: String
        },
        telefone: {
            type: String
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        }
    });

    return mongoose.model('Pessoa', schema);
};