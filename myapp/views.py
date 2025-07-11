from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category, UserProfile
from .serializers import CategorySerializer, UserProfileSerializer
from .models import Offer
from .serializers import OfferSerializer
from django.db import IntegrityError
from .models import DailyEarning
from .serializers import DailyEarningSerializer

class CategoryAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                category = Category.objects.get(pk=pk)
                serializer = CategorySerializer(category)
                return Response(serializer.data)
            except Category.DoesNotExist:
                return Response({'detail': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data)

    def post(self, request):
        name = request.data.get('name')

        if Category.objects.filter(name__iexact=name).exists():
            return Response(
                {"name": ["Category with this name already exists."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        if not pk:
            return Response({'detail': 'ID is required for update.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'detail': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)

        new_name = request.data.get('name')
        if new_name and Category.objects.filter(name__iexact=new_name).exclude(pk=pk).exists():
            return Response(
                {"name": ["Another category with this name already exists."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not pk:
            return Response({'detail': 'ID is required for deletion.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            category = Category.objects.get(pk=pk)
            category.delete()
            return Response({'detail': 'Category deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({'detail': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)



class UserProfileAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                profile = UserProfile.objects.get(pk=pk)
                serializer = UserProfileSerializer(profile)
                return Response(serializer.data)
            except UserProfile.DoesNotExist:
                return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            profiles = UserProfile.objects.all()
            serializer = UserProfileSerializer(profiles, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        if not pk:
            return Response({'detail': 'ID is required for update.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not pk:
            return Response({'detail': 'ID is required for deletion.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = UserProfile.objects.get(pk=pk)
            profile.delete()
            return Response({'detail': 'UserProfile deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)


class OfferAPIView(APIView):

    def get(self, request, pk=None):
        if pk:
            try:
                offer = Offer.objects.get(pk=pk)
                serializer = OfferSerializer(offer)
                return Response(serializer.data)
            except Offer.DoesNotExist:
                return Response({"error": "Offer not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            offers = Offer.objects.all()
            serializer = OfferSerializer(offers, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({"error": "Offer name already exists."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
            try:
                offer = Offer.objects.get(pk=pk)
            except Offer.DoesNotExist:
                return Response({"error": "Offer not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = OfferSerializer(offer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        try:
            offer = Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            return Response({"error": "Offer not found"}, status=status.HTTP_404_NOT_FOUND)

        offer.delete()
        return Response({"message": "Offer deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class DailyEarningAPIView(APIView):

    def get(self, request, pk=None):
        if pk:
            try:
                earning = DailyEarning.objects.get(pk=pk)
                serializer = DailyEarningSerializer(earning)
                return Response(serializer.data)
            except DailyEarning.DoesNotExist:
                return Response({"error": "DailyEarning not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            earnings = DailyEarning.objects.all()
            serializer = DailyEarningSerializer(earnings, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = DailyEarningSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            earning = DailyEarning.objects.get(pk=pk)
        except DailyEarning.DoesNotExist:
            return Response({"error": "DailyEarning not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = DailyEarningSerializer(earning, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            earning = DailyEarning.objects.get(pk=pk)
        except DailyEarning.DoesNotExist:
            return Response({"error": "DailyEarning not found"}, status=status.HTTP_404_NOT_FOUND)

        earning.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)