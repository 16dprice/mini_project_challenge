from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'projects/?$', views.projects),
    url(r'projects/?(\?completed=((true)|(false)))', views.projects),
    url(r'projects/(?P<id>\d+)/?$', views.project_detail),
    url(r'projects/(?P<projectId>\d+)/contributors/?$', views.project_contributors),
    url(r'projects/(?P<projectId>\d+)/available-users/?$', views.get_users_available_to_project),
    url(r'users/?$', views.users),
    url(r'users/(?P<id>\d+)/?$', views.user_info),
    url(r'users/(?P<id>\d+)/projects/?$', views.user_projects),
]
