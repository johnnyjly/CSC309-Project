from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from datetime import datetime
from .models import *
from .serializers import *

# Create your views here.


class BlogPostListCreate(ListCreateAPIView, LoginRequiredMixin):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BlogPostListSerializer
        elif self.request.method == 'POST':
            return BlogPostCreateSerializer
    
    def get_queryset(self):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        queryset = BlogPost.objects.filter(poster=poster).order_by('-creation_time')
        return queryset
    
    def perform_create(self, serializer):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        if self.request.user.username != poster.username:
            raise Http404
        blog_post = BlogPost.objects.create(**serializer.validated_data,
                                            poster=poster,
                                            creation_time=datetime.now(),
                                            update_time=datetime.now(),)
        blog_post.save()


class BlogPostRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    def get_serializer_class(self):
        if self.request.method in ['GET', 'DELETE']:
            return BlogPostListSerializer
        elif self.request.method == 'PUT':
            return BlogPostCreateSerializer

    def get_object(self):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        blog_post = get_object_or_404(BlogPost, ID=self.kwargs['id'])
        if poster.username != blog_post.poster.username:
            raise Http404
        return blog_post

    def perform_update(self, serializer):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        blog_post = get_object_or_404(BlogPost, ID=self.kwargs['id'])
        if self.request.user.username != blog_post.poster.username or self.request.user.username != poster.username:
            raise Http404
        blog_post.image = serializer.validated_data['image']
        blog_post.title = serializer.validated_data['title']
        blog_post.content = serializer.validated_data['content']
        blog_post.update_time = datetime.now()
        blog_post.save()

    def perform_destroy(self, instance):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        blog_post = get_object_or_404(BlogPost, ID=self.kwargs['id'])
        if self.request.user.username != blog_post.poster.username or self.request.user.username != poster.username:
            raise Http404
        blog_post.delete()
