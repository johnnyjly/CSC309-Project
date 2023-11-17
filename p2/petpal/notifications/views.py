from django.shortcuts import render
from rest_framework import viewsets
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.response import Response

#dasd
# Create your views here.
class NotificationViewSet(viewsets.ModelViewSet):
  #queryset = Notification.objects.all().filter(recipient=self.request.user)
  serializer_class = NotificationSerializer
  pagination_class = PageNumberPagination
  
  def get_queryset(self):
    read_param = self.request.query_params.get('is_read')
    queryset = Notification.objects.all()
    if read_param is not None:
            read_status = read_param.lower() == 'true'
            queryset = queryset.filter(is_read=read_status)
    return queryset.filter(recipient=self.request.user).order_by('-creation_time')
  
  def update(self, request, *args, **kwargs):
      instance = self.get_object()
      if request.data.get('is_read') is None or request.data.get('is_read') == "false":
          return Response(
          {"detail": "You can only change the state of an unread notification to read."},
          status=status.HTTP_400_BAD_REQUEST
      )


      if not instance.is_read:
            instance.is_read = True
            instance.save()
            # Serialize and return the updated notification
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If the notification is already read, return a 400 Bad Request response
      return Response(
          {"detail": "You can only change the state of an unread notification to read."},
          status=status.HTTP_400_BAD_REQUEST
      )