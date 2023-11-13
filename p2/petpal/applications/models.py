from django.db import models
from accounts.models.models import PetShelter, PetSeeker
from petlistings.models import Pet

# Create your models here.

class Application(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    ID = models.AutoField(primary_key=True)
    shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE)
    applicant = models.ForeignKey(PetSeeker, on_delete=models.CASCADE)
    self_desc = models.TextField()
    exp_pets = models.TextField()
    diff_owners = models.TextField()
    food_check = models.BooleanField()
    water_check = models.BooleanField()
    shelter_check = models.BooleanField()
    animal = models.ForeignKey(Pet, on_delete=models.CASCADE, limit_choices_to={'status': 'available'})
    update_time = models.DateTimeField(auto_now=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Application ID: {self.ID} - Status: {self.status}"