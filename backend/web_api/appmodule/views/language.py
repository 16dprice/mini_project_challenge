from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status as status_code

@api_view(['GET'])
def languages(request):
    index = int(request.query_params.get('index', 0))
    upperLimit = index + constant.LANGUAGE_TAKE_LIMIT
    languages = Language.objects.all()[index:upperLimit]
    serializerObject = LanguageSerializer(languages, many=True)

    return Response(serializerObject.data)
