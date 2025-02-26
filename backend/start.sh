#!/bin/bash

# Create .env if not exists
if [ -f ".env" ]; then
    echo "Environment file already exists"
else
    cp .env.example .env
    echo "Created new environment file"
fi

# Start Docker containers
echo "Starting Docker containers..."
docker compose up -d

# Set proper permissions
echo "Setting permissions..."
docker compose exec app chown -R phpdocker:phpdocker /www/storage
docker compose exec app chmod -R 775 /www/storage

# Install dependencies
echo "Installing composer dependencies..."
docker compose exec app composer install

# Generate app key if not exists
if grep -q "APP_KEY=base64:" ".env"; then
    echo "Application key already exists"
else
    echo "Generating application key..."
    docker compose exec app php artisan key:generate
fi

echo "Creating storage link..."
docker compose exec app php artisan storage:link

# Run migrations
echo "Running migrations..."
docker compose exec app php artisan migrate

echo "Setup completed successfully!"
