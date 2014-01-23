'''
Created on 22-Jan-2014

@author: venkatesh
'''

from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie.resources import ALL
from tastypie import fields

from todoapp.models import Todo, User


class UserResource(ModelResource):
    
    class Meta:
        queryset = User.objects.all()
        resource_name = "user"
        authorization = Authorization()
        list_allowed_methods = ['get', 'post', 'options']
        always_return_data = True

class TodoResource(ModelResource):
    
    user = fields.ForeignKey(UserResource,"user")
    class Meta:
        queryset = Todo.objects.all()
        resource_name = "todos"
        authorization = Authorization()
        list_allowed_methods = ['get', 'post', 'options', 'delete']
        ordering = ['id', 'priority']
        filtering = {
                     "user" : ['exact']
                     }
        always_return_data = True
