from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from accounts.models.models import MyUser, PetShelter
from applications.models import Application
from blogs.models import BlogPost

# Create your models here.


class Comment(models.Model):
    ID = models.AutoField(primary_key=True)
    content = models.TextField(blank=False)
    commenter = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False)
    commenter_name = models.CharField(max_length=255, blank=True, null=True)
    creation_time = models.DateTimeField(blank=False)

    class Meta:
        abstract = True


class CommentOnShelter(Comment):
    pet_shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE, blank=False, related_name='pet_shelter')
    pet_shelter_name = models.CharField(max_length=255, blank=True, null=True)
    rating = models.IntegerField(blank=False, validators=[MinValueValidator(1), MaxValueValidator(5)])


class CommentOnApplication(Comment):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, blank=False)
    pet_seeker_name = models.CharField(max_length=255, blank=True, null=True)
    pet_shelter_name = models.CharField(max_length=255, blank=True, null=True)


class CommentOnBlogPost(Comment):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, blank=False)
