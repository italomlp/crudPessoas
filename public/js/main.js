angular.module('crud-pessoas', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('meuInterceptor');

        $routeProvider
            .when('/pessoas', {
                templateUrl: 'partials/pessoas.html',
                controller: 'PessoasController'
            })
            .when('/pessoa/:id', {
                templateUrl: 'partials/pessoa.html',
                controller: 'PessoaController'
            })
            .when('/pessoa', {
                templateUrl: 'partials/pessoa.html',
                controller: 'PessoaController'
            })
            .when('/auth', {
                templateUrl: 'partials/auth.html'
            })

            .otherwise({redirectTo: '/pessoas'});
    });