from django.shortcuts import render
from ..models import (
    PetSeeker,
    PetShelter,
)
from ..serializers import (
    UserCreateSerializer,
    # UserLogInSerializer,
    SeekerUpdateSerializer,
    ShelterUpdateSerializer,
    ShelterProfileSerializer,
    SeekerProfileSerializer,
    SeekerDeleteSerializer,
    ShelterDeleteSerializer,
)
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404


# Create your views here.
# Create Shelter and Seeker user
class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        return super().perform_create(serializer)


# Update Shelter and Seeker user
class UserUpdateView(UpdateAPIView):
    serializer_class = SeekerUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.is_shelter:
            return ShelterUpdateSerializer
        elif self.request.user.is_seeker:
            return SeekerUpdateSerializer

    def get_object(self):
        if self.request.user.username != self.kwargs["username"]:
            raise ValidationError("You don't have permission to do this.")
        if self.request.user.is_shelter:
            return get_object_or_404(
                PetShelter, username=self.kwargs["username"]
            )
        elif self.request.user.is_seeker:
            return get_object_or_404(
                PetSeeker, username=self.kwargs["username"]
            )


# Retrieve Shelter
class ShelterRetrieveView(RetrieveAPIView):
    serializer_class = ShelterProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(PetShelter, username=self.kwargs["username"])


# Retrieve Seeker (need to check if the seeker has an active application)
class SeekerRetrieveView(RetrieveAPIView):
    serializer_class = SeekerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # TODO: Need to check if the seeker has an active application
        return get_object_or_404(PetSeeker, username=self.kwargs["username"])


class ShelterListView(ListAPIView):
    serializer_class = ShelterProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PetShelter.objects.all()


class UserDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.is_shelter:
            return SeekerDeleteSerializer
        elif self.request.user.is_seeker:
            return ShelterDeleteSerializer

    def get_object(self):
        if self.request.user.username != self.kwargs["username"]:
            raise ValidationError("You don't have permission to do this.")
        if self.request.user.is_shelter:
            return get_object_or_404(
                PetShelter, username=self.kwargs["username"]
            )
        elif self.request.user.is_seeker:
            return get_object_or_404(
                PetSeeker, username=self.kwargs["username"]
            )
