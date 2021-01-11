from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^projects/?$', views.ProjectList.as_view()),
    url(r'^projects/?(\?completed=((true)|(false)))', views.ProjectList.as_view()),
    url(r'^projects/(?P<id>\d+)/?$', views.ProjectDetail.as_view()),
    url(r'^projects/(?P<projectId>\d+)/contributors/?$', views.ProjectContributors.as_view()),
    url(r'^projects/(?P<projectId>\d+)/available-users/?$', views.get_users_available_to_project),
    url(r'^users/?$', views.UserList.as_view()),
    url(r'^users/(?P<id>\d+)/?$', views.UserInfo.as_view()),
    url(r'^users/(?P<id>\d+)/projects/?$', views.UserProject.as_view()),
    url(r'^languages/$', views.languages),
    url(r'^books/$', views.books),
]
