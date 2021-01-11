from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import User
from ..serializers import UserSerializer, ProjectSerializer
from rest_framework.response import Response
from rest_framework import status as status_code

class UserList(APIView):

    def get(self, request):
        userList = User.objects.all()
        serializerObject = UserSerializer(userList, many=True)
        return Response(serializerObject.data)

    def post(self, request):
        username = request.data['username']
        firstName = request.data['firstName']
        lastName = request.data['lastName']

        User.objects.create(
            username=username, first_name=firstName, last_name=lastName
        )
        return Response(status=status_code.HTTP_200_OK)


class UserInfo(APIView):

    def get(self, request, id):
        user = User.objects.get(id=id)
        serializerObject = UserSerializer(user)
        return Response(serializerObject.data)

    def patch(self, request, id):
        user = User.objects.get(id=id)
        firstName = request.data['firstName']
        lastName = request.data['lastName']

        user.first_name = firstName
        user.last_name = lastName
        user.save()

        return Response(status=status_code.HTTP_200_OK)


class UserProject(APIView):
    def get(self, request, id):
        user = User.objects.get(id=id)
        projects = user.project_set.all()
        serializerObject = ProjectSerializer(projects, many=True)
        return Response(serializerObject.data)
