from django.db import models

# Create your models here.

class User(models.Model):
    username = models.TextField()
    first_name = models.TextField()
    last_name = models.TextField()

class Language(models.Model):
    slug = models.CharField(max_length=30, primary_key=True)
    original_name = models.TextField()
    anglicized_name = models.TextField()

class Book(models.Model):
    slug = models.CharField(max_length=10, primary_key=True)
    name = models.TextField()
    index = models.IntegerField()

class Project(models.Model):
    completed = models.BooleanField(default=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    contributors = models.ManyToManyField(User)
