'''
Created on 21-Jan-2014

@author: venkatesh
'''
from django.conf.urls import patterns, url

urlpatterns = patterns('todoapp.views',
     url(r'^$', "index"),
#     url(r'^todos/(?P<task_id>\d+)', 'get_todo'),
#     url(r'^todos$', 'todos_list'),
     
)
