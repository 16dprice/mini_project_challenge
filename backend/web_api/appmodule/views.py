from rest_framework.decorators import api_view
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.response import Response

# Create your API controllers here.

@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all().select_related('book', 'language').order_by('id')
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_project(request, id):
    project = Project.objects.filter(id=id).select_related('book', 'language').first()
    serializer = ProjectSerializer(project)
    return Response(serializer.data)


@api_view(['POST'])
def create_project(request):
    # TODO: create a project and return the new project info
    pass