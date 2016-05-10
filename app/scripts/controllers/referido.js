'use strict';

/**
 * @ngdoc function
 * @name rApp.controller:ReferidoCtrl
 * @description
 * # ReferidoCtrl
 * Controller of the rApp
 */
angular.module('rApp')
    .controller('ReferidoCtrl', function($window, $scope, $routeParams, ezfb,$http) {
        $scope.idReferido = $routeParams.idReferido;

        var BASE_URL='http://galf.com/Cingle/public';
        $scope.enregister=true;
        obtener_info($scope.idReferido);

        updateLoginStatus(updateApiMe);

        $scope.login = function() {
            /**
             * Calling FB.login with required permissions specified
             * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
             */
            ezfb.login(function(res) {
                /**
                 * no manual $scope.$apply, I got that handled
                 */
                if (res.authResponse) {
                    console.log(213);
                    updateLoginStatus(updateApiMe);
                }
            }, { scope: '' /*'email,user_likes,last_name'*/ });
        };

        $scope.logout = function() {
            /**
             * Calling FB.logout
             * https://developers.facebook.com/docs/reference/javascript/FB.logout
             */
            ezfb.logout(function() {
                updateLoginStatus(updateApiMe);
            });
        };

        $scope.share = function() {
            ezfb.ui({
                    method: 'feed',
                    name: 'angular-easyfb API demo',
                    picture: 'http://plnkr.co/img/plunker.png',
                    link: 'http://plnkr.co/edit/qclqht?p=preview',
                    description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
                        ' Facebook integration in AngularJS made easy!' +
                        ' Please try it and feel free to give feedbacks.'
                },
                function(res) {
                    // res: FB.ui response
                }
            );
        };

        /**
         * For generating better looking JSON results
         */
        var autoToJSON = ['loginStatus', 'apiMe'];
        angular.forEach(autoToJSON, function(varName) {
            $scope.$watch(varName, function(val) {
                $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
            }, true);
        });

        /**
         * Update loginStatus result
         */
        function updateLoginStatus(more) {
            ezfb.getLoginStatus(function(res) {
                $scope.loginStatus = res;

                (more || angular.noop)();
            });
        }

        /**
         * Update api('/me') result
         */
        function updateApiMe() {
            ezfb.api('/me', { fields: 'name,last_name,email,gender,picture,first_name' }, function(res) {
                $scope.apiMe = res;
                if ($scope.apiMe["name"] === undefined) {
                    $scope.logout();
                }/* else {
                    $scope.registro();
                }*/
                console.log($scope.apiMe);
            });
        }
        $scope.playstore= function(){
          window.location = "http://bit.ly/CingleRef"
        }
        $scope.appstore= function(){
          window.location = "http://bit.ly/CingleRef"
        }
        $scope.registro = function() {
            // body...
            console.log("Registrarrrr");
            $scope.registro = new FormData();
            $scope.registro.append('idfacebook', $scope.apiMe.id);
            $scope.fotofinalfb='https://graph.facebook.com/'+$scope.apiMe.id+'/picture?type=large';
            $scope.registro.append('fbDeviceToken', Math.random()); //TODO retornar numero
            $scope.registro.append('latitude', 0);
            $scope.registro.append('longitude', 0);
            $scope.registro.append('referido',$scope.idReferido);
            $scope.registro.append('email', $scope.apiMe.email);
            $scope.registro.append('nombre', $scope.apiMe.name);
            $scope.registro.append('apellido', $scope.apiMe.last_name);
            $scope.registro.append('sexo', $scope.apiMe.gender[0].toUpperCase());
            
            var req_registro = {
                method: 'POST',
                url: BASE_URL + '/user',
                headers: {
                    'Content-Type': undefined
                },
                data: $scope.registro
            };
            $http(req_registro).then(
                function(response) {
                },
                function(response) {});

            $http(req_registro).then(
                function(response) {
                    console.log(response);
                    $scope.enregister=false;
                },
                function(response) {});
        }

        function obtener_info(id_usuario) {
          $http({
                    method: 'GET',
                    url: BASE_URL + '/username/'+id_usuario
                }).then(function successCallback(response) {
                    $scope.respuesta=response.data;
                    if($scope.respuesta.message=="Found"){
                      $scope.nombre_fb = $scope.respuesta[0].nombre;
                      $scope.nombre_foto = $scope.respuesta[0].fotos[0].foto;
                    }else{
                      window.location = "http://www.cingleapp.com/"
                      console.log($scope.respuesta);
                    }
                }, function errorCallback(response) {
                    console.error(response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            
        }

    });