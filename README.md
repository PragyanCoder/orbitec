# Orbit Technology Platform

A modern application deployment platform that allows users to deploy their applications with ease.

## Features

- **Easy Deployment**: Deploy applications from GitHub repositories
- **Multiple Frameworks**: Support for Node.js, Python, PHP, and more
- **Custom Domains**: Add your own domain names
- **Real-time Monitoring**: Live deployment logs and application monitoring
- **Credit System**: Pay-as-you-go pricing with redeem codes
- **Admin Panel**: Administrative tools for managing users and applications

## Architecture

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express
- SQLite database with better-sqlite3
- Docker for containerization
- Nginx for reverse proxy
- Stripe for payments
- Clerk for authentication

## Deployment Infrastructure

When you deploy an application through the website, here's what happens:

1. **Repository Cloning**: Your GitHub repository is cloned to our secure servers
2. **Containerization**: Your application is built into a Docker container
3. **Deployment**: The container is deployed to our cloud infrastructure
4. **Domain Assignment**: Your app gets a subdomain like `yourapp.orbittechnology.tech`
5. **SSL Certificate**: Automatic HTTPS with SSL certificates
6. **Load Balancing**: Traffic is distributed across multiple servers
7. **Monitoring**: 24/7 monitoring and automatic scaling

### Infrastructure Details
- **Cloud Provider**: Multi-cloud deployment (AWS, Google Cloud, Azure)
- **Container Orchestration**: Kubernetes for container management
- **CDN**: Global content delivery network for fast loading
- **Database**: Managed database services for data persistence
- **Backup**: Automated daily backups of your applications
- **Security**: WAF (Web Application Firewall) and DDoS protection

## Getting Started

### Prerequisites
- Node.js 18+ 
- Docker
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/orbit-technology.git
cd orbit-technology
```

2. Install dependencies:
```bash
npm install
cd server && npm install
```

3. Set up environment variables:
```bash
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

4. Initialize the database:
```bash
cd server && npm run migrate
```

5. Start the development servers:
```bash
# Start both frontend and backend
npm run start:full

# Or start them separately
npm run dev          # Frontend
npm run dev:server   # Backend
```

## Environment Variables

### Required
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for authentication
- `CLERK_SECRET_KEY`: Clerk secret key for authentication
- `STRIPE_SECRET_KEY`: Stripe secret key for payments (optional)
- `ADMIN_EMAIL`: Email address for the admin user (optional)

### Optional
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `DOMAIN`: Custom domain (default: orbittechnology.tech)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

## Security Features

- **Environment Variable Protection**: Sensitive environment variables are hidden from users
- **Admin Access Control**: Strict admin-only access to sensitive operations
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: All user inputs are validated and sanitized
- **CORS Protection**: Proper CORS configuration
- **Helmet Security**: Security headers with Helmet.js

## Admin Features

### Promo Code Generation
Admins can generate promo codes that users can redeem for credits:
- Generate codes with custom credit amounts
- Set expiration dates
- Track usage and redemption

### User Management
- View all users and their applications
- Suspend/unsuspend user accounts
- Monitor user activity
- View billing information

### Application Management
- View all deployed applications
- Monitor deployment status
- Access application logs
- Manage application lifecycle

## User Features

### Redeem Codes
Users can redeem promo codes for free credits:
- Enter redeem code in billing section
- Credits are automatically added to account
- Use credits to deploy and run applications

### Application Deployment
- Connect GitHub repositories
- Configure environment variables
- One-click deployment
- Real-time build logs

### Custom Domains
- Add custom domain names
- Automatic SSL certificates
- DNS configuration guidance

## API Documentation

### Authentication
All API requests require authentication using Bearer tokens:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://orbittechnology.tech/api/applications
```

### Endpoints
- `GET /api/applications` - List user applications
- `POST /api/applications` - Create new application
- `GET /api/deployments` - List deployments
- `POST /api/billing/redeem` - Redeem promo code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email admin@orbittechnology.tech or visit our documentation at https://orbittechnology.tech/docs

## Company Information

**ORBIT TECHNOLOGY**  
NO.2, RAGAVENDRA NAGAR, KURUMBAPET  
Puducherry, Puducherry, 605009  
India  

**Contact**: +91 9519253125  
**Email**: admin@orbittechnology.tech  
**GSTIN**: 34AAFFO2987H1Z0