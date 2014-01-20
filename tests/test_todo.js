

describe('todoController',function(){

		it("test cases ", function(){
			console.log("Test started")

			var scope = {}
			var ctrl = new todoController(scope)

			expect(scope.todos.length).toEqual(0)
			expect(scope.getTotalTodos()).toEqual(0)

			scope.todos.push({task : "task", time : "time", done : false, id : 1 })
			scope.todos.push({task : "task", time : "time", done : false, id : 2 })
			scope.todos.push({task : "task", time : "time", done : false, id : 3 })
			expect(scope.getTotalTodos()).toEqual(3)

			scope.removeTask(1)
			expect(scope.getTotalTodos()).toEqual(2)

			expect(scope.showNoTaskHeader()).toEqual("hide")
			expect(scope.showTaskHeader()).toEqual("show")

		})
})
