from rest_framework.serializers import ModelSerializer
from .models import *


class CommentOnShelterCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = ['content']


class CommentOnShelterListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = ['content', 'commenter', 'creation_time']


class CommentOnApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['content']


class CommentOnApplicationListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['content', 'commenter', 'creation_time']
