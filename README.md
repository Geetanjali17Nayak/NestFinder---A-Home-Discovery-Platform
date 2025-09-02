<!-- # NestFinder: A Home Discovery Platform

NestFinder is a full-stack web application designed to help users discover, search, and book rental properties. It features a modern, real-time interface for both property owners and potential tenants, built with Next.js on the frontend and a Node.js/Express with GraphQL backend.

## ✨ Features

- **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
- **Property Listings**: Browse, search, and filter properties by location, type, and price.
- **Property Adding**: Seller can add, update and also delete their properties
- **Real-time Notifications**: Property owners receive instant notifications for new booking requests via GraphQL Subscriptions.
- **Admin Dashboard**: Admins get notified in real-time about new user registrations.
- **Integrated Contact System**: A functional contact page that sends inquiries directly to a specified email address using Nodemailer.
- **User Profiles**: Users can view and manage their profile information.
- **Responsive Design**: A clean and modern UI built with Tailwind CSS that works on all devices.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: JavaScript/TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **GraphQL Client**: [Apollo Client](https://www.apollographql.com/docs/react/) for queries, mutations, and subscriptions.
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Framework**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
- **API**: [GraphQL](https://graphql.org/) with [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- **Real-time**: [GraphQL Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/) over WebSockets
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- **Email**: [Nodemailer](https://nodemailer.com/) for the contact form integration.

## API Overview

The backend server is built with Node.js, Express, and Apollo Server, offering a hybrid API structure that combines REST endpoints with a powerful GraphQL API.

### REST API

The REST API handles core functionalities that don't require the flexibility of GraphQL, such as:

-   **User Authentication**: Endpoints like `/api/users/register` and `/api/users/login` manage user sign-up and sign-in processes.
-   **User & Property Management**: Standard CRUD operations for user profiles and property listings.

### GraphQL API

The GraphQL endpoint (typically at `/graphql`) is the core of the application's real-time and data-intensive features.

-   **Real-time Subscriptions**: Leverages WebSockets to provide instant updates to clients. Property owners are notified immediately of new booking requests, and admins receive real-time notifications for new user registrations.
-   **Data Fetching**: Allows the frontend to query for complex, nested data structures in a single request, perfect for fetching detailed property information.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd Backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the `Backend` directory and add the following variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    PORT=8000
    EMAIL_USER=your-backend-email@example.com
    EMAIL_PASS=your-backend-email-password
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server will be running on `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a local environment file:**
    Create a `.env.local` file in the `frontend` directory for the contact form's email credentials.

    ```env
    # Nodemailer Contact Form Configuration
    EMAIL_SERVER_HOST=smtp.example.com
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_SECURE=false
    EMAIL_SERVER_USER=your-email@example.com
    EMAIL_SERVER_PASSWORD=your-email-password
    EMAIL_TO=recipient@example.com
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.



5.  **Start the Backend server:**
    ```bash
    npm run dev
    ```
    The Backend server will be available at `http://localhost:8000`.


---

Happy coding! -->

# 🏡 NestFinder: A Home Discovery Platform

NestFinder is a full-stack web application designed to help users discover, search, and book rental properties. It features a modern, real-time interface for both property owners and potential tenants, built with **Next.js** on the frontend and a **Node.js/Express with GraphQL backend**.

---

## ✨ Features

- **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
- **Property Listings**: Browse, search, and filter properties by location, type, and price.
- **Property Adding**: Sellers can add, update, and delete their properties.
- **Real-time Notifications**: Property owners receive instant notifications for new booking requests via GraphQL Subscriptions.
- **Admin Dashboard**: Admins get notified in real-time about new user registrations.
- **Integrated Contact System**: A functional contact page that sends inquiries directly to a specified email address using Nodemailer.
- **User Profiles**: Users can view and manage their profile information.
- **Responsive Design**: A clean and modern UI built with Tailwind CSS that works on all devices.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: JavaScript/TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **GraphQL Client**: [Apollo Client](https://www.apollographql.com/docs/react/) for queries, mutations, and subscriptions
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Framework**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
- **API**: [GraphQL](https://graphql.org/) with [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- **Real-time**: [GraphQL Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/) over WebSockets
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- **Email**: [Nodemailer](https://nodemailer.com/) for the contact form integration

---

## 📡 API Overview

The backend server offers both **REST API endpoints** and a **GraphQL API**.

### REST API

- **User Authentication**: Endpoints like `/api/users/register` and `/api/users/login`
- **User & Property Management**: CRUD operations for user profiles and property listings

### GraphQL API

- **Real-time Subscriptions**: Instant updates for booking requests and new user registrations
- **Data Fetching**: Query for nested property data in a single request

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### ✅ Prerequisites

Make sure you have installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud, e.g., MongoDB Atlas)

---

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Geetanjalinayak-successiveTech/NestFinder--A-Home-Discovery-Platform.git
   cd NestFinder--A-Home-Discovery-Platform
   ```

   > **Note**: Replace `your-username` with the actual GitHub username if you forked the repository.

2. **Set up the Backend:**

   - Navigate to the backend directory: `cd Backend`
   - Install dependencies: `npm install`
   - Create a `.env` file and add the required environment variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     PORT=8000
     EMAIL_USER=your-backend-email@example.com
     EMAIL_PASS=your-backend-email-password
     ```

3. **Set up the Frontend:**
   - Navigate to the frontend directory from the project root: `cd frontend`
   - Install dependencies: `npm install`
   
     ```

### Running the Application

You will need two separate terminal windows to run both the frontend and backend servers concurrently.

1.  **Start the backend server:**

    - In a terminal, navigate to the `Backend` directory and run:
      ```bash
      npm run dev
      ```
    - The backend server will be available at `http://localhost:8000`.

2.  **Start the frontend development server:**
    - In a second terminal, navigate to the `frontend` directory and run:
      ```bash
      npm run dev
      ```
    - The frontend will be available at `http://localhost:3000`.

---
