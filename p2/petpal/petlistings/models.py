from django.db import models
from accounts.models import PetShelter

# Create your models here.

class Pet(models.Model):
  STATUS_CHOICES = (
      ('available', 'Available'),
      ('pending', 'Pending'),
      ('withdrawn', 'Withdrawn'),
      ('adopted', 'Adopted')
  )
  
  name = models.CharField(max_length=100, unique=True)
  age = models.IntegerField()
  breed = models.CharField(max_length=100)
  gender = models.CharField(max_length=100)
  description = models.TextField()
  publication_date = models.DateTimeField(auto_now_add=True)
  color = models.CharField(max_length=100)
  size = models.CharField(max_length=100)
  image = models.ImageField(upload_to='images/', blank=True, null=True)
  status = models.CharField(max_length=10, choices=STATUS_CHOICES)
  shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE)
  
  def __str__(self) -> str:
    return f"{self.name}, {self.age} years old, {self.breed}, Status: {self.status}"