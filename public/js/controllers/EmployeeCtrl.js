angular.module('EmployeeCtrl', []).controller('EmployeeController', function ($scope, $http) {

  // DOB TO AGE CONVERSION
  calcAge = function (dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
  }


  var updateView = function () {
    $http.get('/employee').success(function (response) {
      $scope.employees = response;
      $scope.employee = "";
    });
  };

  updateView();

  $scope.addEmployee = function () {
    $scope.employee.age = calcAge($scope.employee.dob);
    $http.post('/employee', $scope.employee).success(function (response) {
      updateView();
    });
  };

  $scope.removeEmployee = function (id) {
    $http.delete('/employee/' + id).success(function (response) {
      updateView();
    });
  };

  $scope.editEmployee = function (id) {
    // console.log(id);
    $http.get('/employee/' + id).success(function (response) {
     // console.log(response);
      $scope.employee = response;
    });
  };

  $scope.updateEmployee = function () {
    console.log($scope.employee._id);
    $http.put('/employee/' + $scope.employee._id, $scope.employee).success(function (response) {
      updateView();
    });
  };


});