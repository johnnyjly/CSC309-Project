from django.db import models
from django.conf import settings
from accounts.models.models import MyUser



# Create your models here.
class Notification(models.Model):
  message = models.TextField()
  creation_time = models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default=False)
  recipient = models.ForeignKey(MyUser, on_delete=models.CASCADE)

  def __str__(self) -> str:
    return f"{self.recipient.username}: {self.message}, created at {self.creation_time}"