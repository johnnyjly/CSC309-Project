from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Application
from .serializers import ApplicationSerializer

class AppViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        status_filter = self.request.query_params.get('status', None)
        queryset = Application.objects.all()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        # Shelters can only view their own applications
        if self.request.user.is_authenticated and hasattr(self.request.user, 'petshelter'):
            shelter = self.request.user.petshelter
            queryset = queryset.filter(shelter=shelter)

        return queryset.order_by('-creation_time', '-update_time')