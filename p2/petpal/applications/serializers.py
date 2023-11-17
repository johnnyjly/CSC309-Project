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
        read_only=True
    )
    animal = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Pet.objects.all()
    )

    class Meta:
        model = Application
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user

        if user.is_authenticated and not user.is_shelter:
            existing_application = Application.objects.filter(
                applicant=user.petseeker, 
                animal=validated_data['animal']
            ).first()
            if existing_application:
                raise serializers.ValidationError("An application for this pet already exists.")
            
            validated_data['applicant'] = user.petseeker
            validated_data['status'] = 'pending'

            application_instance = Application.objects.create(**validated_data)
            return application_instance
        else:
            raise serializers.ValidationError("Only seekers can create applications.")