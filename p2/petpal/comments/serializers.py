from rest_framework.serializers import ModelSerializer
from .models import *


class CommentOnShelterSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = ['content', 'commenter', 'reply', 'creation_time']


class CommentOnApplicationSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = ['content', 'commenter', 'reply', 'creation_time']
