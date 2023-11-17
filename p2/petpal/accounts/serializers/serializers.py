from ..models import (
    MyUser,
    PetSeeker,
    PetShelter,
)
from rest_framework.serializers import (
    ModelSerializer,
    CharField,
    BooleanField,
    ImageField,
    EmailField,
)
from rest_framework.exceptions import ValidationError
from django.core.validators import validate_email


# Create Shelter and Seeker user
class UserCreateSerializer(ModelSerializer):
    password1 = CharField(max_length=128, write_only=True)
    password2 = CharField(max_length=128, write_only=True)

    # field to determine the type of user
    become_shelter = BooleanField(required=True, write_only=True)

    class Meta:
        model = MyUser
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "password1",
            "password2",
            "become_shelter",
        ]

    def create(self, validated_data):
        email = validated_data.get("email")
        password1 = validated_data.pop("password1", "")
        password2 = validated_data.pop("password2", "")
        become_shelter = validated_data.pop("become_shelter", "")
        if MyUser.objects.filter(email=email).exists():
            raise ValidationError("User with this email already exists.")
        # check password
        if password1 and password2 and password1 != password2:
            raise ValidationError("password mismatch")
        # check user type
        if become_shelter:
            user = PetShelter.objects.create(**validated_data)
            user.is_shelter = True
        else:
            user = PetSeeker.objects.create(**validated_data)
            user.is_seeker = True
        # user.email = email
        user.set_password(password1)
        user.save()
        return user


# Update basic info for both Shelter and Seeker user
class SeekerUpdateSerializer(ModelSerializer):
    old_password = CharField(style={"input_type": "password"}, required=False)
    new_password = CharField(style={"input_type": "password"}, required=False)
    username = CharField(required=False)
    email = EmailField(required=False)
    first_name = CharField(required=False, max_length=100)
    last_name = CharField(required=False, max_length=100)

    class Meta:
        model = MyUser
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "phone_number",
            "address",
            "city",
            "province",
            "postal_code",
            "user_avatar",
            "receive_communications",
            "receive_news",
            "old_password",
            "new_password",
        ]

    def update(self, instance, validated_data):
        old_password = validated_data.pop("old_password", None)
        new_password = validated_data.pop("new_password", None)

        # Check if email exists
        if "email" in validated_data:
            email = validated_data["email"]
            if MyUser.objects.filter(email=email) and email != instance.email:
                raise ValidationError("This email already exists.")
            else:
                validate_email(email)

        # Check if username exists
        if "username" in validated_data:
            username = validated_data["username"]
            if (
                MyUser.objects.filter(username=username)
                and username != instance.username
            ):
                raise ValidationError("This username already exists.")

        if old_password and new_password:
            if instance.check_password(old_password):
                instance.set_password(new_password)
                instance.save()
            else:
                raise ValidationError("Old password is incorrect")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ShelterUpdateSerializer(SeekerUpdateSerializer):
    shelter_name = CharField(required=False)
    shelter_avatar = ImageField(required=False)
    location = CharField(required=False)
    mission_statement = CharField(required=False)

    class Meta:
        model = MyUser
        fields = SeekerUpdateSerializer.Meta.fields + [
            "shelter_name",
            "shelter_avatar",
            "location",
            "mission_statement",
        ]


# Get profile of a shelter
class ShelterProfileSerializer(ModelSerializer):
    class Meta:
        model = PetShelter
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "phone_number",
            "address",
            "city",
            "province",
            "postal_code",
            "user_avatar",
            "shelter_name",
            "shelter_avatar",
            "location",
            "mission_statement",
        ]


# Get profile of a seeker from a shelter's perspective
class SeekerProfileSerializer(ModelSerializer):
    class Meta:
        model = PetSeeker
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "phone_number",
            "address",
            "city",
            "province",
            "postal_code",
            "user_avatar",
        ]


# Delete user
class UserDeleteSerializer(ModelSerializer):
    class Meta:
        model = MyUser
        fields = "__all__"


class SeekerDeleteSerializer(UserDeleteSerializer):
    class Meta:
        model = PetSeeker
        fields = "__all__"


class ShelterDeleteSerializer(UserDeleteSerializer):
    class Meta:
        model = PetShelter
        fields = "__all__"
