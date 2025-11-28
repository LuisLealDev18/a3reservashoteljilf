from rest_framework import serializers
from .models import Provider, Driver, Notes



class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'


class ProviderExcludeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        exclude = ("idNotes", "idDriver", )

class ProviderSerializer(serializers.ModelSerializer):
    driver = DriverSerializer(many=True, read_only=True)
    notes = NotesSerializer(many=True, read_only=True)
    providerExclude = ProviderExcludeSerializer()
    class Meta:
        model = Provider
        fields = ["providerExclude", "notes", "driver"]


class AllSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    notes = NotesSerializer()
    provider = ProviderExcludeSerializer()

    class Meta:
        model = Provider
        fields = ['provider', 'notes', 'driver']

class ProviderFilterDateSerializer(serializers.Serializer):
    startTime = serializers.DateTimeField()
    endTime = serializers.DateTimeField()


class ProviderFilterScheduleSerializer(serializers.Serializer):
    startTime = serializers.DateTimeField()
    endTime = serializers.DateTimeField()
    isSchedule = serializers.BooleanField()