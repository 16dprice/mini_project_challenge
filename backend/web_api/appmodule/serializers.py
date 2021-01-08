from rest_framework import serializers

from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'completed', 'book', 'language', 'contributors']
        depth = 2