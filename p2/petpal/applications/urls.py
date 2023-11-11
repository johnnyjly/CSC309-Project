from django.urls import path
from .views import AppCreateView, AppEditView, AppListView, AppDetailView

app_name="pet_apps"
urlpatterns = [ 
    path('create/', AppCreateView.as_view(), name="create"),
    path('all/', AppListView.as_view(), name="list"),
    path('<int:pk>/update/', AppEditView.as_view(), name="update"),
    path('<int:pk>/', AppDetailView.as_view(), name="detail"),
]
