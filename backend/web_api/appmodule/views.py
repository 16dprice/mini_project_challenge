from rest_framework.decorators import api_view
from .models import *
from .serializers import ProjectSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your API controllers here.

@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all().select_related('book', 'language').order_by('id')
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_project(request, id):
    try:
        project = Project.objects.select_related('book', 'language').get(id=id)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_project(request):
    bookSlug = request.data['bookSlug']
    languageSlug = request.data['languageSlug']
    
    book = Book.objects.get(slug=bookSlug)
    language = Language.objects.get(slug=languageSlug)

    Project.objects.create(book=book, language=language)

    return Response()