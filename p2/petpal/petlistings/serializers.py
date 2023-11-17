from rest_framework import serializers
from .models import Pet
from accounts.models import PetShelter

class PetListingSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(
        slug_field='username',
        read_only=True
    )

    class Meta:
        model = Pet
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user

        if user.is_authenticated and user.is_shelter:
            validated_data['shelter'] = user.petshelter
            validated_data['status'] = 'available'

            pet_instance = Pet.objects.create(**validated_data)
            return pet_instance
        else:
            raise serializers.ValidationError("Only shelters can create pet listings.")
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.is_authenticated and user.is_shelter:
            instance.status = validated_data.get('status', instance.status)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError("Only shelters can update the status of pet listings.")