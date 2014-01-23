from django.conf.urls import patterns, include, url
from tastypie.api import Api
from todoapp.api import TodoResource, UserResource
from django.contrib import admin
admin.autodiscover()
from django.conf import settings
from django.conf.urls.static import static


v0_api = Api(api_name='v0')
v0_api.register(TodoResource())
v0_api.register(UserResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'TodoBackend.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url('',include("todoapp.urls")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/',include(v0_api.urls)),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
