#!/bin/bash

# VPS Deployment Script for Orbit Technology

echo "🚀 Starting deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ if not installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt install nginx -y
fi

# Create logs directory
mkdir -p logs

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd server && npm install && cd ..

# Build the application
echo "🔨 Building application..."
npm run build

# Stop existing PM2 processes
echo "🛑 Stopping existing processes..."
pm2 stop all || true
pm2 delete all || true

# Update PM2 ecosystem config with correct path
sed -i "s|/path/to/your/project|$(pwd)|g" ecosystem.config.js

# Start applications with PM2
echo "🚀 Starting applications..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/orbit-technology

# Enable the site
sudo ln -sf /etc/nginx/sites-available/orbit-technology /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Setup firewall
echo "🔒 Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ Deployment completed!"
echo ""
echo "🌐 Your application should now be accessible at:"
echo "   http://yourdomain.com"
echo ""
echo "📊 Check application status:"
echo "   pm2 status"
echo "   pm2 logs"
echo ""
echo "🔧 Nginx status:"
echo "   sudo systemctl status nginx"
echo ""
echo "🚨 If you have a domain, configure DNS to point to this server's IP"
echo "🔒 Consider setting up SSL with: sudo certbot --nginx -d yourdomain.com"