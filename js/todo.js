console.log('Started')
var id = 0

function todoController($scope, $http){
	
	console.log("In todoController")
	$scope.todos = []
	

	$scope.totalTodos = $scope.todos.length

	$scope.showForm = "hide"

	$scope.postTodos = function(task_name, time)
	{
		console.log(JSON.stringify({task_name : $scope.task_name, time: $scope.time }))
		$http({
		    method: 'POST',
		    url: 'http://127.0.0.1:8000/todos',
		    data:  JSON.stringify({task_name : $scope.task_name, time: $scope.time }),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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

		$http.get('http://127.0.0.1:8000/todos').
		success(function(response){
			$scope.todos = $scope.todos.concat(response['data'])
			console.log(response['data'])
		}).
		error(function(response){
			console.log(response)
		})

	}

	$scope.deleteTodo = function(task_name){
		
		$http({
		    method: 'DELETE',
		    url: 'http://127.0.0.1:8000/todos',
		    data:  JSON.stringify({"task_name": task_name}),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
	

	$scope.removeTask = function(task_name){
		$scope.deleteTodo(task_name)
		$scope.todos = []
		$scope.getTodos()

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
			$scope.postTodos($scope.task_name, $scope.time)
			$scope.showForm = "hide"
			$scope.task_name = ""
			$scope.time = ""
			

		}
	}

	$scope.getTodos()

}	
	