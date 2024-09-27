# Image Gallery App

## Project Overview
The Image Gallery App allows users to upload, manage, tag, and comment on images. It includes features like image editing, tagging, and search/filtering by tags, offering secure image content management.

This README provides an overview of the application's features, setup instructions, technical design, and database diagram.

## Project Architecture
The application follows a three-tier architecture:
- **Frontend (Client Side)**: Built with React, it handles the user interface, routing, and component rendering.
- **Backend (Server Side)**: Developed using ASP.NET Core, it manages API requests and database interactions.
- **Database**: Microsoft SQL Server is used to store user data, images, comments, and associated tags.

## Technologies Used

### Frontend
- **React.js**: For building the user interface and managing navigation.
- **Axios**: For handling HTTP requests to the backend.
- **HTML/CSS**: For structuring and styling the application.
- **Figma**: Used for project mockup and design.

### Backend
- **ASP.NET Core**: For building the API and handling server-side logic.
- **Entity Framework Core**: To interact with the Microsoft SQL Server database.
- **Identity**: For handling authentication and authorization.

### Authentication
- **JWT-based Authentication**: Users need to log in to perform actions like uploading photos or leaving comments. Upon authentication, the JWT token is stored in local storage and passed with authorized requests.

### Business Logic
- **Controllers**: Manage incoming requests, validate data, and use Entity Framework Core for database interactions.

### Database
- **Microsoft SQL Server Management Studio**: Used to create the relational database that stores user details, images, comments, and tags.
- **Cloudinary**: Images are stored in Cloudinary, and their links are saved in the database.

## Application Features

### Users
- Users receive a verification email after registration to confirm their account.
- A "Forgot Password" feature allows users to reset their password.
- Users can upload images by selecting or dragging and dropping them.
- Comments can be added, updated, or deleted.
- Images can be searched and filtered by tags.

### Image Management
- Users can upload images with titles and descriptions.
- Image titles and descriptions can be edited by the user who posted them.
- Tags can be added to images for easier searching and filtering.
- Images can be viewed in detail along with associated comments and metadata (such as the number of comments).

### Validation Messages
- Various validation messages notify users about incorrect credentials or image upload requirements (e.g., image description should not exceed 50 characters).
- Accounts are locked after 3 failed login attempts.

## Setting Up the Development Environment

### Prerequisites
- **Node.js**: For running the frontend React application.
- **SQL Server**: For database management.

### Setup Instructions

#### Clone the Repository
GitHub Repository: 

#### Backend Setup
1. Configure the database connection string in `appsettings.json`.
2. Run migrations using:
   ```bash
   dotnet ef migrations add <MigrationName>
   dotnet ef database update
3. Start the backend:
   dotnet watch run

### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies:
   npm install
3. Start the React development server:
   npm run dev

### How the App Runs
1. Open the terminal and navigate to the frontend or backend directories.
2. Run the backend API (Swagger):
   dotnet watch run
3. Run the frontend:
   npm run dev
