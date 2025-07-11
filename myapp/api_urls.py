from django.urls import path
from .views import CategoryAPIView
from .views import UserProfileAPIView
from .views import OfferAPIView
from .views import DailyEarningAPIView

urlpatterns = [
    path('categories/', CategoryAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryAPIView.as_view(), name='category-update-delete'),
    path('profiles/', UserProfileAPIView.as_view(), name='userprofile-list-create'),
    path('profiles/<int:pk>/', UserProfileAPIView.as_view(), name='userprofile-update-delete'),
    path('offers/', OfferAPIView.as_view()),          
    path('offers/<int:pk>/', OfferAPIView.as_view()), 
    path('daily-earning/', DailyEarningAPIView.as_view()),            
    path('daily-earning/<int:pk>/', DailyEarningAPIView.as_view()),
]
