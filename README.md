# 🎬 Bookit - Movie Booking System

A comprehensive full-stack movie booking application built with **React.js** frontend and **Node.js** backend, providing seamless movie ticket booking experience for users and powerful administrative tools for cinema management.

![Project Status](https://img.shields.io/badge/status-completed-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React.js-61dafb)
![Backend](https://img.shields.io/badge/backend-Node.js-339933)
![Database](https://img.shields.io/badge/database-MongoDB-47a248)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎭 **User Features**
- **User Authentication**: Secure registration and login system
- **Movie Browsing**: Interactive movie slider with detailed information
- **Advanced Search**: Find movies by name, genre, or release date
- **Seat Selection**: Interactive seat map for booking
- **Real-time Booking**: Live seat availability updates
- **Payment Integration**: Secure payment processing
- **Booking History**: Track past and upcoming bookings
- **Contact Support**: Customer inquiry system

### 👨‍💼 **Admin Features**
- **Dashboard Analytics**: Visual charts and statistics
- **Movie Management**: Add, edit, and delete movies with media upload
- **Theater Management**: Manage theater locations and details
- **Show Management**: Schedule and manage movie shows
- **Customer Management**: View and manage registered users
- **Booking Management**: Monitor all ticket bookings
- **Enquiry Management**: Handle customer support requests

### 🎯 **System Features**
- **Responsive Design**: Mobile-first approach for all devices
- **Role-based Access**: Separate interfaces for users and admins
- **Session Management**: Secure authentication with express-session
- **File Upload**: Image handling for movie posters and banners
- **Data Validation**: Comprehensive input validation
- **Error Handling**: User-friendly error messages and notifications

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React.js 18.2.0
- **Build Tool**: Vite 6.0.5
- **Routing**: React Router DOM 7.1.1
- **HTTP Client**: Axios 1.7.9
- **Form Handling**: Formik 2.4.6 + Yup 1.6.1
- **UI Components**: Material-UI 6.4.1
- **Styling**: CSS3 + Styled Components 6.1.14
- **Charts**: Chart.js 4.4.8 + React Chart.js 2
- **Icons**: FontAwesome 6.7.2

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB with Mongoose 8.9.4
- **Authentication**: bcrypt 5.1.1 + express-session 1.18.1
- **File Upload**: Multer 1.4.5-lts.1
- **Security**: CORS 2.8.5
- **Environment**: dotenv 16.4.7
- **Development**: Nodemon 3.1.9

## 📁 Project Structure

```
Bookit/
├── moviebackend/                 # Backend application
│   ├── Controllers/              # Business logic controllers
│   │   ├── AuthControllers.js
│   │   ├── AdminAddMoviesControllers.js
│   │   ├── BookMovieControllers.js
│   │   ├── ContactusControllers.js
│   │   ├── ShowControllers.js
│   │   └── TheaterControllers.js
│   ├── Models/                   # MongoDB data models
│   │   ├── AdminAddMovies.js
│   │   ├── BookMovie.js
│   │   ├── Contactus.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Shows.js
│   │   └── Theater.js
│   ├── Routers/                  # API route definitions
│   │   ├── AuthRouter.js
│   │   ├── AdminAddMoviesRouter.js
│   │   ├── BookMovieRouter.js
│   │   ├── ContactusRouter.js
│   │   ├── ShowRouter.js
│   │   └── TheaterRouter.js
│   ├── FileFolder/               # File upload configuration
│   │   └── MulterConfig.js
│   ├── uploads/                  # Uploaded images storage
│   ├── index.js                  # Server entry point
│   └── package.json
│
├── moviefrontend/                # Frontend application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── Component/            # React components
│   │   │   ├── Admin/            # Admin dashboard components
│   │   │   │   ├── AdminDashboard/
│   │   │   │   ├── AdminNavbar/
│   │   │   │   ├── AdminMovies/
│   │   │   │   ├── AdminTheater/
│   │   │   │   ├── AdminShow/
│   │   │   │   ├── AdminCustomer/
│   │   │   │   ├── AdminBooking/
│   │   │   │   └── AdminEnquiry/
│   │   │   ├── Home/             # Landing page with movie slider
│   │   │   ├── Movies/           # Movie browsing and booking
│   │   │   ├── Login/            # Authentication components
│   │   │   ├── Register/
│   │   │   ├── Contact/          # Customer support
│   │   │   ├── Navbar/           # Navigation components
│   │   │   ├── Footer/
│   │   │   └── Payment/          # Payment processing
│   │   ├── assets/               # Images and static files
│   │   ├── common/               # Shared utilities and components
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Application entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md                     # Project documentation
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### **Backend Setup**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Bookit/moviebackend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   # Create .env file in moviebackend directory
   touch .env
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Start the backend server**
   ```bash
   npm start
   # or for development
   nodemon index.js
   ```

### **Frontend Setup**

1. **Navigate to frontend directory**
   ```bash
   cd ../moviefrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 🔐 Environment Variables

Create a `.env` file in the `moviebackend` directory:

```env
# Database Configuration
MONGODB_URL=mongodb://localhost:27017/bookit
# or for MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/bookit

# Server Configuration
PORT=5000

# Session Secret
SESSION_SECRET=Th1sIs@Str0ngJWT$3cretKey128%

# Additional configurations (if needed)
NODE_ENV=development
```

## 🌐 API Endpoints

### **Authentication Routes** (`/Auth`)
```
POST /Auth/register         # User registration
POST /Auth/login           # User login
POST /Auth/logout          # User logout
GET  /Auth/getregisterdata # Get all users (Admin)
```

### **Movie Management** (`/adminaddmovies`)
```
POST /adminaddmovies/addmoviedata  # Add new movie
GET  /adminaddmovies/getmoviedata  # Get all movies
```

### **Theater Management** (`/theater`)
```
POST /theater/addtheater    # Add new theater
GET  /theater/gettheater   # Get all theaters
DELETE /theater/deletetheater # Delete theater
```

### **Show Management** (`/show`)
```
POST /show/addshow         # Add new show
GET  /show/getshow        # Get all shows
DELETE /show/deleteshow   # Delete show
```

### **Booking System** (`/moviedbbook`)
```
POST /moviedbbook/book     # Book movie tickets
GET  /moviedbbook/booked-seats # Get booked seats
PUT  /moviedbbook/payment  # Update payment status
```

### **Contact System** (`/query`)
```
POST /query/addcontact     # Submit contact inquiry
GET  /query/getcontact    # Get all inquiries (Admin)
```

## 👥 User Roles

### **Regular User**
- Browse and search movies
- View movie details and trailers
- Book tickets with seat selection
- Make payments
- View booking history
- Contact support

### **Administrator**
- Access to admin dashboard
- Manage movies, theaters, and shows
- View customer information
- Monitor bookings and payments
- Handle customer inquiries
- View analytics and reports

### **Default Admin Credentials**
```
Email: admin@gmail.com
Password: admin
```

## 🎨 Key Features Showcase

### **Interactive Movie Slider**
- Displays 3 movies per slide
- Auto-slide functionality every 4 seconds
- Manual navigation with arrow buttons
- Numbered indicator dots for direct navigation
- Responsive design for all devices

### **Seat Selection System**
- Interactive seat map (Rows A-J, Columns 1-10)
- Real-time seat availability
- Visual indicators for selected/occupied seats
- Dynamic pricing based on seat location
- Multiple seat selection capability

### **Admin Dashboard**
- Visual analytics with Chart.js
- Real-time statistics for movies, theaters, customers
- Quick navigation to management sections
- Responsive data visualization

### **File Upload System**
- Movie poster and banner upload
- Multer configuration for image handling
- Automatic file path generation
- Support for multiple image formats

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layouts with touch-friendly controls
- **Mobile**: Stacked layouts and optimized interactions

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Express-session for authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **File Upload Security**: Restricted file types and sizes

## 🚀 Performance Optimizations

- **Vite Build Tool**: Fast development and optimized production builds
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed images in uploads
- **Database Indexing**: Optimized MongoDB queries
- **Session Caching**: Efficient session management

## 🐛 Error Handling

- **Frontend**: User-friendly error messages with Material-UI Snackbars
- **Backend**: Comprehensive error responses with status codes
- **Validation**: Real-time form validation with Formik and Yup
- **Network**: Axios interceptors for API error handling

## 🔄 State Management

- **React Context**: For global state (movie selection, user data)
- **Session Storage**: For user authentication state
- **Local Component State**: Using React hooks (useState, useEffect)

## 🎯 Future Enhancements

- [ ] Email notifications for bookings
- [ ] Social media integration
- [ ] Movie reviews and ratings
- [ ] Loyalty rewards system
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Payment gateway integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## 👨‍💻 Developer

**Armin Patel**
- GitHub: [@patelarmin19](https://github.com/patelarmin19)
- Project: [Bookit-MovieBookingSoftware](https://github.com/PatelMeet2005/Bookit-MovieBookingSoftware)

## 📞 Support

For support, email info@bookit.com or create an issue in the repository.

---

**Made with ❤️ for movie lovers everywhere!** 🍿🎬
