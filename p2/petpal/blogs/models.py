from django.db import models
from accounts.models.models import PetShelter

# Create your models here.


class BlogPost(models.Model):
    ID = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    title = models.CharField(max_length=1000, blank=False)
    content = models.TextField(blank=False)
    poster = models.ForeignKey(PetShelter, on_delete=models.CASCADE, blank=False)
    creation_time = models.DateTimeField(blank=False)
    update_time = models.DateTimeField(blank=False)
