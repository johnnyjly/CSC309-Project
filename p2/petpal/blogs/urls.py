from django.urls import path
from . import views


app_name = 'blogs'

urlpatterns = [
    path('<str:username>/', views.BlogPostListCreate.as_view(),
         name='blog-post'),

    path('<str:username>/<int:id>/', views.BlogPostRetrieveUpdateDestroy.as_view(),
         name='blog-post-edit'),
]
