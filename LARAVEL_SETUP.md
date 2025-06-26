
# Laravel Backend Setup Guide

Untuk mengintegrasikan website ini dengan Laravel backend menggunakan MySQL, ikuti langkah-langkah berikut:

## 1. Setup Laravel Project

```bash
# Buat project Laravel baru
composer create-project laravel/laravel umkm-backend
cd umkm-backend

# Install dependencies untuk API
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

## 2. Database Configuration

Edit file `.env` di Laravel project:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=umkm_builder
DB_USERNAME=root
DB_PASSWORD=your_password
```

## 3. Create Migrations

```bash
# Migration untuk orders table
php artisan make:migration create_orders_table

# Migration untuk templates table
php artisan make:migration create_templates_table

# Migration untuk addons table
php artisan make:migration create_addons_table
```

### Orders Migration Example:
```php
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->string('domain');
    $table->string('extension');
    $table->string('template_name');
    $table->json('addons');
    $table->string('customer_name');
    $table->string('customer_email');
    $table->string('customer_phone');
    $table->decimal('total_amount', 10, 2);
    $table->string('payment_method');
    $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending');
    $table->timestamps();
});
```

## 4. Create Models & Controllers

```bash
# Create models
php artisan make:model Order -c
php artisan make:model Template -c
php artisan make:model Addon -c

# Create API controllers
php artisan make:controller Api/OrderController --api
php artisan make:controller Api/TemplateController --api
php artisan make:controller Api/DomainController
```

## 5. API Routes (routes/api.php)

```php
Route::prefix('v1')->group(function () {
    // Domain routes
    Route::post('/domains/check', [DomainController::class, 'check']);
    
    // Template routes
    Route::get('/templates', [TemplateController::class, 'index']);
    Route::get('/templates/category/{category}', [TemplateController::class, 'byCategory']);
    Route::get('/templates/popular', [TemplateController::class, 'popular']);
    Route::get('/templates/{template}', [TemplateController::class, 'show']);
    
    // Order routes
    Route::apiResource('orders', OrderController::class);
    Route::get('/orders/stats', [OrderController::class, 'stats']);
    Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus']);
});
```

## 6. CORS Configuration

Install dan konfigurasi CORS:

```bash
# Jika belum ada, install fruitcake/laravel-cors
composer require fruitcake/laravel-cors
```

Edit `config/cors.php`:
```php
'allowed_origins' => ['http://localhost:3000', 'https://yourdomain.com'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

## 7. Frontend Environment

Buat file `.env.local` di root project React:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## 8. Laravel Seeders (Optional)

```bash
php artisan make:seeder TemplateSeeder
php artisan make:seeder AddonSeeder
```

## 9. Run Laravel

```bash
php artisan migrate
php artisan db:seed
php artisan serve
```

## 10. Testing API

Test endpoints dengan tools seperti Postman atau curl:

```bash
# Check domain
curl -X POST http://localhost:8000/api/v1/domains/check \
  -H "Content-Type: application/json" \
  -d '{"domain":"example","extension":".com"}'

# Get templates
curl http://localhost:8000/api/v1/templates

# Create order
curl -X POST http://localhost:8000/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "mybusiness",
    "extension": ".com",
    "template_name": "Warung Makan Sederhana",
    "addons": ["seo-optimization"],
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "08123456789",
    "total_amount": 648000,
    "payment_method": "credit-card"
  }'
```

Website React akan otomatis terhubung ke Laravel API setelah setup ini selesai.
