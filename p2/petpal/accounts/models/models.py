from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.conf import settings


# Create your models here.
# MyUser - customized user model
class MyUser(AbstractUser):
    email = models.EmailField("Email", unique=True)
    first_name = models.CharField("First name", max_length=100)
    last_name = models.CharField("Last name", max_length=100)
    # Common fields
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format:"
        + "'+999999999'. Up to 15 digits allowed.",
    )
    phone_number = models.CharField(
        verbose_name="Phone number",
        validators=[phone_regex],
        max_length=17,
        blank=True,
    )
    address = models.CharField("Address", max_length=255, blank=True)
    city = models.CharField("City", max_length=50, blank=True)
    province = models.CharField("Province", max_length=50, blank=True)
    postal_code = models.CharField("Postal code", max_length=50, blank=True)
    user_avatar = models.ImageField(
        upload_to="account/avatar/", blank=True
    )
    receive_communications = models.BooleanField(
        "Receive communications", blank=True, null=True
    )
    receive_news = models.BooleanField("Receive news", blank=True, null=True)
    is_shelter = models.BooleanField("Is shelter", default=False)
    is_seeker = models.BooleanField("Is seeker", default=False)

    REQUIRED_FIELDS = ["email", "first_name", "last_name"]


class PetSeeker(MyUser):
    class Meta:
        verbose_name = "Pet seeker"
        verbose_name_plural = "Pet seekers"
    pass


class PetShelter(MyUser):
    class Meta:
        verbose_name = "Pet shelter"
        verbose_name_plural = "Pet shelters"
    # Shelter specific fields
    shelter_name = models.CharField("Shelter name", max_length=255, blank=True)
    shelter_avatar = models.ImageField(
        upload_to="shelter/avatar/", blank=True
    )
    location = models.CharField("Location", max_length=255, blank=True)
    mission_statement = models.TextField("Mission statement", blank=True)
