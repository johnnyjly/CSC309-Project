from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppViewSet

app_name = "pet_apps"

router = DefaultRouter()
router.register(r'', AppViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
]