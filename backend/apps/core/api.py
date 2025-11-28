from rest_framework import status, viewsets, generics, mixins
from rest_framework.response import Response

from .models import Provider, Notes, Driver
from .serializers import (ProviderSerializer, DriverSerializer, NotesSerializer,
                            AllSerializer, ProviderExcludeSerializer, ProviderFilterDateSerializer,
                            ProviderFilterScheduleSerializer)


from datetime import datetime, timedelta, time



class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = AllSerializer
    http_method_names = ['post', 'head', 'options']


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        driver = Driver(**serializer.data["driver"])
        driver.save()

        notes = Notes(**serializer.data["notes"])
        notes.save()

        provider = Provider(**serializer.data["provider"], idNotes=notes, idDriver=driver)
        provider.save()


        headers = self.get_success_headers(serializer.data)
        
        # sobreescrever para as infos cadastradas não retornem
        return Response({}, status=status.HTTP_201_CREATED, headers=headers)
    


# class ProviderGetViewSet(viewsets.ModelViewSet):
#     queryset = Provider.objects.all()
#     serializer_class = ProviderSerializer
#     http_method_names = ['get', 'head', 'options']

#     def list(self, request, *args, **kwargs):
#         queryset = self.filter_queryset(self.get_queryset())

#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             return self.get_paginated_response(serializer.data)

#         serializer = self.get_serializer(queryset, many=True)
#         return Response({})


class ProviderListAPI(generics.GenericAPIView):
    serializer_class = ProviderSerializer
    queryset = Provider

    def get(self, request, *args, **kwargs):
        lista = []
        # idNotes
        # idDriver
        for p in Provider.objects.all():
            d = Driver.objects.get(id=p.idDriver.id)
            n = Notes.objects.get(id=p.idNotes.id)
            driver = DriverSerializer(d)
            notes = NotesSerializer(n)
            dicF = {
                "id": p.id,
                "providerName": p.providerName,
                "hour": p.hour,
                "quantity": p.quantity,
                "isConfirmedByHeritage": p.isConfirmedByHeritage,
                "isConfirmedByCPD": p.isConfirmedByCPD,
                "isConfirmedByArbitrator": p.isConfirmedByArbitrator,
                "loadType": p.loadType,
                "volumeType": p.volumeType,
                "isChecked": p.isChecked,
                "isReturned": p.isReturned,
                "isSchedule": p.isSchedule,
                "createAt": p.createAt,
                "notes": notes.data,
                "driver": driver.data
            }
            lista.append(dicF)


        return Response(lista)



