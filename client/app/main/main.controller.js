'use strict';

angular.module('dashboardApp')
  .controller('MainCtrl', function ($scope, transactionsQuery) {
    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [
      {name:'business'},
      {name:'name'},
      {name:'year'},
      {name:'account'},
      {name:'date'},
      {name:'type'},
      {name:'amount', showColumnFooter: true}
    ];
    transactionsQuery.getData()
      .success(function(data){
        $scope.gridOptions.data = data;
      })
      .error(function(data){
        console.log('data retrieval failed.');
      });

  });
