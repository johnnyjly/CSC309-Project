from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
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
        return CommentOnShelter.objects.filter(pet_shelter=pet_shelter).order_by('creation_time')

    def perform_create(self, serializer):
        pet_shelter = get_object_or_404(PetShelter, username=self.kwargs['username'])
        comment = CommentOnShelter.objects.create(**serializer.validated_data,
                                                  commenter=self.request.user,
                                                  creation_time=datetime.now(),
                                                  pet_shelter=pet_shelter,)
        comment.save()


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
        return CommentOnApplication.objects.filter(application=application).order_by('creation_time')

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
