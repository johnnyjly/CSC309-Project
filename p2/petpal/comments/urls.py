from django.urls import path
from . import views


app_name = 'comments'

urlpatterns = [
    path('pet_shelters/<str:username>/', views.CommentOnShelterListCreate.as_view()),
    path('applications/<int:pk>/', views.CommentOnApplicationListCreate.as_view()),
]
