from rest_framework import serializers
from .models import Notification
from accounts.models import MyUser
from comments.models import CommentOnShelter, CommentOnApplication
from applications.serializers import ApplicationSerializer
from applications.models import Application
from django.urls import reverse
from django.shortcuts import get_object_or_404


class NotificationSerializer(serializers.ModelSerializer):
  recipient = serializers.SlugRelatedField(
        slug_field = 'username',
        queryset = MyUser.objects.all(),
    )


  url = serializers.SerializerMethodField(
    read_only=True
  )

  type = serializers.ChoiceField(
        choices=['application', 'comment_on_shelter', 'comment_on_application'],
        write_only=True,
    )
  
  pk = serializers.IntegerField(
        write_only=True,
    )

  def get_url(self, object):
    # print(self.fields['url'])
    # print(object)
    # print("Object:", object.id, object.is_read, object.message, object.application, object.comment_on_shelter, object.comment_on_application)
    # print("Application Field:", object.application)
    # print(object.comment_on_application)
    # print(object.comment_on_shelter)
    # print(object.url)
    if object.application:
      return reverse("pet_apps:application-detail", args=[object.application.pk])
    elif object.comment_on_shelter:
      return reverse("comments:comment-on-shelter-retrieve", args=[object.comment_on_shelter.pet_shelter, object.comment_on_shelter.pk])
    elif object.comment_on_application:
      return reverse("comments:comment-on-application-retrieve", args=[object.comment_on_application.pk, object.comment_on_application.application.pk])

    return ""

  class Meta:
    model = Notification
    fields = ['id', 'message', 'is_read', 'recipient', 'creation_time', 'url', 'type', 'pk']
  
  def create(self, validated_data):
        type = validated_data.pop('type')
        pk = validated_data.pop('pk')

        recipient = validated_data['recipient']
        print("Recipient:", recipient)
        if type == 'application':
            validated_data['application'] = get_object_or_404(Application, pk=pk)
            if str(validated_data['application'].shelter) != str(recipient):
                raise serializers.ValidationError(
                    "You can only create notifications for your own applications."
                )
               
            if str(validated_data['application'].shelter) != str(self.context['request'].user) and str(validated_data['application'].applicant) != str(self.context['request'].user):
                raise serializers.ValidationError(
                    "You can only create notifications for your own applications."
                )
        elif type == 'comment_on_shelter':
            validated_data['comment_on_shelter'] = get_object_or_404(CommentOnShelter, pk=pk)  
            if str(validated_data['comment_on_shelter'].pet_shelter) != str(self.context['request'].user) and str(validated_data['comment_on_shelter'].commenter) != str(self.context['request'].user):
                raise serializers.ValidationError(
                    "You can only create notifications for your own comments."
                )
        elif type == 'comment_on_application':
            validated_data['comment_on_application'] = get_object_or_404(CommentOnApplication, pk=pk)
            print(str(validated_data['comment_on_application'].application.shelter))
            print(str(self.context['request'].user))
            if str(validated_data['comment_on_application'].application.shelter) != str(self.context['request'].user) and str(validated_data['comment_on_application'].application.applicant) != str(self.context['request'].user):
                raise serializers.ValidationError(
                    "You can only create notifications for your own comments."
                )
            
        return super().create(validated_data)