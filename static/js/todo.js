console.log('Started')

var todoApp = angular.module('todo',['ngRoute', 'ngCookies'])

todoApp.controller('todoController',function($scope, $http, $window, $cookies){
	console.log("In todoController")

	if(!$cookies.users)
	{
		$window.location.href = '/'
	}


	var queryString = $window.location.href.match(/^[^?]+\??([^#]*).*$/)[1]
	
	if(queryString)
	{
		$scope.user = queryString.split("=")[1]
	}
	else
	{
		$window.location.href = '/'
	}
		
	$scope.todos = []
	

	$scope.totalTodos = $scope.todos.length

	$scope.showForm = "hide"

	$scope.deleteCookie = function(){
		delete $cookies.users
		$window.location.href = '/?logout=true'
	}
	 

	$scope.postTodos = function(task_name, time, priority)
	{

		// console.log(JSON.stringify({task_name : $scope.task_name, time: $scope.time, priority: $scope.priority}))
		$http({
		    method: 'POST',
		    url: '/api/v0/todos/',
		    data:  JSON.stringify({task_name : $scope.task_name, time: $scope.time,priority : priority, user : "/api/v0/user/" + $scope.user + "/" })
		    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).
		success(function(response){
			console.log(response)
			$scope.todos = []
			$scope.getTodos()
		}).
		error(function(response){
			console.log(response)
		})
	}
	
	$scope.getTodos = function(){

		$http.get('/api/v0/todos/?format=json&user=' + $scope.user).
		success(function(response){
			$scope.todos = $scope.todos.concat(response['objects'])
		}).
		error(function(response){
			console.log(response)
			
		})

	}

	$scope.deleteTodo = function(id){
		$http({
		    method: 'DELETE',
		    url: '/api/v0/todos/' + id + "/",
		    headers : {'Content-Type' : "application/json"}
		}).
		success(function(response){
			$scope.todos = []
			$scope.getTodos()
			console.log(response)
		}).
		error(function(response){
			console.log(response)
		})
	}
	

	$scope.removeTask = function(task_id){
		$scope.deleteTodo(task_id)
	}

	$scope.getTotalTodos = function(){
		return $scope.todos.length
	}

	$scope.showNoTaskHeader = function(){
		return $scope.todos.length == 0 ? "show" : "hide"
	}

	$scope.showTaskHeader = function(){

		return $scope.todos.length > 0 ? "show" : "hide"
	}

	$scope.displayForm = function(){
		$scope.showForm = "show"
	}

	$scope.hideForm = function(){
		$scope.showForm = "hide"
	}

	$scope.addTask = function(){
		// console.log("here")
		if($scope.task_name && $scope.time)
		{
			$scope.postTodos($scope.task_name, $scope.time, $scope.priority)
			$scope.showForm = "hide"
			$scope.task_name = ""
			$scope.time = ""
			$scope.priority = ""

		}
	}

	$scope.getTodos()

}) 
