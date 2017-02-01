angular.module('myApp', [
'ngRoute', 'firebase', 'ngGeolocation', 'ngMap'
])
    .config(function ($routeProvider, $httpProvider) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBluvox6OLp-Q16Sxy7hnIDBZJmu4XjcDg",
            authDomain: "test-b41d8.firebaseapp.com",
            databaseURL: "https://test-b41d8.firebaseio.com",
            storageBucket: "test-b41d8.appspot.com",
            messagingSenderId: "201973087892"
        };
        firebase.initializeApp(config);
    })
    .factory('Auth', function($firebaseAuth){
        var auth = $firebaseAuth();

        return auth;
    })
    .controller('controllerOne', function($scope, Auth, $window, $geolocation, NgMap, $firebaseArray){

        var database = firebase.database();
        var userRef = database.ref('users');
        $scope.positions = [];

        //get the coordinates data from the database to populate the map
        userRef.on("child_added", function(snapshot, prevChildKey) {
            var position = snapshot.val();
            $scope.positions.push({latitude: position.coordinates.latitude, longitude: position.coordinates.longitude});
            console.log($scope.positions);
            console.log(prevChildKey);
        });
        userRef.on("child_changed", function(snapshot) {
            console.log(snapshot.val());
        });
        $scope.register = function (){
            Auth.$createUserWithEmailAndPassword($scope.username, $scope.password).then(function (user){
                console.log('success', user);
            }, function (error){
                authCtrl.error = error;
            });
        };
        $scope.signIn = function () {
            Auth.$signInWithEmailAndPassword($scope.existingUser, $scope.existingUserPassword).then(function (user){
                console.log('success', user);
                $scope.user = {
                    userId : user.uid
                }
            }, function (error){
                authCtrl.error = error;
                console.log(error);
            })

        }

        $scope.coordinates = {};


        $scope.writeUserData = function (userId, coordinates){
            coordinates = $scope.coordinates;
            console.log(coordinates);
            userId = $scope.user.userId;
            firebase.database().ref('users/' + userId).set({
                coordinates : coordinates
            });
        }

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter().lat());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        //when the device position changes, update the database;
        $geolocation.watchPosition(function(position) {
            $scope.coordinates.latitude = position.latitude;
            $scope.coordinates.longitude = position.longitude;

            $scope.writeUserData(userId, $scope.coordinates);
        });

        //all users positions need to come from the db
        //get data from the database

     //   AIzaSyB1hCEtRUrS6jPYMMHeSBoyaZDiTDyouyw
            //$scope.signInWithGoogle = function () {
        //    var provider = new firebase.auth.GoogleAuthProvider();
        //    firebase.auth().signInWithPopup(provider).then(function(result) {
        //        // This gives you a Google Access Token. You can use it to access the Google API.
        //        var token = result.credential.accessToken;
        //        // The signed-in user info.
        //        var user = result.user;
        //        console.log("success!!");
        //        // ...
        //    }).catch(function(error) {
        //        // Handle Errors here.
        //        var errorCode = error.code;
        //        var errorMessage = error.message;
        //        // The email of the user's account used.
        //        var email = error.email;
        //        // The firebase.auth.AuthCredential type that was used.
        //        var credential = error.credential;
        //        // ...
        //    });
        //}
    });
