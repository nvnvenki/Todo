 var loginTodo = angular.module('login',['ngRoute', 'ngCookies' ])

 loginTodo.controller ('loginController',function($scope, $http, $window, $location, $cookies){


 	$scope.showSignin = "show"
	$scope.showSignup = "hide"

	var queryString = $window.location.href.match(/^[^?]+\??([^#]*).*$/)[1]
	
	logout_status = queryString.split("=")
	
	if(logout_status[1] == "true")
	{
		delete $cookies.users
	}
	
	if($cookies.users)
	{
		$window.location.href = 'home/?user=' + $cookies.users		
	}
	

	$scope.showSigninSignUp = function(){
		$scope.showSignin = $scope.showSignin == "hide" ? "show" : "hide" 
		$scope.showSignup = $scope.showSignup == "hide" ? "show" : "hide" 
	}

	
	$scope.signIn =  function(){


		$http.get('/api/v0/user/' + $scope.username + '?format=json').
		success(function(response){
			if(response['password'] == $scope.password)
			{
				delete $cookies.users
				$cookies.users = $scope.username
				$window.location.href = 'home/?user=' + $scope.username
			}
			else
			{
				var toast  = new Toast("Invalid user credentials!!")
				toast.makeToast()
			}
			
		}).
		error(function(response){
			var toast  = new Toast("Invalid user credentials!!")
			toast.makeToast()
		})
	}

	$scope.signUp = function(){

		$http({
		    method: 'POST',
		    url: '/api/v0/user/',
		    data:  JSON.stringify({username : $scope.username_new , password:$scope.password_new})
		}).
		success(function(response){
			delete $cookies.users
			$cookies.users = $scope.username_new
			$window.location.href = 'home/?user=' + $scope.username_new
		}).
		error(function(response){
			console.log(response)
		})
	}

 })
