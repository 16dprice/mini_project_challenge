from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'projects/?$', views.get_projects),
    url(r'projects/create/?$', views.create_project),
]