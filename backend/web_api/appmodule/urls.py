from django.conf.urls import url

from . import views

urlpatterns = [
    url('projects/', views.get_projects),
]