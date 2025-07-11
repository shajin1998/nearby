from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)  
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Category Request from {self.name}"

class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.JSONField(blank=True,null=True)
    account_details = models.JSONField(blank=True,null=True)
    email_id = models.EmailField(unique=True)
    role = models.CharField(max_length=100,default="")
    otp = models.IntegerField (max_length=20)
    

    def _str_(self):
        return self.name
    
class PaymentMode(models.Model):
    mode = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.mode


class DailyEarning(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    date_of_earning = models.DateField()
    earning = models.DecimalField(max_digits=10, decimal_places=2)
    payment_mode = models.ForeignKey(PaymentMode, on_delete=models.SET_NULL, null=True)

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
 