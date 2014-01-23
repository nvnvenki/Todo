from django.test.client import Client
import json
from django.test.testcases import TestCase

# Create your tests here.
class TestTodo(TestCase):
    
    def setUp(self):
        self.client = Client()
    
    def test_get_todos_list(self):
        response = self.client.get("http://127.0.0.1:8000/todos")
        self.assertEqual(response.status_code, 200)
    
    def test_post_todos_list(self):
        response_post = self.client.post("http://127.0.0.1:8000/todos", json.dumps({'task_name':'task', 'time':'1:00'}),"text/json")
        response_get = self.client.get("http://127.0.0.1:8000/todos")
        print response_get
        self.assertEqual(response_get.status_code, 200)
    
    def test_delete_todo(self):
        response_post1 = self.client.post("http://127.0.0.1:8000/todos", json.dumps({'task_name':'task1', 'time':'1:00'}),"text/json")
#        response_delete = self.client.delete("http://127.0.0.1:8000/todos", json.dumps({'task_name':'task'}),"text/json")
        response_delete = self.client.delete("http://127.0.0.1:8000/todos", json.dumps({'task_name':'task1'}),"text/json")
        print response_delete
    