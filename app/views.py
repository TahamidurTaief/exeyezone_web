from django.shortcuts import render, HttpResponse
from .models import *


# Create your views here.
def home(request):
    teams = Team.objects.all()
    projects = Project.objects.all()
    ProPackage = ProServicePackage.objects.all()
    proService = ProService.objects.all()[:3]

    context = {
        'teams': teams,
        'projects': projects,
        'ProPackage': ProPackage,
        'proService': proService
        }
    return render(request, 'index.html', context)



def Services(request):
    return render(request, 'services.html')


def ProServices(request, id):
    proService = ProService.objects.get(id=id)
    allProServices = ProService.objects.all()
    proServicePackages = ProServicePackage.objects.filter(proService=proService)


    images1 = proService.images1.url
    images2 = proService.images2.url
    images3 = proService.images3.url
    title = proService.title
    desc = proService.desc
    rating = proService.rating
    process = proService.process
    developer = proService.developer.image.url
    developer_desc = proService.developer.desc
    you_get = proService.you_get
    deliveryTime = proService.deliveryTime
    revision = proService.revision
    price = proService.price



    # proServicePackages
    basic_title = proServicePackages[0].basic_title
    basic_desc = proServicePackages[0].basic_desc
    basic_price = proServicePackages[0].basic_price
    basic_delivery_time = proServicePackages[0].basic_delivery_time
    basic_revision = proServicePackages[0].basic_revision

    standard_title = proServicePackages[0].standard_title
    standard_desc = proServicePackages[0].standard_desc
    standard_price = proServicePackages[0].standard_price
    standard_delivery_time = proServicePackages[0].standard_delivery_time
    standard_revision = proServicePackages[0].standard_revision

    premium_title = proServicePackages[0].premium_title
    premium_desc = proServicePackages[0].premium_desc
    premium_price = proServicePackages[0].premium_price
    premium_delivery_time = proServicePackages[0].premium_delivery_time
    premium_revision = proServicePackages[0].premium_revision



    context = {
        'proService': proService,
        'allProServices': allProServices,
        'proServicePackages': proServicePackages,

        'images1': images1,
        'images2': images2,
        'images3': images3,
        'title': title,
        'desc': desc,
        'rating': rating,
        'process': process,
        'developer': developer,
        'you_get': you_get,
        'deliveryTime': deliveryTime,
        'developer_desc': developer_desc,
        'revision': revision,
        'price': price,

        # proServicePackages
        'basic_title': basic_title,
        'basic_desc': basic_desc,
        'basic_price': basic_price,
        'basic_delivery_time': basic_delivery_time,
        'basic_revision': basic_revision,

        'standard_title': standard_title,
        'standard_desc': standard_desc,
        'standard_price': standard_price,
        'standard_delivery_time': standard_delivery_time,
        'standard_revision': standard_revision,

        'premium_title': premium_title,
        'premium_desc': premium_desc,
        'premium_price': premium_price,
        'premium_delivery_time': premium_delivery_time,
        'premium_revision': premium_revision




    }
    return render(request, 'proservices.html', context)



def allProServices(request):
    proService = ProService.objects.all()
    context = {
        'proService': proService
    }
    return render(request, 'allproservices.html', context)