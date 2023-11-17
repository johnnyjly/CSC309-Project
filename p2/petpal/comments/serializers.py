from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *


class CommentOnShelterCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = ['content']


class CommentOnShelterListSerializer(ModelSerializer):
    commenter_name = serializers.CharField(max_length=255)
    class Meta:
        model = CommentOnShelter
        fields = ['ID', 'content', 'commenter_name', 'creation_time']


class CommentOnApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['content']


class CommentOnApplicationListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['ID', 'content', 'commenter_name', 'creation_time']
