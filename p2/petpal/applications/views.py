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

        if (status_filter is not None):
            if (status_filter.lower() == 'pending'):
                queryset = queryset.filter(status = 'pending')
            if (status_filter.lower() == 'accepted'):
                queryset = queryset.filter(status = 'accepted')
            if (status_filter.lower() == 'rejected'):
                queryset = queryset.filter(status = 'rejected')
            if (status_filter.lower() == 'withdrawn'):
                queryset = queryset.filter(status = 'withdrawn')

        if self.request.user.is_authenticated and self.request.user.is_shelter:
            shelter = self.request.user.petshelter
            return queryset.order_by('-creation_time', '-update_time').filter(shelter=shelter)
        else:
            seeker = self.request.user.petseeker
            return queryset.order_by('-creation_time', '-update_time').filter(applicant=seeker)
        
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        shelter = self.request.user.is_shelter

        # Shelter can only update the status from pending to accepted or denied
        if shelter and instance.status == 'pending' and request.data['status'] in ['accepted', 'rejected']:
            instance.status = request.data['status']
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Pet seeker can only update the status from pending or accepted to withdrawn
        elif not shelter and instance.status in ['pending', 'accepted'] and request.data['status'] == 'withdrawn':
            instance.status = request.data['status']
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {'error': 'Invalid status update for the current user and application status.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        return Response(
            {'error': 'Deleting applications is not allowed.'},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
