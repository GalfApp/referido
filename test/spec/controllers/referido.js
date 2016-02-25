'use strict';

describe('Controller: ReferidoCtrl', function () {

  // load the controller's module
  beforeEach(module('rApp'));

  var ReferidoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReferidoCtrl = $controller('ReferidoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReferidoCtrl.awesomeThings.length).toBe(3);
  });
});
