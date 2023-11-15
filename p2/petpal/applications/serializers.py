from rest_framework import serializers
from .models import Application
from accounts.models import PetSeeker, PetShelter
from petlistings.models import Pet


class ApplicationSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(
        slug_field='username',
        queryset=PetShelter.objects.all()
    )
    applicant = serializers.SlugRelatedField(
        slug_field='username',
        queryset=PetSeeker.objects.all()
    )
    animal = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Pet.objects.all()
    )

    class Meta:
        model = Application
        fields = '__all__'