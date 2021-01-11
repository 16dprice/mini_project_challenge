from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'projects/?$', views.projects),
    url(r'projects/?(\?completed=((true)|(false)))', views.projects),
    url(r'projects/(?P<id>\d+)/?$', views.project_detail),
    url(r'projects/(?P<projectId>\d+)/contributors/?$', views.project_contributors),
    url(r'users/?$', views.users),
]