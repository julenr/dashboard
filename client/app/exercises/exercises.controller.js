'use strict';

angular.module('dashboardApp')
  .factory("transactionsQuery", function ($http) {
    // interface
    var service = {
      data: [],
      getData: getData,
      exercise2: exercise2,
      exercise3: exercise3,
      exercise4y5: exercise4y5,
      exercise6: exercise6,
      exercise7: exercise7,
      exercise8: exercise8
    };
    return service;

    // implementation
    function getData() {
      return $http.get("/api/things")
        .success(function(data) {
          service.data = data;
        });
    }

    function exercise2(field) {
      return _.countBy(service.data, field);
    }

    function exercise3(amount) {
      return _.filter(service.data, function (item) {
        return currencyToNumber(item.amount) > amount;
      });
    }

    function exercise4y5(type, amount) {
      var result;

      result = _.filter(service.data, function (item) {
        return item.type === type && currencyToNumber(item.amount) > amount;
      });
      result = _.pluck(result, "business");
      result = _.uniq(result);

      return result;
    }

    function exercise6(year) {
      var result;

      result = _.where(service.data, {year: year});
      result = _.groupBy(result, 'business');
      result = _.map(result, function (g, key) {
        var value;
        value = _.reduce(g, function (m, x) {
          var value = currencyToNumber(x.amount);
          // Here I have a doubt if in case the type is 'deposit' should ADD and the others types subtract
          return (x.type === "deposit") ? m + value : m + value ;
        }, 0);
        return { businessName: key, balance: "$" + value.toFixed(2) };
      });
      return result;
    }

    function exercise7(year) {
      var result;

      result = exercise6(year);
      result = _.sortBy(result, function(company) {
        return -currencyToNumber(company.balance);
      });
      return result;
    }

    function exercise8(year) {
      var result;

      result = _.where(service.data, {year: year});
      result = _.groupBy(result, 'type');
      result = _.map(result, function (g, key) {
        return { type: key,
          amount: _.max(g, function (x) {
            return currencyToNumber(x.amount);
          }).amount
        };
      });
      return result;
    }

    function currencyToNumber(currency) {
      return Number( currency.replace(/[^0-9\.]+/g,""));
    }

  })
  .controller('exerciseCtrl', function ($scope, $routeParams, transactionsQuery) {
    $scope.gridOptions = {};
    $scope.companies = [];
      $scope.gridOptions.columnDefs = [
      {name:'business'},
      {name:'name'},
      {name:'year'},
      {name:'account'},
      {name:'date'},
      {name:'type'},
      {name:'amount', showColumnFooter: true}
    ];

    switch($routeParams.exercise){
      case "exercise1":
          $scope.gridOptions.data = transactionsQuery.data;
          break;
      case "exercise2":
          $scope.companies = transactionsQuery.exercise2('year');
          break;
      case "exercise3":
          $scope.gridOptions.data = transactionsQuery.exercise3(5000);
          break;
      case "exercise4":
          $scope.companies = transactionsQuery.exercise4y5('deposit', 5000);
          break;
      case "exercise5":
          $scope.companies = transactionsQuery.exercise4y5('withdrawal', 1000);
          break;
      case "exercise6":
          $scope.companies = transactionsQuery.exercise6('2012');
          break;
      case "exercise7":
          $scope.companies = transactionsQuery.exercise7('2014');
          break;
      case "exercise8":
          $scope.companies = transactionsQuery.exercise8('2014');
          break;
    }



  });
