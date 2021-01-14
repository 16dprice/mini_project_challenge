from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import User
from ..serializers import UserSerializer, ProjectSerializer
from rest_framework.response import Response
from rest_framework import status as status_code

class UserList(APIView):
    """
    Get a list of users or Create a new user
    """
    def get(self, request):
        userList = User.objects.all()
        serializerObject = UserSerializer(userList, many=True)
        return Response(serializerObject.data)

    def post(self, request):
        username = request.data.get('username', None)
        firstName = request.data.get('firstName', None)
        lastName = request.data.get('lastName', None)

        if username != None and firstName != None and lastName != None:
            try:
                validateUser = User.objects.get(username=username)
                # already exists
                return Response(status=status_code.HTTP_409_CONFLICT)
            except:
                User.objects.create(
                    username=username, first_name=firstName, last_name=lastName
                )
                return Response(status=status_code.HTTP_200_OK)
        else:
            return Response(status=status_code.HTTP_400_BAD_REQUEST)

class UserInfo(APIView):
    """
    Get or Update user info
    """
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializerObject = UserSerializer(user)
            return Response(serializerObject.data)
        except:
            return Response(status=status_code.HTTP_404_NOT_FOUND)

    def patch(self, request, id):
        user = User.objects.get(id=id)
        firstName = request.data.get('firstName', None)
        lastName = request.data.get('lastName', None)

        if firstName != None and lastName != None:
            user.first_name = firstName
            user.last_name = lastName
            user.save()
            
            return Response(status=status_code.HTTP_200_OK)
        else: 
            return Response(status=status_code.HTTP_400_BAD_REQUEST)


class UserProject(APIView):
    """
    Get a list of projects that the user is the contributor
    """
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            projects = user.project_set.all()
            serializerObject = ProjectSerializer(projects, many=True)
            return Response(serializerObject.data)
        except:
            return Response(status=status_code.HTTP_400_BAD_REQUEST)
