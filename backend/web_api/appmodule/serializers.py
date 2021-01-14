from rest_framework import serializers
from .models import Book, Language, Project, User

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['slug', 'name', 'index']


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['slug', 'original_name', 'anglicized_name']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'completed', 'book', 'language', 'contributors']
        depth = 2


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']