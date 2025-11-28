from django.db import models
from datetime import datetime, timedelta, time
from django.utils import timezone

# Create your models here.



class Driver(models.Model):
    name = models.TextField()
    plate = models.TextField()
    vehicleType = models.TextField()
    document = models.TextField()
    telephone = models.TextField()


class Notes(models.Model):
    noteNumber = models.CharField(max_length=256)


class Provider(models.Model):
    providerName = models.CharField(max_length=1024)
    hour = models.DateTimeField()
    quantity = models.IntegerField()
    isConfirmedByHeritage = models.BooleanField(default=False)
    isConfirmedByCPD = models.BooleanField(default=False)
    isConfirmedByArbitrator = models.BooleanField(default=False)
    loadType = models.TextField()
    volumeType = models.TextField()
    isChecked = models.BooleanField(default=False)
    isReturned = models.BooleanField(default=False)
    isSchedule = models.BooleanField(default=False)
    createAt = models.DateTimeField(default=timezone.now, blank=True)
    idNotes = models.ForeignKey(Notes, on_delete=models.CASCADE)
    idDriver = models.ForeignKey(Driver, on_delete=models.CASCADE)


    class Meta:
        ordering = ['hour']

    def __str__(self):
        return self.providerName


