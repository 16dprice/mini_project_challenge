from rest_framework.decorators import api_view
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.response import Response

# Create your API controllers here.

# class ProjectViewSet(viewsets.ModelViewSet):
#     projects = Project.objects.all().order_by('id')
#     serializer = ProjectSerializer(projects, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all().order_by('id')
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
