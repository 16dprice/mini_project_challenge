from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from . import constant
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
        statusFilter = request.query_params.get('completed', None)
        project = []

        #  filter by completion status
        if statusFilter == 'true':
            projects = Project.objects.select_related(
                'book', 'language'
            ).filter(completed=True).order_by('id')
        
        elif statusFilter == 'false':
            projects = Project.objects.select_related(
                'book', 'language'
            ).filter(completed=False).order_by('id')

        else:
           projects = Project.objects.select_related(
                'book', 'language'
            ).order_by('id')
            
        serializerObject = ProjectSerializer(projects, many=True)
        return Response(serializerObject.data)

    elif request.method == 'POST':
        bookSlug = request.data['bookSlug']
        languageSlug = request.data['languageSlug']

        book = Book.objects.get(slug=bookSlug)
        language = Language.objects.get(slug=languageSlug)
        Project.objects.create(book=book, language=language)

        return Response(status=status_code.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, id):
    """ 
    Get a project, or update its status, or delete one
    """
    if request.method == 'GET':
        try:
            project = Project.objects.select_related(
                'book', 'language'
            ).get(id=id)
            serializerObject = ProjectSerializer(project)
            return Response(serializerObject.data)
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

        return Response(status=status_code.HTTP_200_OK)

    elif request.method == 'DELETE':
        project = Project.objects.get(id=id)
        project.delete()

        return Response(status=status_code.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
def project_contributors(request, projectId):
    """
    Get a list of contributors of a project; 
    Add or remove contributor(s) of a project
    """
    if request.method == 'GET':
        project = Project.objects.get(id=projectId)
        projectContributors = project.contributors.all()
        serializerObject = UserSerializer(projectContributors, many=True)
        return Response(serializerObject.data)

    elif request.method == 'POST':
        contributorList = request.data['contributors']

        contributorIdList = json.loads(contributorList)
        contributors = User.objects.filter(pk__in=contributorIdList)
        project = Project.objects.get(id=projectId)
        for user in contributors:
            project.contributors.add(user)

        return Response(status=status_code.HTTP_200_OK)

    elif request.method == 'DELETE':
        contributorId = request.data['contributorId']

        contributor = User.objects.get(id=contributorId)
        project = Project.objects.select_related(
            'contributors'
        ).get(id=projectId)
        project.contributors.remove(contributor)

        return Response(status=status_code.HTTP_200_OK)


@api_view(['GET'])
def get_users_available_to_project(request, projectId):
    project = Project.objects.get(id=projectId)
    availableContributors = User.objects.difference(
        project.contributors.all())
    serializerObject = UserSerializer(availableContributors, many=True)
    return Response(serializerObject.data)


@api_view(['GET', 'POST'])
def users(request):
    """
    Get a list of users or Create a new user
    """
    if request.method == 'GET':
        userList = User.objects.all()
        serializerObject = UserSerializer(userList, many=True)
        return Response(serializerObject.data)

    elif request.method == 'POST':
        username = request.data['username']
        firstName = request.data['firstName']
        lastName = request.data['lastName']

        User.objects.create(
            username=username,first_name=firstName, last_name=lastName
        )
        return Response(status=status_code.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def user_info(request, id):
    """
    Get or Update user info
    """
    if request.method == 'GET':
        user = User.objects.get(id=id)
        serializerObject = UserSerializer(user)
        return Response(serializerObject.data)

    elif request.method == 'PUT':
        user = User.objects.get(id=id)
        firstName = request.data['firstName']
        lastName = request.data['lastName']

        user.first_name = firstName
        user.last_name = lastName
        user.save()

        return Response(status=status_code.HTTP_200_OK)


@api_view(['GET'])
def user_projects(request, userId):
    user = User.objects.get(id=userId)
    serializerObject = ProjectSerializer(user.project_set.all(), many=True)
    return Response(serializerObject.data)



@api_view(['GET'])
def languages(request):
    index = int(request.query_params.get('index', 0))
    upperLimit = index + constant.LANGUAGE_TAKE_LIMIT
    languages = Language.objects.all()[index:upperLimit]
    serializerObject = LanguageSerializer(languages, many=True)
    
    return Response(serializerObject.data)


@api_view(['GET'])
def books(request):
    bookList = Book.objects.all()
    serializerObject = BookSerializer(bookList, many=True)
    return Response(serializerObject.data)
