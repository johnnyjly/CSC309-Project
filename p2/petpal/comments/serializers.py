from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *


class CommentOnShelterCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = '__all__'
        read_only_fields = ['ID', 'commenter', 'commenter_name', 'creation_time', 'pet_shelter', 'pet_shelter_name']


class CommentOnShelterListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnShelter
        fields = '__all__'


class CommentOnApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = '__all__'
        read_only_fields = ['ID', 'commenter', 'commenter_name', 'creation_time', 'application', 'pet_seeker_name', 'pet_shelter_name']


class CommentOnApplicationListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnApplication
        fields = '__all__'


class CommentOnBlogPostCreateSerializer(ModelSerializer):
    class Meta:
        model = CommentOnBlogPost
        fields = ['content']


class CommentOnBlogPostListSerializer(ModelSerializer):
    class Meta:
        model = CommentOnBlogPost
        fields = ['ID', 'content', 'commenter_name', 'creation_time']
