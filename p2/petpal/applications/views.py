from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from .models import Application
from .serializers import ApplicationSerializer

class AppCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class AppEditView(generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class AppListView(generics.ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class AppDetailView(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer