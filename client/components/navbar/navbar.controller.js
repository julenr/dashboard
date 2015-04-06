'use strict';

angular.module('dashboardApp')
  .controller('NavbarCtrl', function ($scope, $location, $mdSidenav) {
    var self = this;

    self.toggleSideBar = function () {
      $mdSidenav('leftSideNav').toggle();
    }

  });
