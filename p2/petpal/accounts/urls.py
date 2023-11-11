from django.urls import path
from .views import (
    UserCreateView,
    UserUpdateView,
    ShelterRetrieveView,
    SeekerRetrieveView,
    ShelterListView,
    UserDeleteView,
)

urlpatterns = [
    path("", UserCreateView.as_view()),
    path("<str:username>/profile/", UserUpdateView.as_view()),
    path("shelters/<str:username>/", ShelterRetrieveView.as_view()),
    path("seekers/<str:username>/", SeekerRetrieveView.as_view()),
    path("shelters/", ShelterListView.as_view()),
    path("<str:username>/deletion/", UserDeleteView.as_view()),
]
