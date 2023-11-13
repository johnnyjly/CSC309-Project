from rest_framework import serializers
from .models import Pet

class PetListingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pet
    fields = '__all__'