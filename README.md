
# TalentTrac (HR Management System)

## Introduction
The HR Management System is a web application designed to simplify and automate HR tasks, offering features like an interactive dashboard, employee management, attendance tracking, leave management, event management, team management, and complain management. It provides an all-in-one platform for HR departments to enhance their operational efficiency.

## Features
- **Interactive Dashboard:** View key metrics and employee statistics for quick insights and decisions.
- **Employee Management:** Manage employee profiles, including details, positions, and performance.
- **Attendance Tracking:** Record and analyze employee attendance with detailed reports.
- **Leave Management:** Automate the leave application process from submission to approval.
- **Event Management:** Organize company events, including booking, registration, and reminders.
- **Team Management:** Oversee team structures and manage departmental assignments.
- **Complain Management:** Allow employees to raise complaints for efficient resolution by HR.

## Prerequisites
Ensure you have the following installed:
- Node.js (version 12.x or above)
- npm (version 6.x or above)
- MongoDB Atlas account for database services

## Installation
Follow these steps to set up the HR Management System:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourgithubusername/HR-Management-System.git
   cd HR-Management-System
   ```

2. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../Client
   npm install
   ```

### Configuring MongoDB Atlas
Before running the application, you must configure your MongoDB Atlas database:

1. Create a MongoDB Atlas account and set up a cluster.
2. Obtain your MongoDB Atlas connection string.
3. Create a `.env` file in the `Backend` directory.
4. Add the following line to your `.env` file, replacing `<YourMongoDBAtlasConnectionString>` with your actual connection string:
   ```
   DATABASE_URL=<YourMongoDBAtlasConnectionString>
   ```
   This step is crucial for connecting the application to your MongoDB Atlas database.

## Running the Application
To run the HR Management System:

1. Start the backend server:
   ```bash
   cd Backend
   npm start
   ```

2. In a new terminal, start the frontend server:
   ```bash
   cd Client
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

## Usage
Log in as an HR administrator to access the dashboard and manage various HR tasks.

## Contributing
Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Contact
For support, contact info@email.com or open an issue in the GitHub repository.

---

This version of the README includes instructions for setting up MongoDB Atlas, highlighting the importance of using a personal database connection string for the application's data storage. Make sure to replace placeholders like the GitHub repository URL and contact email with your actual project details.