class ProviderUpdateAPI(generics.GenericAPIView):
    serializer_class = AllSerializer
    queryset = Provider

    def put(self, request, *args, **kwargs):
        try:
            p = Provider.objects.get(pk=kwargs["pk"])    
        except:
            return Response({"Error": "Id is invalid"}, status=status.HTTP_400_BAD_REQUEST)        


        p.providerName = request.data["provider"]["providerName"]
        p.hour = request.data["provider"]["hour"]
        p.quantity = request.data["provider"]["quantity"]
        p.isConfirmedByHeritage = request.data["provider"]["isConfirmedByHeritage"]
        p.isConfirmedByCPD = request.data["provider"]["isConfirmedByCPD"]
        p.isConfirmedByArbitrator = request.data["provider"]["isConfirmedByArbitrator"]
        p.loadType = request.data["provider"]["loadType"]
        p.volumeType = request.data["provider"]["volumeType"]
        p.isChecked = request.data["provider"]["isChecked"]
        p.isReturned = request.data["provider"]["isReturned"]
        p.isSchedule = request.data["provider"]["isSchedule"]

        d = Driver.objects.get(pk=p.idDriver.pk)
        n = Notes.objects.get(pk=p.idNotes.pk)

        d.name = request.data["driver"]["name"]
        d.plate = request.data["driver"]["plate"]
        d.vehicleType = request.data["driver"]["vehicleType"]
        d.document = request.data["driver"]["document"]
        d.telephone = request.data["driver"]["telephone"]

        n.noteNumber = request.data["notes"]["noteNumber"]


        try:
            p.save()
        except:
            return Response({"Error": "Error in Update table provider"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            d.save()
        except:
            return Response({"Error": "Error in Update table driver"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            n.save()
        except:
            return Response({"Error": "Error in Update table notes"}, status=status.HTTP_400_BAD_REQUEST)


        return Response(ProviderExcludeSerializer(p).data, status=status.HTTP_200_OK)



class ProviderDeleteAPI(generics.GenericAPIView):
    serializer_class = ProviderSerializer
    queryset = Provider

    def delete(self, request, *args, **kwargs):
        try:
            p = Provider.objects.get(id=kwargs["pk"])
        except:
            return Response({"Error": "Id is invalid"}, status=status.HTTP_400_BAD_REQUEST)

    
        d = Driver.objects.get(id=p.idDriver.id)
        n = Notes.objects.get(id=p.idNotes.id)

        n.delete()
        d.delete()
        p.delete()        

        return Response({}, status=status.HTTP_200_OK)



class ProviderFilterDateAPI(generics.GenericAPIView):
    serializer_class = ProviderFilterDateSerializer
    queryset = Provider

    def post(self, request, *args, **kwargs):
        serializer = ProviderFilterDateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        lista = []

        # startTime >= createAt && endTime <= createAt

         
        # posted__gte=start_dt, posted__lt=end_dt

        
        for p in Provider.objects.all().filter(hour__gt=request.data['startTime'], hour__lt=request.data["endTime"]):
            d = Driver.objects.get(id=p.idDriver.id)
            n = Notes.objects.get(id=p.idNotes.id)

            driver = DriverSerializer(d)
            notes = NotesSerializer(n)


            dicF = {
                "id": p.id,
                "providerName": p.providerName,
                "hour": p.hour,
                "quantity": p.quantity,
                "isConfirmedByHeritage": p.isConfirmedByHeritage,
                "isConfirmedByCPD": p.isConfirmedByCPD,
                "isConfirmedByArbitrator": p.isConfirmedByArbitrator,
                "loadType": p.loadType,
                "volumeType": p.volumeType,
                "isChecked": p.isChecked,
                "isReturned": p.isReturned,
                "isSchedule": p.isSchedule,
                "createAt": p.createAt,
                "notes": notes.data,
                "driver": driver.data
            }

            lista.append(dicF)


        return Response(lista, status=status.HTTP_200_OK)



class ProviderScheduleDateAPI(generics.GenericAPIView):
    serializer_class = ProviderFilterScheduleSerializer
    queryset = Provider

    def post(self, request, *args, **kwargs):
        serializer = ProviderFilterScheduleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        lista = []
 

        for p in Provider.objects.all().filter(hour__gt=request.data['startTime'], hour__lt=request.data["endTime"], isSchedule=request.data["isSchedule"]):
            d = Driver.objects.get(id=p.idDriver.id)
            n = Notes.objects.get(id=p.idNotes.id)

            driver = DriverSerializer(d)
            notes = NotesSerializer(n)


            dicF = {
                "id": p.id,
                "providerName": p.providerName,
                "hour": p.hour,
                "quantity": p.quantity,
                "isConfirmedByHeritage": p.isConfirmedByHeritage,
                "isConfirmedByCPD": p.isConfirmedByCPD,
                "isConfirmedByArbitrator": p.isConfirmedByArbitrator,
                "loadType": p.loadType,
                "volumeType": p.volumeType,
                "isChecked": p.isChecked,
                "isReturned": p.isReturned,
                "isSchedule": p.isSchedule,
                "createAt": p.createAt,
                "notes": notes.data,
                "driver": driver.data
            }

            lista.append(dicF)


        return Response(lista, status=status.HTTP_200_OK)


class ProviderSchedulePeriodAPI(generics.GenericAPIView):
    serializer_class = ProviderFilterDateSerializer
    queryset = Provider

    def post(self, request, *args, **kwargs):
        serializer = ProviderFilterDateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        lista = []
 

        for p in Provider.objects.all().filter(hour__gt=request.data['startTime'], hour__lt=request.data["endTime"]):
            d = Driver.objects.get(id=p.idDriver.id)
            n = Notes.objects.get(id=p.idNotes.id)


            if timedelta(hours=p.hour.hour) >= timedelta(hours=12):

                driver = DriverSerializer(d)
                notes = NotesSerializer(n)


                dicF = {
                    "id": p.id,
                    "providerName": p.providerName,
                    "hour": p.hour,
                    "quantity": p.quantity,
                    "isConfirmedByHeritage": p.isConfirmedByHeritage,
                    "isConfirmedByCPD": p.isConfirmedByCPD,
                    "isConfirmedByArbitrator": p.isConfirmedByArbitrator,
                    "loadType": p.loadType,
                    "volumeType": p.volumeType,
                    "isChecked": p.isChecked,
                    "isReturned": p.isReturned,
                    "isSchedule": p.isSchedule,
                    "createAt": p.createAt,
                    "notes": notes.data,
                    "driver": driver.data
                }

                lista.append(dicF)


        return Response(lista, status=status.HTTP_200_OK)
