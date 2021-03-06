from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.http.response import HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from todoapp.models import Todo

# Create your views here.

VALID_ORDERING_FIELDS = ["priority","id"]


def index(request):
    return render_to_response('index.html')

def login(request):
    return render_to_response('login.html')


def apply_filtering(objects, request):
    if not objects:
        return []
    return objects

def delete_todo(request):
    data = request.body 
    data = json.loads(data)
    response = HttpResponse()
    response['Access-Control-Allow-Origin'] = '*'
    
    response['status'] = "200"
    print data['id']
    obj = Todo.objects.get(pk=data['id'])
    if not obj:
        response.content = "Task absent"
        return response
    obj.delete()
    response.content = "Deleted"
    return response
    
def get_todo(request, task_id):
    obj = Todo.objects.get(pk=task_id)
    if not obj:
        HttpResponseBadRequest()
        
    objects = []
    objects.append(obj)
    return serialize(objects)

def apply_ordering(objects, request):
    if not objects:
        return []
    if 'order_by' in request.GET:
        field_name = request.GET['order_by'][1:]
        print field_name
    return objects

def get_dict_form_object(obj):
    return {
            'task_id' : obj.id,
            'task_name' : obj.task_name,
            'time' : obj.time,
            'priority':obj.priority
            }

def serialize(objects):
    
    object_list = []
    for obj in objects:
        object_list.append(get_dict_form_object(obj))
    data =  {'data' : object_list}
    response = HttpResponse()
    response['Access-Control-Allow-Origin'] = "*"
    response.content = json.dumps(data)
    response['content-type'] = "application/json"
    response['status'] = "200"
    return response
        
def get_todos_list(request):
    objects = Todo.objects.all()
    objects = apply_filtering(objects, request)
    objects = apply_ordering(objects, request)
    return serialize(objects)

@csrf_exempt
def post_todos_list(request):
    data = request.body
    data = json.loads(data)
    todo = Todo(**data)
    todo.save()
    
    response = HttpResponse()
    response['Access-Control-Allow-Origin'] = "*"
    response.content = ""
    response['status'] = "201"
    return response
    
def todos_list(request):
    if request.method == "GET":
        return get_todos_list(request)
    elif request.method == "POST":
        return post_todos_list(request)
    elif request.method == "OPTIONS":  
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'origin, x-csrftoken, content-type, accept'
        response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, DELETE"
        response.content = "Intermediate"
        response['status'] = "200"
        return response
    elif request.method == "DELETE":
        return delete_todo(request)
    else:
        return HttpResponseNotAllowed()