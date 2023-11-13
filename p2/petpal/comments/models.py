from django.db import models

# Create your models here.


class Comment(models.Model):
    ID = models.AutoField(primary_key=True)
    content = models.TextField(blank=False)
    commenter = models.ForeignKey("User", on_delete=models.CASCADE, blank=False)
    reply = models.ForeignKey("Comment", on_delete=models.CASCADE, null=True)
    creation_time = models.DateTimeField(blank=False)

    class Meta:
        abstract = True


class CommentOnShelter(Comment):
    pet_shelter = models.ForeignKey("PetShelter", on_delete=models.CASCADE, blank=False)


class CommentOnApplication(Comment):
    application = models.ForeignKey("Application", on_delete=models.CASCADE, blank=False)
