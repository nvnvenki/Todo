from django.test.client import Client
import json
from django.test.testcases import TestCase
from models import Todo
# Create your tests here.
class TestTodo(TestCase):
    
    def setUp(self):
        self.client = Client()
    
    def test_get_todos_list(self):
        response = self.client.get("http://127.0.0.1:8000/todos")
        self.assertEqual(response.status_code, 200)
    
    def test_post_todos_list(self):
        response = self.client.post("http://127.0.0.1:8000/todos")
    
    
        