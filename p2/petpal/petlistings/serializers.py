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
            instance.age = validated_data.get('age', instance.age)
            instance.breed = validated_data.get('breed', instance.breed)
            instance.name = validated_data.get('name', instance.name)
            instance.gender = validated_data.get('gender', instance.gender)
            instance.description = validated_data.get('description', instance.description)
            instance.color = validated_data.get('color', instance.color)
            instance.size = validated_data.get('size', instance.size)
            instance.image = validated_data.get('image', instance.image)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError("Only shelters can update the status of pet listings.")