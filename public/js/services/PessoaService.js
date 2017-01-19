angular.module('crud-pessoas').factory('Pessoa', function ($resource) {
    return $resource('/pessoas/:id');
});