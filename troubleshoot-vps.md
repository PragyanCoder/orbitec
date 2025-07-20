# VPS Troubleshooting Guide - Connection Refused

## Step 1: Check if services are running

```bash
# Check if Nginx is running
sudo systemctl status nginx

# If not running, start it
sudo systemctl start nginx
sudo systemctl enable nginx

# Check if backend is running
pm2 status

# If backend not running, start it
cd /home/project/server
pm2 start server.js --name "orbit-backend"
pm2 save
```

## Step 2: Check ports and firewall

```bash
# Check what's listening on port 80
sudo netstat -tlnp | grep :80

# Check firewall status
sudo ufw status

# If firewall is blocking, allow ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw --force enable
```

## Step 3: Verify Nginx configuration

```bash
# Test Nginx configuration
sudo nginx -t

# If there are errors, check the config file
sudo nano /etc/nginx/sites-available/orbit-technology

# Make sure the config is enabled
sudo ln -sf /etc/nginx/sites-available/orbit-technology /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Restart Nginx
sudo systemctl restart nginx
```

## Step 4: Create proper Nginx configuration

Create the Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/orbit-technology
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name orbittechnology.tech www.orbittechnology.tech;
    root /home/project/dist;
    index index.html;

    # Frontend (React/Vite build)
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Static assets with caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

## Step 5: Check file permissions

```bash
# Make sure Nginx can read the files
sudo chown -R www-data:www-data /home/project/dist
sudo chmod -R 755 /home/project/dist

# Check if dist folder exists and has files
ls -la /home/project/dist
```

## Step 6: Set up backend environment

```bash
cd /home/project/server

# Create .env file with your actual values
nano .env
```

Add this content to `.env`:

```env
PORT=3001
NODE_ENV=production
DATABASE_URL=./database.sqlite
DOMAIN=orbittechnology.tech
ADMIN_EMAIL=pragyanpandey0106@gmail.com

# Clerk Configuration
CLERK_SECRET_KEY=sk_test_yO•••••Gre
NEXT_PUBLIC_CLERK_FRONTEND_API=https://factual-heron-70.clerk.accounts.dev
CLERK_API_URL=https://api.clerk.com
CLERK_JWKS_URL=https://factual-heron-70.clerk.accounts.dev/.well-known/jwks.json

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_51•••••ow7
STRIPE_WEBHOOK_SECRET=whsec_HmvJseum4oAbbuwCBjo1IkEYCfmprqHZ
```

## Step 7: Start backend properly

```bash
cd /home/project/server

# Install dependencies if not done
npm install

# Install PM2 globally
sudo npm install -g pm2

# Stop any existing processes
pm2 delete all

# Start backend
pm2 start server.js --name "orbit-backend"
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

## Step 8: Check logs for errors

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Check backend logs
pm2 logs orbit-backend

# Check system logs
sudo journalctl -u nginx -f
```

## Step 9: Test the setup

```bash
# Test if Nginx is serving files
curl -I http://localhost

# Test if backend is responding
curl http://localhost:3001/api/health

# Test from outside (replace with your server IP)
curl -I http://YOUR_SERVER_IP
```

## Step 10: DNS Configuration

Make sure your domain `orbittechnology.tech` points to your VPS IP address:

1. Go to your domain registrar
2. Set A record: `orbittechnology.tech` → `YOUR_VPS_IP`
3. Set A record: `www.orbittechnology.tech` → `YOUR_VPS_IP`

## Quick Fix Commands

Run these commands in order:

```bash
# 1. Restart all services
sudo systemctl restart nginx
pm2 restart all

# 2. Check status
sudo systemctl status nginx
pm2 status

# 3. Check if ports are open
sudo netstat -tlnp | grep -E ':80|:3001'

# 4. Test connectivity
curl -I http://localhost
```

If you're still getting connection refused, run these commands and share the output:

```bash
sudo systemctl status nginx
pm2 status
sudo netstat -tlnp | grep :80
sudo ufw status
```