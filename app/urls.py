from django.urls import path, include
from . import views as av
from django.conf.urls.static import static  
from django.conf import settings  

urlpatterns = [
    path('', av.home, name='index'),
    path('/services', av.Services, name='services'),
    path('/proservice/<str:id>', av.ProServices, name='proServices'),
    path('/allproservice', av.allProServices, name='allProServices'),

]
if settings.DEBUG:  
        urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)  