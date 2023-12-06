#!/bin/bash

# create and activate virtual environment
virtualenv -p /usr/bin/python3 venv
source venv/bin/activate

# intall django and other dependencies
pip install --upgrade pip
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install --upgrade Pillow
pip install django-cors-headers

# migrate database
python3 petpal/manage.py makemigrations
python3 petpal/manage.py migrate
