from rest_framework import serializers
from .models import Pet
from accounts.models import PetShelter

class PetListingSerializer(serializers.ModelSerializer):
  shelter = serializers.SlugRelatedField(
        slug_field='username',
        queryset=PetShelter.objects.all()
  )
  
  class Meta:
    model = Pet
    fields = '__all__'