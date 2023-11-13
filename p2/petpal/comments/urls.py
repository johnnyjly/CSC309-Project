from django.urls import path
from . import views


urlpatterns = [
    path('pet_shelters/<int:pk>/', views.CommentOnShelterListCreate.as_view()),
    path('applications/<int:pk>/', views.CommentOnApplicationListCreate.as_view()),
]
