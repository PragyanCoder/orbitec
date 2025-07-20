# VPS Deployment Steps After `npx vite build`

## 1. Install and Configure Nginx

```bash
# Install Nginx
sudo apt update
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 2. Configure Nginx for Frontend

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/orbit-technology
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
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
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

## 3. Enable the Site

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/orbit-technology /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 4. Set up Backend Environment

```bash
# Navigate to server directory
cd /home/project/server

# Create production environment file
cp .env.example .env

# Edit with your actual values
nano .env
```

Add your environment variables:

```env
PORT=3001
NODE_ENV=production
DATABASE_URL=./database.sqlite
DOMAIN=your-domain.com
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

## 5. Install Backend Dependencies and Start

```bash
# Install backend dependencies
cd /home/project/server
npm install

# Install PM2 globally for process management
sudo npm install -g pm2

# Start the backend server
pm2 start server.js --name "orbit-backend"

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

## 6. Set up Firewall

```bash
# Configure UFW firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw --force enable
```

## 7. Set up SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 8. Verify Deployment

Check if everything is running:

```bash
# Check Nginx status
sudo systemctl status nginx

# Check backend status
pm2 status

# Check backend logs
pm2 logs orbit-backend

# Test the website
curl http://your-domain.com
```

## 9. Monitor and Maintain

```bash
# View PM2 logs
pm2 logs

# Restart backend if needed
pm2 restart orbit-backend

# Reload Nginx configuration
sudo nginx -s reload

# Check system resources
htop
```

## Troubleshooting

If you encounter issues:

1. **Check Nginx logs**: `sudo tail -f /var/log/nginx/error.log`
2. **Check backend logs**: `pm2 logs orbit-backend`
3. **Verify ports**: `sudo netstat -tlnp | grep :80`
4. **Check file permissions**: `ls -la /home/project/dist`

Your Orbit Technology platform should now be live and accessible at your domain!