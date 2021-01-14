from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework import status as status_code
from django.db.models import Q
from ..constant import *


@api_view(['GET'])
def languages(request):
    query = request.query_params.get('filter', None)
    if query != None:
        languages = Language.objects.filter(
            Q(slug=query)
        )
        
        result = []
        if languages.count() > 0:
            result = languages
        else:
            result = Language.objects.filter(
                Q(anglicized_name__contains=query) | Q(
                    original_name__contains=query)
            )[:LANGUAGE_TAKE_LIMIT]

        serializerObject = LanguageSerializer(result, many=True)

        return Response(serializerObject.data)
    else:
        index = int(request.query_params.get('index', 0))
        upperLimit = index + LANGUAGE_TAKE_LIMIT
        languages = Language.objects.all()[index:upperLimit]
        serializerObject = LanguageSerializer(languages, many=True)
        return Response(serializerObject.data)
