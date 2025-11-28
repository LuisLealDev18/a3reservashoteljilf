from django.contrib import admin
from .models import Provider, Driver, Notes


# class ProviderAdmin(admin.ModelAdmin):
#     list_display = ['createAt']

admin.site.register(Provider)
admin.site.register(Driver)
admin.site.register(Notes)
