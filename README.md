# BS Realty Web

A comprehensive corporate web application for BS Realty LLC, providing real estate services, mortgage solutions, insurance, investment opportunities, accounting, and financial counseling. Built with modern web technologies to deliver a seamless user experience for clients and efficient management tools for administrators.

## Features

### Client-Facing Features
- **Responsive Design**: Fully responsive website optimized for desktop, tablet, and mobile devices
- **Service Showcase**: Detailed service pages for real estate, mortgage, insurance, and financial services
- **Property Listings**: Interactive property browsing with advanced search and filtering
- **Team Profiles**: Professional team member profiles and contact information
- **Contact Forms**: Multiple contact forms for inquiries, appointments, and quotes
- **Job Portal**: Job listings with application system for career opportunities
- **Agent Registration**: Become an agent application system
- **Quote Systems**: Dedicated forms for home improvement and insurance quotes

### Admin Dashboard
- **User Management**: Comprehensive user and agent management system
- **Form Submissions**: Centralized dashboard for all form submissions including:
  - Property Inquiries
  - Appointments
  - Contact Forms
  - Job Applications
  - Agent Applications
  - Home Improvement Quotes
  - Insurance Quotes
- **Real-time Notifications**: Live notification system with unread counts
- **Status Management**: Update and track status of all submissions
- **Data Visualization**: Status-based filtering and highlighting
- **Export Capabilities**: Data export functionality for reporting

### Technical Features
- **Authentication**: Secure JWT-based authentication system
- **Email Notifications**: Automated email notifications for form submissions
- **File Uploads**: Support for document uploads in forms
- **API Integration**: RESTful API architecture
- **Database Management**: MongoDB with Mongoose ODM
- **State Management**: React Query for efficient data fetching and caching
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Next.js 16 and React 19

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **Validation**: Joi/Zod

### DevOps & Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library
- **Deployment**: Hostinger (Frontend), Hostinger (Backend)
- **Database Hosting**: MongoDB Atlas

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For version control

## Installation

1. **Clone the repository**:
   `ash
   git clone https://github.com/your-username/bsrealty-web.git
   cd bsrealty-web
   `

2. **Install dependencies**:
   `ash
   npm install
   `

3. **Environment Setup**:
   - Copy  to .env
   - Fill in the required environment variables (see Configuration section)

4. **Database Setup**:
   - Ensure MongoDB is running locally or configure MongoDB Atlas
   - Update database connection string in environment variables

5. **Start the development server**:
   `ash
   npm run dev
   `

6. **Open your browser**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000) (if running separately)

## Configuration

### Environment Variables

Create a .env file in the root directory with the following variables:

`env
### Database
MONGODB_URI=mongodb://localhost:27017/bsrealty
### or for MongoDB Atlas:
### MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bsrealty

### JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

### Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@bsrealty.com

### File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes

### API Configuration
API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_API_URL=http://localhost:5000/api

### Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@bsrealty.com
ADMIN_PASSWORD=secure-admin-password
`

### Database Configuration

The application uses MongoDB with the following main collections:
- users - User accounts and authentication
- gents - Real estate agents
- properties - Property listings
- ppointments - Client appointments
- contacts - General contact form submissions
- property_inquiries - Property-specific inquiries
- job_applications - Job application submissions
- gent_applications - Agent registration applications
- home_improvement_quotes - Home improvement quote requests
- insurance_quotes - Insurance quote requests

## Usage

### For Clients
1. **Browse Services**: Visit the homepage to explore available services
2. **Contact Us**: Use contact forms for general inquiries or specific services
3. **Schedule Appointments**: Book appointments with agents or consultants
4. **Apply for Jobs**: Browse and apply for available positions
5. **Request Quotes**: Submit home improvement or insurance quote requests
6. **Become an Agent**: Apply to join the BS Realty team

### For Administrators
1. **Login**: Access the admin dashboard at /login
2. **Manage Users**: View and manage user accounts
3. **Handle Submissions**: Review and respond to all form submissions
4. **Update Status**: Change status of inquiries, applications, and quotes
5. **Send Notifications**: Automated email notifications for status updates
6. **Export Data**: Export submission data for reporting

## API Documentation

### Authentication Endpoints
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- POST /api/auth/logout - User logout
- GET /api/auth/me - Get current user info

### Form Submission Endpoints
- POST /api/contacts - Submit contact form
- POST /api/appointments - Schedule appointment
- POST /api/property-inquiries - Submit property inquiry
- POST /api/job-applications - Submit job application
- POST /api/agent-applications - Submit agent application
- POST /api/home-improvement-quotes - Submit home improvement quote
- POST /api/insurance-quotes - Submit insurance quote

### Admin Endpoints
- GET /api/admin/users - Get all users
- GET /api/admin/contacts - Get all contact submissions
- PATCH /api/admin/contacts/:id/status - Update submission status
- Similar endpoints for all other submission types

### Data Models

#### User
`	typescript
{
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  createdAt: Date;
  updatedAt: Date;
}
`

#### Contact Submission
`	typescript
{
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
`



## Available Scripts

- 
npm run dev - Start development server
- 
npm run build - Build for production
- 
npm run start - Start production server
- 
npm run lint - Run ESLint
- 
npm run type-check - Run TypeScript type checking
- 
npm test - Run tests


### Code Standards
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Testing

`ash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
`

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Check MongoDB is running
   - Verify connection string in environment variables
   - Ensure network access for MongoDB Atlas

2. **Email Notifications Not Working**:
   - Verify email credentials in environment variables
   - Check SMTP server settings
   - Ensure app passwords are used for Gmail

3. **Build Errors**:
   - Clear node_modules: 
m -rf node_modules ; npm install
   - Check TypeScript errors: 
pm run type-check
   - Verify all dependencies are installed

4. **Authentication Issues**:
   - Check JWT secret is set
   - Verify token expiration settings
   - Ensure cookies are enabled in browser

### Performance Optimization
- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use React Query for caching
- Implement pagination for large datasets

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens have expiration times
- Input validation on all forms
- CORS configured for allowed origins
- Rate limiting on API endpoints
- File upload restrictions and validation

## License

This project is proprietary software owned by BS Realty LLC. All rights reserved.



---


