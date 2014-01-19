console.log('Started')
var id = 0

function todoController($scope){
	console.log("In todoController")

	$scope.todos = []
	

	$scope.totalTodos = $scope.todos.length

	$scope.showForm = "hide"

	$scope.removeTask = function(id){
		$scope.todos = $scope.todos.filter(function(todo){
			return todo.id != id
		})
	}

	$scope.getTotalTodos = function(){
		return $scope.todos.length
	}

	$scope.isEmpty = function(){
		return $scope.todos.length == 0 ? "show" : "hide"
	}

	$scope.hasToDo = function(){

		return $scope.todos.length > 0 ? "show" : "hide"
	}

	$scope.displayForm = function(){
		$scope.showForm = "show"
	}

	$scope.addTask = function(){
		// console.log($scope.time)
		if($scope.task && $scope.time)
		{
			
			$scope.todos.push({task : $scope.task, time : $scope.time, done : false, id : id++ })
			$scope.showForm = "hide"
			$scope.task = ""
			$scope.time = ""
		}
	}
}
	
