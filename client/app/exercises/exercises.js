'use strict';

angular.module('dashboardApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test/:exercise',
        {
          templateUrl: function(params){ return 'app/exercises/' + params.exercise + '.html'},
          controller: 'exerciseCtrl',
          resolve: {
            transactions: function(transactionsQuery) {
              return transactionsQuery.getData();
            }
          }
        });

  });
