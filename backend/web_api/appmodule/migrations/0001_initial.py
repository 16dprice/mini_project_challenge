# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2021-01-06 14:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('slug', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('index', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('slug', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('original_name', models.TextField()),
                ('anglicized_name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appmodule.Book')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.TextField()),
                ('firstname', models.TextField()),
                ('lastname', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='contributors',
            field=models.ManyToManyField(to='appmodule.User'),
        ),
        migrations.AddField(
            model_name='project',
            name='language',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appmodule.Language'),
        ),
    ]
