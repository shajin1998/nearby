from django.db import models
import random
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)  
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Category Request from {self.name}"
    

    
class HoursPay(models.Model):
    id = models.AutoField(primary_key=True)
    hours = models.PositiveIntegerField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.hours} hrs - ₹{self.amount}"

    

class PaymentMode(models.Model):
    mode = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.mode

from django.db import models

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('delivery_partner', 'Delivery Partner'),
        ('business', 'Business'),
        ('store_owner', 'Store Owner'),
    ]

    id = models.AutoField(primary_key=True)
    # Profile Info
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="user")
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15)
    website = models.URLField(null=True, blank=True)

    # KYC & Verification
    pan_verified = models.BooleanField(default=False)
    fssai_license = models.CharField(max_length=50, null=True, blank=True)
    gst_number = models.CharField(max_length=50, null=True, blank=True)

    # Preferences
    notifications_enabled = models.BooleanField(default=True)
    theme_preference = models.CharField(max_length=10, choices=[("light", "Light"), ("dark", "Dark")], default="light")

    # Store Details
    store_name = models.CharField(max_length=150, null=True, blank=True)
    store_address = models.TextField(null=True, blank=True)
    store_id = models.CharField(max_length=50, null=True, blank=True)
    opened_on = models.DateField(null=True, blank=True)
    store_timings = models.CharField(max_length=100, null=True, blank=True)
    support_contact = models.CharField(max_length=15, null=True, blank=True)

    # Status & Operations
    store_status = models.CharField(max_length=20, choices=[("active", "Active"), ("inactive", "Inactive")], default="active")
    account_number_last4 = models.CharField(max_length=4, null=True, blank=True)
    payout_cycle = models.CharField(max_length=20, choices=[("weekly", "Weekly"), ("monthly", "Monthly")], default="weekly")

    def __str__(self):
        return self.name


class DailyEarning(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    date_of_earning = models.DateField()
    earning = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  

    def __str__(self):
        return f"{self.user.name} - {self.date_of_earning} - ₹{self.earning}"


    
class ProductCategory(models.Model): 
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Offer(models.Model):
    offer_name = models.TextField(unique=True)
    offer_percentage = models.TextField(blank=True,null=True)
    offer_amount = models.IntegerField(null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='offers')
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='offers')

    def __str__(self):
        return self.offer_name
 

class DeliveryOTP(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    otp = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.otp}"