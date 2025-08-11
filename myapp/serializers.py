from rest_framework import serializers
from .models import Category, UserProfile  
from .models import Offer
from .models import DailyEarning
from .models import DeliveryOTP

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category  
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class OfferSerializer(serializers.ModelSerializer):
    offer_amount = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = Offer
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)

        
        if data.get('offer_amount') == '':
            data['offer_amount'] = None

        return data


class DailyEarningSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyEarning
        fields = '__all__'

class DeliveryOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryOTP
        fields = ['id', 'user_id', 'otp', 'created_at', 'is_verified']
        read_only_fields = ['otp', 'created_at', 'is_verified']        