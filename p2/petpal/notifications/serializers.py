from rest_framework import serializers
from .models import Notification
from accounts.models import MyUser

class NotificationSerializer(serializers.ModelSerializer):
  recipient = serializers.SlugRelatedField(
        slug_field = 'username',
        queryset = MyUser.objects.all(),
    )
  # comments_url = comments = serializers.HyperlinkedRelatedField(
  #       many=True,
  #       read_only=True,
  #       view_name='comment-detail'  # Replace with the actual view name for Comment
  #   )
  applications_url = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='application-detail'  # Replace with the actual view name for Application
    )


  class Meta:
    model = Notification
    fields = ['id', 'message', 'is_read', 'recipient', 'creation_time', 'applications_url']