from rest_framework.decorators import api_view
from .models import *
from .serializers import ProjectSerializer
from rest_framework.response import Response
from rest_framework import status as status_code
import json

# Create your API controllers here.

@api_view(['GET', 'POST'])
def projects(request):
    """ 
    Get a list of projects or create a new one 
    """
    if request.method == 'GET':
        projects = Project.objects.all().select_related('book', 'language').order_by('id')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        bookSlug = request.data['bookSlug']
        languageSlug = request.data['languageSlug']
        
        book = Book.objects.get(slug=bookSlug)
        language = Language.objects.get(slug=languageSlug)
        Project.objects.create(book=book, language=language)

        return Response()

@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, id):
    """ 
    Get a project, or update its status, or delete one
    """
    if request.method == 'GET':
        try:
            project = Project.objects.select_related('book', 'language').get(id=id)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except:
            return Response(status=status_code.HTTP_404_NOT_FOUND)

    elif request.method == 'PUT':
        completionStatus = request.data['completed']
        project = Project.objects.get(id=id)
        
        if completionStatus == "true":
            project.completed = True
        else: 
            project.completed = False
        
        project.save()

        return Response("project: " + id, status=status_code.HTTP_200_OK)

    elif request.method == 'DELETE':
        project = Project.objects.get(id=id)
        project.delete()

        return Response(status=status_code.HTTP_200_OK)        


@api_view(['POST', 'DELETE'])
def project_contributors(request, projectId):
    """
    Add or remove contributor(s) of a project
    """
    if request.method == 'POST':
        contributorList = request.data['contributors']

        contributorIdList = json.loads(contributorList)
        contributors = User.objects.filter(id in contributorIdList)
        project = Project.objects.select_related('contributors').get(id=projectId)
        project.contributors.bulk_create(contributors)

        return Response(status=status_code.HTTP_200_OK)

    elif request.method == 'DELETE':
        contributorId = request.data['contributorId']

        contributor = User.objects.get(id=contributorId)
        project = Project.objects.select_related('contributors').get(id=projectId)
        project.contributors.remove(contributor)

        return Response(status=status_code.HTTP_200_OK)