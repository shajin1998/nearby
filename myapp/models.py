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

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('delivery_partner', 'Delivery Partner'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.JSONField(blank=True,null=True)
    account_details = models.JSONField(blank=True,null=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=100,default="")
    otp = models.IntegerField ()
    is_verified = models.BooleanField(default=False)
    attendence = models.JSONField(blank=True,null=True)
    hours_pay = models.ForeignKey(HoursPay, on_delete=models.SET_NULL, null=True, blank=True)
    payment_mode = models.ForeignKey(PaymentMode, on_delete=models.SET_NULL, null=True)


    def _str_(self):
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