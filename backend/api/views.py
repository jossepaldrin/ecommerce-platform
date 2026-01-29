from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
import json
from .models import Product, Cart, CartItem

def product_list(request):
    products = Product.objects.all()
    products_list = []
    for p in products:
        products_list.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'category': p.category,
            'image_url': p.image.url if p.image else p.image_url,
            'stock': p.stock,
            'is_active': p.is_active,
            'created_at': p.created_at,
            'original_price': p.original_price,
            'subcategory': p.subcategory,
            'tag': p.tag,
            'rating': p.rating,
            'reviews_count': p.reviews_count,
            'colors': p.colors,
            'sizes': p.sizes,
            'features': p.features
        })
    return JsonResponse({'products': products_list})

@csrf_exempt
def cart_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    if request.method == 'GET':
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = cart.items.all().select_related('product')
        cart_data = []
        for item in items:
            cart_data.append({
                'product_id': item.product.id,
                'name': item.product.name,
                'price': item.product.price,
                'image_url': item.product.image.url if item.product.image else item.product.image_url,
                'quantity': item.quantity,
            })
        return JsonResponse({'cart': cart_data})

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')
            action = data.get('action', 'add') # add, remove, update
            quantity = int(data.get('quantity', 1))

            product = Product.objects.get(id=product_id)
            cart, _ = Cart.objects.get_or_create(user=request.user)

            if action == 'add':
                cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'price': product.price})
                if not created:
                    cart_item.quantity += quantity
                    cart_item.save()
            elif action == 'remove':
                CartItem.objects.filter(cart=cart, product=product).delete()
            elif action == 'update':
                 cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'price': product.price})
                 cart_item.quantity = quantity
                 if cart_item.quantity <= 0:
                     cart_item.delete()
                 else:
                     cart_item.save()
            
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'status': 'success', 'username': user.username})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email', '')
            
            if User.objects.filter(username=username).exists():
                 return JsonResponse({'error': 'Username already exists'}, status=400)
            
            user = User.objects.create_user(username=username, password=password, email=email)
            login(request, user)
            return JsonResponse({'status': 'success', 'username': user.username})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'logged out'})

def auth_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_authenticated': True, 'username': request.user.username})
    return JsonResponse({'is_authenticated': False})
    response["Access-Control-Allow-Origin"] = "*"
    return response
