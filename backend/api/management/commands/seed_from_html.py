from django.core.management.base import BaseCommand
import os
import re
import json
import base64
from django.core.files.base import ContentFile
from api.models import Product
import subprocess

class Command(BaseCommand):
    help = 'Seeds products from combined_index.html'

    def handle(self, *args, **kwargs):
        html_file_path = r'c:\Users\New\Downloads\ecom\ecommerce-platform\src\frontend\combined_index.html'
        
        try:
            with open(html_file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Regex to find the products.js script block
            script_match = re.search(r'<script>\s*// ===== products\.js =====(.*?)</script>', content, re.DOTALL)
            
            if not script_match:
                self.stdout.write(self.style.ERROR("Could not find the products.js script block in HTML."))
                return

            js_content = script_match.group(1)
            node_script = js_content + "\n\nconsole.log(JSON.stringify(PRODUCTS));"
            
            # Write key JS to a temp file to avoid command line length limits
            temp_js_file = 'temp_products_extract.js'
            with open(temp_js_file, 'w', encoding='utf-8') as tf:
                tf.write(node_script)
            
            # Run node on the temp file
            process = subprocess.Popen(['node', temp_js_file], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            stdout, stderr = process.communicate()
            
            # Clean up temp file
            try:
                if os.path.exists(temp_js_file):
                    os.remove(temp_js_file)
            except Exception:
                pass
            
            if process.returncode != 0:
                self.stdout.write(self.style.ERROR(f"Node execution failed: {stderr}"))
                return

            products_data = json.loads(stdout)
            self.stdout.write(self.style.SUCCESS(f"Successfully extracted {len(products_data)} products."))

            # Clear existing products to ensure we get images for all
            self.stdout.write("Clearing existing products...")
            Product.objects.all().delete()

            for p_data in products_data:
                # Handle duplicates by name (if any inside the list itself)
                if Product.objects.filter(name=p_data['name']).exists():
                    self.stdout.write(f"Skipping existing product: {p_data['name']}")
                    continue

                self.stdout.write(f"Creating product: {p_data['name']}")
                
                product = Product(
                    name=p_data['name'],
                    description=p_data.get('description', ''),
                    price=p_data['price'],
                    original_price=p_data.get('originalPrice'),
                    category=p_data['category'],
                    subcategory=p_data.get('subcategory'),
                    stock=p_data.get('stock', 0),
                    tag=p_data.get('tag'),
                    is_active=p_data.get('is_active', True),
                    rating=p_data.get('rating', 0.0),
                    reviews_count=p_data.get('reviews', 0),
                    features=p_data.get('features', []),
                    colors=p_data.get('colors', []),
                    sizes=p_data.get('sizes', [])
                )

                # Handle Image
                image_url = p_data.get('image_url')
                if image_url and image_url.startswith('data:image'):
                    try:
                        format, imgstr = image_url.split(';base64,')
                        ext = format.split('/')[-1]
                        # Use simple ID-based filename to avoid length issues
                        data = ContentFile(base64.b64decode(imgstr), name=f"{p_data['id']}.{ext}")
                        product.image = data
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f"Error processing image for {p_data['name']}: {e}"))

                try:
                    product.save()
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Error saving product {p_data['name']}: {e}"))
                    
        except Exception as e:
             self.stdout.write(self.style.ERROR(f"Error running seed: {e}"))
