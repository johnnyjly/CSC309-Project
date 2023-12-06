from django.urls import path
from . import views


app_name = 'comments'

urlpatterns = [
    path('pet_shelters/<str:username>/', views.CommentOnShelterListCreate.as_view(), 
         name='comment-on-shelter'),

    path('pet_shelters/<str:username>/<int:id>/', views.CommentOnShelterRetrieve.as_view(),
         name='comment-on-shelter-retrieve'),

    path('applications/<int:pk>/', views.CommentOnApplicationListCreate.as_view(), 
         name='comment-on-application'),

    path('applications/<int:pk>/<int:id>/', views.CommentOnApplicationRetrieve.as_view(),
         name='comment-on-application-retrieve'),

     path('blogs/<str:username>/<int:pk>/', views.CommentOnBlogPostListCreate.as_view(),
          name='comment-on-blog-post'),
]
