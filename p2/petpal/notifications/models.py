from django.db import models
from django.conf import settings
from accounts.models.models import MyUser
from comments.models import Comment
from applications.models import Application

# Create your models here.
class Notification(models.Model):
  message = models.TextField()
  creation_time = models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default=False)
  recipient = models.ForeignKey(MyUser, on_delete=models.CASCADE)

  application = models.ForeignKey('applications.Application', on_delete=models.CASCADE, null=True, blank=True)
  comment_on_shelter = models.ForeignKey('comments.CommentOnShelter', on_delete=models.CASCADE, null=True, blank=True)
  comment_on_application = models.ForeignKey('comments.CommentOnApplication', on_delete=models.CASCADE, null=True, blank=True)
  # comment = models.ForeignKey('comments.Comment', on_delete=models.CASCADE, null=True, blank=True)

  def __str__(self) -> str:
    return f"{self.recipient.username}: {self.message}, created at {self.creation_time}, {self.application}, {self.comment_on_shelter}, {self.comment_on_application}"