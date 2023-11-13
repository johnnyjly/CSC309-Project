from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetListingViewSet

app_name = 'petlistings'

router = DefaultRouter()
router.register(r'', PetListingViewSet, basename='petlistings')

urlpatterns = [
    path('', include(router.urls)),
]