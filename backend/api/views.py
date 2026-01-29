from django.shortcuts import render
from django.http import JsonResponse
from .models import Product

def product_list(request):
    products = Product.objects.all().values(
        'id', 'name', 'description', 'price', 
        'category', 'image_url', 'stock', 
        'is_active', 'created_at',
        'original_price', 'subcategory', 'tag',
        'rating', 'reviews_count', 'colors',
        'sizes', 'features'
    )
    products_list = list(products)
    response = JsonResponse({'products': products_list})
    response["Access-Control-Allow-Origin"] = "*"
    return response
