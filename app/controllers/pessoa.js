var sanitize = require('mongo-sanitize');

module.exports = function (app) {
    var Pessoa = app.models.pessoa;

    var controller = {};

    controller.listaPessoas = function (req, res) {
        Pessoa.find().exec()
            .then(
                function (pessoas) {
                    res.json(pessoas);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    };

    controller.obtemPessoa = function (req, res) {
        var _id = req.params.id;
        Pessoa.findById(_id).exec()
            .then(
                function (pessoa) {
                    if (!pessoa) throw new Error('Pessoa não encontrada');
                    res.json(pessoa);
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };
    
    controller.removePessoa = function (req, res) {
        var _id = sanitize(req.params.id);
        Pessoa.remove({"_id" : _id}).exec()
            .then(
                function () {
                    res.status(204).end();
                },
                function (erro) {
                    return console.error(erro);
                }
            );
    };

    controller.salvaPessoa = function (req, res) {
        var _id = req.body._id;

        var dados = {
            "nome": req.body.nome,
            "sobrenome": req.body.sobrenome,
            "dataNasc": req.body.dataNasc,
            "sexo": req.body.sexo,
            "endereco": req.body.endereco,
            "telefone": req.body.telefone,
            "email": req.body.email
        }

        if (_id) {
            Pessoa.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function (pessoa) {
                        res.json(pessoa);
                    },
                    function (erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            Pessoa.create(dados)
                .then(
                    function (pessoa) {
                        res.status(201).json(pessoa);
                    },
                    function (erro) {
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                );
        }

    };

    return controller;
};
