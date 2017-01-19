angular.module('crud-pessoas').controller('PessoaController', function ($scope, $routeParams, Pessoa) {

    if($routeParams.id) {
        Pessoa.get({id: $routeParams.id},
            function (pessoa) {
                $scope.pessoa = pessoa;
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter pessoa.'
                };
                console.log(erro);
            });
    } else {
        $scope.pessoa = new Pessoa();
    }

    $scope.disableForm = true;

    $scope.editar = function () {
        $scope.disableForm = false;
    }

    $scope.salva = function () {
        $scope.pessoa.$save()
            .then(function () {
                $scope.mensagem = {texto: 'Salvo com sucesso'};
                $scope.pessoa = new Pessoa();
            })
            .catch(function (erro) {
                $scope.mensagem = {texto: 'Não foi possível salvar.'}
            });
    };

    Pessoa.query(function (pessoas) {
        $scope.pessoas = pessoas;
    });
});