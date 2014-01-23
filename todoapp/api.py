'''
Created on 22-Jan-2014

@author: venkatesh
'''

from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from todoapp.models import Todo


class TodoResource(ModelResource):
    
    class Meta:
        queryset = Todo.objects.all()
        resource_name = "todos"
        authorization = Authorization()
        list_allowed_methods = ['get', 'post', 'options', 'delete']
        ordering = ['id', 'priority']
        always_return_data = True