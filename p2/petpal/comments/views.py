from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseNotFound
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from .models import *
from .serializers import *

# Create your views here.


class CommentOnShelterListCreate(ListCreateAPIView, LoginRequiredMixin):
    serializer_class = CommentOnShelterSerializer

    def get_queryset(self):
        pet_shelter = get_object_or_404(PetShelter, ID=self.kwargs['pk'])
        return CommentOnShelter.objects.filter(pet_shelter=pet_shelter).order_by('creation_time')

    def perform_create(self, serializer):
        pet_shelter = get_object_or_404(PetShelter, ID=self.kwargs['pk'])
        comment = CommentOnShelter.objects.create(**serializer.validated_data, pet_shelter=pet_shelter)
        comment.save()


class CommentOnApplicationListCreate(ListCreateAPIView, LoginRequiredMixin):
    serializer_class = CommentOnApplicationSerializer

    def get_queryset(self):
        application = get_object_or_404(Application, ID=self.kwargs['pk'])
        if self.request.user not in [application.applicant, application.shelter]:
            return HttpResponseNotFound()
        return CommentOnApplication.objects.filter(application=application).order_by('creation_time')

    def perform_create(self, serializer):
        application = get_object_or_404(Application, ID=self.kwargs['pk'])
        if self.request.user not in [application.applicant, application.shelter]:
            return HttpResponseNotFound()
        comment = CommentOnApplication.objects.create(**serializer.validated_data, application=application)
        comment.save()
