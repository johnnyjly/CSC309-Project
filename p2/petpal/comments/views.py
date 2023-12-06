from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from datetime import datetime
from .models import *
from .serializers import *

# Create your views here.


class CommentOnShelterListCreate(ListCreateAPIView, LoginRequiredMixin):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CommentOnShelterListSerializer
        elif self.request.method == 'POST':
            return CommentOnShelterCreateSerializer

    def get_queryset(self):
        pet_shelter = get_object_or_404(PetShelter, username=self.kwargs['username'])
        queryset = CommentOnShelter.objects.filter(pet_shelter=pet_shelter).order_by('-creation_time')
        for commenter in queryset:
            commenter.commenter_name = commenter.commenter.username
        return queryset

    def perform_create(self, serializer):
        pet_shelter = get_object_or_404(PetShelter, username=self.kwargs['username'])
        comment = CommentOnShelter.objects.create(**serializer.validated_data,
                                                  commenter=self.request.user,
                                                  creation_time=datetime.now(),
                                                  pet_shelter=pet_shelter,)
        comment.save()


class CommentOnShelterRetrieve(RetrieveAPIView, LoginRequiredMixin):
    serializer_class = CommentOnShelterListSerializer

    def get_object(self):
        pet_shelter = get_object_or_404(PetShelter, username=self.kwargs['username'])
        comment = get_object_or_404(CommentOnShelter, ID=self.kwargs['id'])
        if comment.pet_shelter.username != pet_shelter.username:
            raise Http404
        comment.commenter_name = comment.commenter.username
        return comment


class CommentOnApplicationListCreate(ListCreateAPIView, LoginRequiredMixin):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CommentOnApplicationListSerializer
        elif self.request.method == 'POST':
            return CommentOnApplicationCreateSerializer

    def get_queryset(self):
        application = get_object_or_404(Application, ID=self.kwargs['pk'])
        if self.request.user.username not in [application.applicant.username, application.shelter.username]:
            raise Http404
        queryset = CommentOnApplication.objects.filter(application=application).order_by('-creation_time')
        for comment in queryset:
            comment.commenter_name = comment.commenter.username
        return queryset

    def perform_create(self, serializer):
        application = get_object_or_404(Application, ID=self.kwargs['pk'])
        if self.request.user.username not in [application.applicant.username, application.shelter.username]:
            raise Http404
        comment = CommentOnApplication.objects.create(**serializer.validated_data,
                                                      commenter=self.request.user,
                                                      creation_time=datetime.now(),
                                                      application=application,)
        application.update_time = datetime.now()
        comment.save()
        application.save()


class CommentOnApplicationRetrieve(RetrieveAPIView, LoginRequiredMixin):
    serializer_class = CommentOnApplicationListSerializer

    def get_object(self):
        application = get_object_or_404(Application, ID=self.kwargs['pk'])
        if self.request.user.username not in [application.applicant.username, application.shelter.username]:
            raise Http404
        comment = get_object_or_404(CommentOnApplication, ID=self.kwargs['id'])
        if comment.application.ID != application.ID:
            raise Http404
        comment.commenter_name = comment.commenter.username
        return comment


class CommentOnBlogPostListCreate(ListCreateAPIView, LoginRequiredMixin):
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CommentOnBlogPostListSerializer
        elif self.request.method == 'POST':
            return CommentOnBlogPostCreateSerializer

    def get_queryset(self):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        blog_post = get_object_or_404(BlogPost, ID=self.kwargs['pk'])
        if poster.username != blog_post.poster.username:
            raise Http404
        queryset = CommentOnBlogPost.objects.filter(blog_post=blog_post).order_by('-creation_time')
        for commenter in queryset:
            commenter.commenter_name = commenter.commenter.username
        return queryset

    def perform_create(self, serializer):
        poster = get_object_or_404(PetShelter, username=self.kwargs['username'])
        blog_post = get_object_or_404(BlogPost, ID=self.kwargs['pk'])
        if poster.username != blog_post.poster.username:
            raise Http404
        comment = CommentOnBlogPost.objects.create(**serializer.validated_data,
                                                   commenter=self.request.user,
                                                   creation_time=datetime.now(),
                                                   blog_post=blog_post,)
        comment.save()
