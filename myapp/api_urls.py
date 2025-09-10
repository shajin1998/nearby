from django.urls import path
from .views import CategoryAPIView
from .views import UserProfileAPIView
from .views import OfferAPIView
from .views import DailyEarningAPIView
from .views import GenerateOTPAPIView, VerifyOTPAPIView
from .views import SaveDailyEarningAPIView,GetDailyEarningsAPIView
from .views import ProfileAPIView

urlpatterns = [
    path('categories/', CategoryAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryAPIView.as_view(), name='category-update-delete'),
    path('profiles/', UserProfileAPIView.as_view(), name='userprofile-list-create'),
    path('profiles/<int:pk>/', UserProfileAPIView.as_view(), name='userprofile-update-delete'),
    path('offers/', OfferAPIView.as_view()),          
    path('offers/<int:pk>/', OfferAPIView.as_view()), 
    path('daily-earning/', DailyEarningAPIView.as_view()),            
    path('daily-earning/<int:pk>/', DailyEarningAPIView.as_view()),
    path('delivery-partner/generate-otp/', GenerateOTPAPIView.as_view(), name='generate-otp'),
    path('delivery-partner/verify-otp/', VerifyOTPAPIView.as_view(), name='verify-otp'),
    path('save-daily-earning/', SaveDailyEarningAPIView.as_view(), name='save-daily-earning'),
    path('earnings/',GetDailyEarningsAPIView.as_view(), name='get-daily-earnings'),
    path("profiles/", ProfileAPIView.as_view(), name="profile-list"),
    path("profiles/<int:pk>/", ProfileAPIView.as_view(), name="profile-detail"),
    
]
