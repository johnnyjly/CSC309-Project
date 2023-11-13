from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
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

        if self.request.user.is_authenticated and hasattr(self.request.user, 'petshelter'):
            shelter = self.request.user.petshelter
            queryset = queryset.filter(shelter=shelter)

        return queryset.order_by('-creation_time', '-update_time')
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the status is the only field being updated
        if set(request.data.keys()) - {'status'}:
            return Response(
                {'error': 'Details of an application cannot be updated once submitted/created, except for its status.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        shelter = getattr(self.request.user, 'petshelter', None)
        pet_seeker = getattr(self.request.user, 'petseeker', None)

        # Shelter can only update the status from pending to accepted or denied
        if shelter and instance.status == Application.PENDING and request.data['status'] in [Application.ACCEPTED, Application.DENIED]:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

        # Pet seeker can only update the status from pending or accepted to withdrawn
        elif pet_seeker and instance.status in [Application.PENDING, Application.ACCEPTED] and request.data['status'] == Application.WITHDRAWN:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

        return Response(
            {'error': 'Invalid status update for the current user and application status.'},
            status=status.HTTP_400_BAD_REQUEST
        )
