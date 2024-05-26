
from django.db import models
import uuid
# from django_summernote.fields import SummernoteTextField



class Team(models.Model):
    image = models.ImageField(upload_to='team_images/', default='media/team_load.jpg')
    name = models.CharField(max_length=100, default='No Name')
    expert = models.CharField(max_length=100, default='No Expert')
    desc = models.TextField(default='No Description', null=True, blank=True)
    protfolio = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name
    


class Project(models.Model):
    image = models.ImageField(upload_to='project_images/', default='media/project_load.jpg', null=True, blank=True)
    name = models.CharField(max_length=100)
    desc = models.TextField()
    rating = models.FloatField()
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    project_link = models.URLField()

    def __str__(self):
        return self.name




class ProService(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,  editable=False)
    images1 = models.ImageField(upload_to='proservice_images/', default='media/project_load.jpg', null=True, blank=True)
    images2 = models.ImageField(upload_to='proservice_images/', default='media/project_load.jpg', null=True, blank=True)
    images3 = models.ImageField(upload_to='proservice_images/', default='media/project_load.jpg', null=True, blank=True)
    title = models.CharField(max_length=100)
    desc = models.TextField(null=True, blank=True)
    rating = models.FloatField()
    process = models.TextField()
    developer = models.ForeignKey(Team, on_delete=models.CASCADE)
    you_get = models.TextField()
    deliveryTime = models.IntegerField()
    revision = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    def __str__(self):
        return self.title


class ProServicePackage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    proService = models.ForeignKey(ProService, on_delete=models.DO_NOTHING)
    basic_title = models.CharField(max_length=100)
    basic_desc = models.TextField()
    basic_price = models.DecimalField(max_digits=8, decimal_places=2)
    basic_delivery_time = models.IntegerField()
    basic_revision = models.IntegerField()

    standard_title = models.CharField(max_length=100)
    standard_desc = models.TextField()
    standard_price = models.DecimalField(max_digits=8, decimal_places=2)
    standard_delivery_time = models.IntegerField()
    standard_revision = models.IntegerField()

    premium_title = models.CharField(max_length=100)
    premium_desc = models.TextField()
    premium_price = models.DecimalField(max_digits=8, decimal_places=2)
    premium_delivery_time = models.IntegerField()
    premium_revision = models.IntegerField()



    def __str__(self):
        return self.basic_title
