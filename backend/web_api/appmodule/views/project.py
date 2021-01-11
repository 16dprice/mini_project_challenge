from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import Project, User, Book, Language
from ..serializers import ProjectSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status as status_code
from rest_framework.views import APIView
import json

class ProjectList(APIView):

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
        bookSlug = request.data['bookSlug']
        languageSlug = request.data['languageSlug']

        book = Book.objects.get(slug=bookSlug)
        language = Language.objects.get(slug=languageSlug)
        Project.objects.create(book=book, language=language)

        return Response(status=status_code.HTTP_200_OK)


class ProjectDetail(APIView):

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
        completionStatus = request.data['completed']
        project = Project.objects.get(id=id)

        if completionStatus == "true":
            project.completed = True
        else:
            project.completed = False

        project.save()

        return Response(status=status_code.HTTP_200_OK)

    def delete(self, request, id):
        project = Project.objects.get(id=id)
        project.delete()

        return Response(status=status_code.HTTP_200_OK)


class ProjectContributors(APIView):

    def get(self, request, projectId):
        project = Project.objects.get(id=projectId)
        projectContributors = project.contributors.all()
        serializerObject = UserSerializer(projectContributors, many=True)

        return Response(serializerObject.data)

    def post(self, request, projectId):
        contributorList = request.data['contributors']

        contributorIdList = json.loads(contributorList)
        contributors = User.objects.filter(pk__in=contributorIdList)
        project = Project.objects.get(id=projectId)
        for user in contributors:
            project.contributors.add(user)

        return Response(status=status_code.HTTP_200_OK)

    def delete(self, request, projectId):
        contributorId = request.data['contributorId']

        contributor = User.objects.get(id=contributorId)
        project = Project.objects.get(id=projectId)
        project.contributors.remove(contributor)

        return Response(status=status_code.HTTP_200_OK)


@api_view(['GET'])
def get_users_available_to_project(request, projectId):
    project = Project.objects.get(id=projectId)
    availableContributors = User.objects.difference(
        project.contributors.all())
    serializerObject = UserSerializer(availableContributors, many=True)

    return Response(serializerObject.data)
