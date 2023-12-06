from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *


class BlogPostCreateSerializer(ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['image', 'title', 'content']


class BlogPostListSerializer(ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
