from django.contrib import admin
from .models import *
from django_summernote.admin import SummernoteModelAdmin



# Register your models here.
admin.site.register(Team),
admin.site.register(Project)


class ProServiceAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'
admin.site.register(ProService, ProServiceAdmin)


class ProServicePackageAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'
admin.site.register(ProServicePackage, ProServicePackageAdmin)