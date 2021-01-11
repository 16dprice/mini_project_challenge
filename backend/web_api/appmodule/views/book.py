from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status as status_code

@api_view(['GET'])
def books(request):
    bookList = Book.objects.all()
    serializerObject = BookSerializer(bookList, many=True)
    return Response(serializerObject.data)
