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
from django.core.mail import send_mail
from .models import DeliveryOTP, UserProfile
from .serializers import DeliveryOTPSerializer
import random
from .models import DeliveryOTP, UserProfile
from decimal import Decimal
from datetime import datetime

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
    

class GenerateOTPAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        role = request.data.get('role')

        if not email or not role:
            return Response({'error': 'Email and role are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserProfile.objects.get(email=email, role=role)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        
        DeliveryOTP.objects.filter(user=user, is_verified=False).delete()

        
        otp_value = random.randint(100000, 999999)
        otp = DeliveryOTP.objects.create(user=user, otp=otp_value)

        serializer = DeliveryOTPSerializer(otp)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class VerifyOTPAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        role = request.data.get('role')
        otp_value = request.data.get('otp')

        if not email or not role or not otp_value:
            return Response({'error': 'Email, role, and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp_value = int(otp_value)
        except ValueError:
            return Response({'error': 'OTP must be a number.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserProfile.objects.get(email=email, role=role)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        qs = UserProfile.objects.filter(email=email, otp=otp_value, is_verified=False)
        if not qs.exists():
            return Response({'error': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
        

class SaveDailyEarningAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        role = request.data.get('role')
        date = request.data.get('date')
        hours_worked = request.data.get('hours_worked')

        
        if not all([email, role, date, hours_worked]):
            return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

        
        try:
            user = UserProfile.objects.get(email=email, role=role)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

       
        if not user.hours_pay or not user.hours_pay.amount:
            return Response({'error': 'Hourly pay not found for user'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hourly_amount = Decimal(user.hours_pay.amount)
            hours = Decimal(hours_worked)
        except:
            return Response({'error': 'Invalid amount or hours'}, status=status.HTTP_400_BAD_REQUEST)

        
        total_earning = hourly_amount * hours

       
        daily_earning = DailyEarning.objects.create(
            user=user,
            date_of_earning=date,
            earning=total_earning
        )

        return Response({
            'message': 'Daily earning saved',
            'user': user.name,
            'date': date,
            'hours_worked': float(hours),
            'hourly_rate': float(hourly_amount),
            'total_earning': float(total_earning)
        }, status=status.HTTP_201_CREATED)       


from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from .models import UserProfile, DailyEarning


class SaveDailyEarningAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        role = request.data.get('role')
        date = request.data.get('date')
        hours_worked = request.data.get('hours_worked')

        if not all([email, role, date, hours_worked]):
            return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserProfile.objects.get(email=email, role=role)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if not user.hours_pay or not user.hours_pay.amount:
            return Response({'error': 'Hourly pay not found for user'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hourly_amount = Decimal(user.hours_pay.amount)
            hours = Decimal(hours_worked)
        except:
            return Response({'error': 'Invalid amount or hours'}, status=status.HTTP_400_BAD_REQUEST)

        total_earning = hourly_amount * hours

        DailyEarning.objects.create(
            user=user,
            date_of_earning=date,
            earning=total_earning
        )

        return Response({
            'message': 'Daily earning saved',
            'user': user.name,
            'date': date,
            'hours_worked': float(hours),
            'hourly_rate': float(hourly_amount),
            'total_earning': float(total_earning)
        }, status=status.HTTP_201_CREATED)


class GetDailyEarningsAPIView(APIView):
    def get(self, request):
        name = request.GET.get('name')
        email = request.GET.get('email')
        role = request.GET.get('role')
        hourly_pay = request.GET.get('hourly_pay')
        date = request.GET.get('date')

        filters = {}

        if name:
            filters['user__name'] = name
        if email:
            filters['user__email__icontains'] = email.strip()
        if role:
            filters['user__role__iexact'] = role.strip()
        if hourly_pay:
            try:
                hourly_pay_value = float(hourly_pay)
                filters['user__hours_pay__amount'] = hourly_pay_value
            except ValueError:
                return Response({"error": "Invalid hourly_pay value."}, status=status.HTTP_400_BAD_REQUEST)
        if date:
            try:
                parsed_date = datetime.strptime(date.strip(), "%Y-%m-%d").date()
                filters['date_of_earning'] = parsed_date
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        print('filters...',filters)
        earnings_qs = DailyEarning.objects.filter(**filters).select_related('user', 'user__hours_pay')

        if not earnings_qs.exists():
            return Response({"error": "No matching records found."}, status=status.HTTP_404_NOT_FOUND)

        total_earning_sum = earnings_qs.aggregate(total=Sum('earning'))['total'] or 0

        records = [{
            "name": e.user.name,
            "email": e.user.email,
            "hourly_pay": float(e.user.hours_pay.amount) if e.user.hours_pay else None,
            "daily_earning": float(e.earning),
            "date_of_earning": str(e.date_of_earning),
            "role": e.user.role
        } for e in earnings_qs]

        return Response({
            "total_earning": float(total_earning_sum),
            "records": records
        }, status=status.HTTP_200_OK)