from django.db import models
# Create your models here.


    
class User(models.Model):
    username = models.CharField(max_length=100,primary_key=True)
    password = models.CharField(max_length=10)
    
class Todo(models.Model):
    task_name = models.CharField(max_length=100)
    time = models.CharField(max_length=20)
    priority = models.CharField(max_length=10)
    user = models.ForeignKey(User, to_field="username")
    