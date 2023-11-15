from django.shortcuts import render
from rest_framework import viewsets
from .models import Pet
from accounts.models.models import PetShelter
from .serializers import PetListingSerializer
from rest_framework.pagination import PageNumberPagination


# Create your views here.
class PetListingViewSet(viewsets.ModelViewSet):
  #queryset = Notification.objects.all().filter(recipient=self.request.user)
  serializer_class = PetListingSerializer
  pagination_class = PageNumberPagination
  
  def get_queryset(self):
    sort_param = self.request.query_params.get('sort')
    if sort_param is not None:
      queryset = Pet.objects.all()
      return queryset.order_by('-' + sort_param)

    status_param = self.request.query_params.get('status')
    shelter_param = self.request.query_params.get('shelter')
    breed_param = self.request.query_params.get('breed')
    age_param = self.request.query_params.get('age')
    queryset = Pet.objects.all()
    if (status_param is not None):
        if (status_param.lower() == 'pending'):
            queryset = queryset.filter(status = 'pending')
        if (status_param.lower() == 'withdrawn'):
            queryset = queryset.filter(status = 'withdrawn')
        if (status_param.lower() == 'adopted'):
            queryset = queryset.filter(status = 'adopted')

    if (shelter_param is not None):
        queryset = queryset.filter(shelter = shelter_param)
    
    if (breed_param is not None):
        queryset = queryset.filter(breed = breed_param)

    if (age_param is not None):
        queryset = queryset.filter(age = age_param)
    
    
    if status_param is not None and status_param.lower() != 'available':
        return queryset
    else:
        return queryset.filter(status = 'available')