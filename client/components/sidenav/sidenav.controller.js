'use strict';

angular.module('dashboardApp')
  .controller('SidenavCtrl', function ($scope, $location, $mdSidenav) {
    var self = this;

    $scope.menu = [
      {
        'title': 'EXERCISES', 'link': '/',
        'subs': [
          {'title': 'Exercise 1', 'link': '/test/exercise1'},
          {'title': 'Exercise 2', 'link': '/test/exercise2'},
          {'title': 'Exercise 3', 'link': '/test/exercise3'},
          {'title': 'Exercise 4', 'link': '/test/exercise4'},
          {'title': 'Exercise 5', 'link': '/test/exercise5'},
          {'title': 'Exercise 6', 'link': '/test/exercise6'},
          {'title': 'Exercise 7', 'link': '/test/exercise7'},
          {'title': 'Exercise 8', 'link': '/test/exercise8'},
        ]
      }
    ];

    self.toggleSideBar = function () {
      $mdSidenav('leftSideNav').toggle();
    }

  });
