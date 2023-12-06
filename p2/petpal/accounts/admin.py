from django.contrib import admin
from .models import MyUser, PetSeeker, PetShelter
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(MyUser, UserAdmin)
admin.site.register(PetSeeker)
admin.site.register(PetShelter)
