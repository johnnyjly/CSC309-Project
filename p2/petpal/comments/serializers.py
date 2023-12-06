from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *


class CommentOnShelterCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = ['content', 'rating']


class CommentOnShelterListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = ['ID', 'content', 'rating', 'commenter_name', 'creation_time']


class CommentOnApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['content']


class CommentOnApplicationListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['ID', 'content', 'commenter_name', 'creation_time']


class CommentOnBlogPostCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnBlogPost
        fields = ['content']


class CommentOnBlogPostListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnBlogPost
        fields = ['ID', 'content', 'commenter_name', 'creation_time']
