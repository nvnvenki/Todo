from django.http import HttpResponse
from django.http.response import HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from todoapp.models import Todo

# Create your views here.

VALID_FILTERS = []

def index(request):
    return HttpResponse("Hello World..!!!")

def apply_filtering(objects, request):
    if not objects:
        return []
    return objects

def delete_todo(request):
    data = request.body 
    data = json.loads(data)
    print data['task_name']
    obj = Todo.objects.get(task_name=data['task_name'])
    obj.delete()
    
    response = HttpResponse()
    response['Access-Control-Allow-Origin'] = '*'
    response.content = "Deleted"
    response['status'] = "200"
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
    return objects

def get_dict_form_object(obj):
    return {
            'task_id' : obj.id,
            'task_name' : obj.task_name,
            'time' : obj.time
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