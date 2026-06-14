<div align="center">

# 🎓 Academix Cloud

### School Management System

A comprehensive school management dashboard built with Next.js 14, designed specifically for Nepali schools with support for Bikram Sambat calendar, bilingual interface, and complete administrative functionality.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.10.1-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

</div>

---

## ✨ Features

### 👥 User Management
- **Multi-role system**: Admin, Teacher, Student, Parent, Accountant
- Student enrollment & transfer management
- Teacher and staff administration
- Parent portal with student tracking
- Secure authentication with Clerk

### 📚 Academic Management
- **Class & Grade Management**: Organize students by grades and classes
- **Subject Management**: Assign subjects to classes and teachers
- **Lesson Scheduling**: Time-table management with day/time slots
- **Exam Management**: Create and manage exams with results tracking
- **Assignment Tracking**: Digital assignment submission and grading

### 📊 Attendance System
- **Student Attendance**: Daily attendance with in/out time tracking
- **Teacher Attendance**: Staff attendance monitoring
- **Multiple Status Types**: Present, Absent, Late
- **Attendance Reports**: Generate detailed attendance reports
- **Calendar Integration**: View attendance in calendar format

### 💰 Financial Management

**Fee Management**:
- Multiple fee categories (Tuition, Registration, Exam fees, etc.)
- Flexible fee structures per class
- Bulk fee creation from templates
- Payment tracking with multiple methods (Cash, Card, UPI, Bank Transfer)
- Fee status tracking (Paid, Unpaid, Partial, Overdue, Waived)

**Income & Expense Tracking**:
- Detailed categorization for Nepali schools
- Financial reports and analytics
- Transaction history
- Receipt Generation: Print payment receipts

### 📅 Calendar & Events
- **Bikram Sambat Calendar**: Full support for Nepali calendar system
- **Event Management**: School events and announcements
- **Schedule View**: Multiple views (Agenda, Timeline, Card)
- **Academic Year Management**: Year-wise student enrollment

### 📈 Reports & Analytics
- **Attendance Charts**: Visual attendance statistics
- **Financial Dashboard**: Income vs Expense analysis
- **Performance Tracking**: Student academic performance
- **Custom Reports**: Generate various administrative reports
- **Export Functionality**: Export data to Excel/PDF

### 🎨 UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Support**: System-aware theme switching
- **Modern UI Components**: Built with Radix UI and Tailwind CSS
- **Interactive Charts**: Data visualization with Recharts
- **Print-Ready Forms**: ID cards, fee receipts, reports

### 🛠️ Technical Features
- **Type Safety**: Full TypeScript implementation
- **Database ORM**: Prisma with PostgreSQL
- **File Upload**: Cloudinary integration for images
- **Form Validation**: Zod schema validation
- **Real-time Updates**: Optimistic UI updates
- **API Routes**: RESTful API design

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm, yarn, pnpm, or bun package manager

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yagyarajpandey15/Academix-Cloud.git
cd Academix-Cloud
```

**2. Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DB_URL="postgresql://user:password@localhost:5432/academix_cloud"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**4. Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed the database with sample data
npm run seed
```

**5. Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

**6. Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
Academix Cloud/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── admin/         # Admin panel
│   │   │   ├── student/       # Student portal
│   │   │   ├── teacher/       # Teacher portal
│   │   │   ├── parent/        # Parent portal
│   │   │   └── list/          # Data tables (students, teachers, etc.)
│   │   ├── api/               # API routes
│   │   └── [[...sign-in]]/    # Authentication routes
│   ├── components/            # React components
│   │   ├── forms/             # Form components
│   │   ├── ui/                # UI components (Radix UI)
│   │   └── ...                # Feature components
│   ├── lib/                   # Utility functions
│   │   ├── actions.ts         # Server actions
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript types
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Database seeding
├── public/                    # Static assets
└── package.json
```

---

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

| Model Category | Models |
|---------------|---------|
| **User Models** | Student, Teacher, Parent, Admin, Accountant |
| **Academic Models** | Class, Grade, Subject, Lesson, Exam, Assignment |
| **Attendance Models** | Attendance, TeacherAttendance |
| **Financial Models** | Fee, Payment, Finance, ClassFeeStructure |
| **Event Models** | Event, Announcement |
| **Enrollment** | Year-wise student class tracking |

---

## 🎨 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Calendar**: React Big Calendar
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **PDF Generation**: jsPDF, html2pdf.js

</td>
<td valign="top" width="50%">

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk
- **File Upload**: Cloudinary
- **API**: Next.js API Routes

### Additional Libraries
- **Bikram Sambat**: bikram-sambat-js
- **Date Handling**: date-fns, moment
- **Excel Export**: ExcelJS
- **Animations**: Framer Motion

</td>
</tr>
</table>

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔒 Authentication

The application uses [Clerk](https://clerk.com/) for authentication with support for:

- ✅ Email/Password authentication
- ✅ Role-based access control
- ✅ Session management
- ✅ Secure API routes

---

## 🌐 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- Database connection string
- Clerk authentication keys
- Cloudinary credentials

### Recommended Platforms

| Platform | Best For |
|----------|----------|
| **Vercel** | Optimized for Next.js (recommended) |
| **Railway** | Easy PostgreSQL + Node.js deployment |
| **Render** | Full-stack hosting |
| **AWS/Azure/GCP** | Enterprise deployments |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

## 🙏 Acknowledgments

- Built for Nepali educational institutions
- Supports Bikram Sambat calendar system
- Designed with input from school administrators and teachers

---

<div align="center">

**Made with ❤️ for better education management**

[⬆ Back to Top](#-academix-cloud)

</div>
