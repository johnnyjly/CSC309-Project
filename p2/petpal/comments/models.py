from django.db import models
from accounts.models.models import MyUser, PetShelter
from applications.models import Application

# Create your models here.


class Comment(models.Model):
    ID = models.AutoField(primary_key=True)
    content = models.TextField(blank=False)
    commenter = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False)
    creation_time = models.DateTimeField(blank=False)

    class Meta:
        abstract = True


class CommentOnShelter(Comment):
    pet_shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE, blank=False, related_name='pet_shelter')
    reply = models.ForeignKey("CommentOnShelter", on_delete=models.CASCADE, null=True)


class CommentOnApplication(Comment):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, blank=False)
    reply = models.ForeignKey("CommentOnApplication", on_delete=models.CASCADE, null=True)
