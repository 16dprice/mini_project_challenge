from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import Project, User, Book, Language
from ..serializers import ProjectSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status as status_code
from rest_framework.views import APIView
import json

class ProjectList(APIView):
    """ 
    Get a list of projects or create a new one 
    """
    def get(self, request):
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


    def post(self, request):
        bookSlug = request.data.get('bookSlug', None)
        languageSlug = request.data.get('languageSlug', None)

        if bookSlug != None and languageSlug != None:
            try:
                book = Book.objects.get(slug=bookSlug)
                language = Language.objects.get(slug=languageSlug)
                Project.objects.create(book=book, language=language)
                
                return Response(status=status_code.HTTP_201_CREATED)
            except:
                pass

        return Response(status=status_code.HTTP_400_BAD_REQUEST)


class ProjectDetail(APIView):
    """ 
    Get a project, or update its status, or delete one
    """
    def get(self, request, id):
        try:
            project = Project.objects.select_related(
                'book', 'language'
            ).get(id=id)
            serializerObject = ProjectSerializer(project)
            return Response(serializerObject.data)
        except:
            return Response(status=status_code.HTTP_404_NOT_FOUND)

    def patch(self, request, id):
        try:
            completionStatus = request.data.get('completed', None)
            project = Project.objects.get(id=id)
            if completionStatus == "true":
                project.completed = True
                project.save()
            elif completionStatus == 'false':
                project.completed = False
                project.save()
        except:
            return Response(status=status_code.HTTP_400_BAD_REQUEST)

        return Response(status=status_code.HTTP_200_OK)

    def delete(self, request, id):
        try:
            project = Project.objects.get(id=id)
            project.delete()
        except:
            return Response(status=status_code.HTTP_400_BAD_REQUEST)

        return Response(status=status_code.HTTP_200_OK)


class ProjectContributors(APIView):
    """
    Get a list of contributors of a project; 
    Add or remove contributor(s) of a project
    """
    def get(self, request, projectId):
        try:
            project = Project.objects.get(id=projectId)
            projectContributors = project.contributors.all()
            serializerObject = UserSerializer(projectContributors, many=True)

            return Response(serializerObject.data)
        except:
            return Response(status=status_code.HTTP_404_NOT_FOUND)

    def post(self, request, projectId):
        contributorList = request.data.get('contributors', None)
        if contributorList != None:
            try:
                contributorIdList = json.loads(contributorList)
                contributors = User.objects.filter(pk__in=contributorIdList)
                project = Project.objects.get(id=projectId)
                for user in contributors:
                    project.contributors.add(user)
                
                return Response(status=status_code.HTTP_200_OK)
            except:
                pass

        return Response(status=status_code.HTTP_400_BAD_REQUEST)

    def delete(self, request, projectId):
        contributorId = request.data.get('contributorId', None)
        if contributorId != None:
            try:
                contributor = User.objects.get(id=contributorId)
                project = Project.objects.get(id=projectId)
                project.contributors.remove(contributor)
                
                return Response(status=status_code.HTTP_200_OK)
            except:
                pass
        
        return Response(status=status_code.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_users_available_to_project(request, projectId):
    try:
        project = Project.objects.get(id=projectId)
        availableContributors = User.objects.difference(
            project.contributors.all()
        )
        serializerObject = UserSerializer(availableContributors, many=True)

        return Response(serializerObject.data)
    except:
        return Response(status=status_code.HTTP_404_NOT_FOUND)
