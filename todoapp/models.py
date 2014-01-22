from django.db import models

# Create your models here.

class Todo(models.Model):
    task_name = models.CharField(max_length=100)
    time = models.CharField(max_length=20)
    