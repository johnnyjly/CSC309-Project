from rest_framework import serializers
from .models import Application
from accounts.models import PetSeeker, PetShelter

class ApplicationSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(
        slug_field='username',
        queryset=PetShelter.objects.all()
    )
    applicant = serializers.SlugRelatedField(
        slug_field='username',
        queryset=PetSeeker.objects.all()
    )

    class Meta:
        model = Application
        fields = '__all__'