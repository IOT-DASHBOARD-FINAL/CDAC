# Backend README

## Overview

The backend of this IoT application is built using Node.js and Express to handle API requests, manage device data, and provide real-time updates.

## Key Features

- **API Endpoints:** Handles requests for project & sensor management, data retrieval, and user authentication.
- **Real-Time Updates:** Uses Socket.IO for real-time data updates.
- **Database Management:** Utilizes Prisma ORM with MySQL DB for efficient data storage and retrieval. Also to reduces complexity of DB querying.
- **Alert System:** Sends email notifications for system abnormalities.

## Technologies Used

- **Node.js:** Runtime environment for server-side logic.
- **Express:** Lightweight web framework for handling HTTP requests.
- **MySQL:** Relational database management system.
- **Prisma ORM:** ORM for type-safe database interactions.
- **Socket.IO:** Enables real-time Bi-directional (TCP based) communication between frontend and backend.
- **Joi:** Schema description and data validation.
- **bcrypt:** Library to hash passwords.
- **jsonwebtoken:** For generating and verifying JSON Web Tokens.
- **nodemailer:** Module to send emails.

## Code Structure
*   `models`: Data models and its functions.
*   `config`: Configuration files for database setup.
*   `routes`: API endpoint with its controller definitions.
*   `controllers`: Route handler functions.
*   `middleware`: Middleware functions for request processing.
*   `utils`: Utility functions and helper methods.
*   `server.js`: The main application file.

## Installation

### Prerequisites

*   Node.js, npm (Node Package Manager) must be installed on your system. If you are using local DB configure it as well.

1. **Clone the repository:**

    ```
    git clone https://github.com/IOT-DASHBOARD-FINAL/CDAC

    ```

2. **Navigate to the backend directory:**

    ```
    cd backend
    ```

3. **Install dependencies:**

    ```
    npm install
    ```
4. Create a `.env` file and add your environment variables values which are required as defined in sample.env file.

5. **Configure Prisma:**

   If you are setting up a new database:

   ```
   npx prisma init
   npx prisma migrate dev --name init
   npx prisma generate
   ```

   If you are using an existing Prisma database:

   ```
   npx prisma db pull
   npx prisma generate
   ```

## Usage
1. **Start the server:**

    ```
    npm start
    ```
2. **View the database (Prisma Studio):**

   ```
   npx prisma studio
   ```

## API Endpoints
### Basic think to note, 
 - id : user's ID
 - sensorId: sensor's ID
 - projectId: project's ID
### User Endpoints

- **Create a new user**
  - `POST /api/users/register`
  - **Body**: `{ "username": "string", "email": "string", "password": "string",... }`

- **User login**
  - `POST /api/users/signin`
  - **Body**: `{ "email": "string", "password": "string" }`

- **Get user by ID**
  - `POST /api/users/me`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get all users**
  - `POST /api/users/getAll`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Update user**
  - `PATCH /api/users/update`
  - **Body**: `{ "id": "number", "username": "string", "email": "string",... }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Delete user**
  - `DELETE /api/users/delete/:userId`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

### Project Endpoints

- **Create a new project**
  - `POST /api/projects/create`
  - **Body**: `{ "name": "string", "description": "string", "microcontroller": "string", "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get project by ID**
  - `POST /api/projects/get/:projectId`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get projects by user ID**
  - `POST /api/projects/getByUser/:id`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get all projects**
  - `POST /api/projects/getAll`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Update project**
  - `PATCH /api/projects/update/:projectId`
  - **Body**: `{ "id": "number", "name": "string", "description": "string", "microcontroller": "string" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Delete project**
  - `DELETE /api/projects/delete/:projectId`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

### Sensor Endpoints

- **Create a new sensor**
  - `POST /api/projects/:projectId/sensor/create`
  - **Body**: `{ "name": "string", "type": "string", "minThreshold": "number", "maxThreshold": "number", "unit": "string", "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get sensor by ID**
  - `POST /api/projects/:projectId/sensor/get/:sensorId`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get sensors by project ID**
  - `POST /api/projects/:projectId/sensor/getByProject`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get all sensors**
  - `POST /api/projects/:projectId/sensor/getAll`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Update sensor**
  - `PATCH /api/projects/:projectId/sensor/update/:sensorId`
  - **Body**: `{ "id": "number", "name": "string", "type": "string", "minThreshold": "number", "maxThreshold": "number", "unit": "string" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Delete sensor**
  - `DELETE /api/projects/:projectId/sensor/delete/:sensorId`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

### Sensor Data Endpoints

- **Send sensor data**
  - `POST /api/projects/:projectId/sensor/:sensorId/sendData`
  - **Body**: `{ "id": "number", "value": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`
  - **Socket.IO**: Emits `sensorData` event with the sensor data.

- **Receive sensor data**
  - `POST /api/projects/:projectId/sensor/:sensorId/getData`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`
  - **Socket.IO**: Emits `sensorData` event with the sensor data.

- **Delete sensor data**
  - `DELETE /api/projects/:projectId/sensor/:sensorId/deleteData/:dataId`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`
  - **Socket.IO**: Emits `deleteSensorData` event with the deleted sensor data.

- **Delete multiple sensor data**
  - `DELETE /api/projects/:projectId/sensor/:sensorId/deleteData`
  - **Body**: `{ "id": "number", "ids": "array of numbers" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`

- **Get sensor data by sensor name and project name(API to send from hardware)**
  - `POST /api/projects/:projectName/sensor/:sensorName/getValue`
  - **Body**: `{ "id": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`
  - **Socket.IO**: Emits `sensorData` event with the sensor data.

- **Send sensor data by sensor name and project name(API to send from hardware)**
  - `POST /api/projects/:projectName/sensor/:sensorName/sendValue`
  - **Body**: `{ "id": "number", "value": "number" }`
  - **Headers**: `{ "Authorization": "Bearer <token>" }`
  - **Socket.IO**: Emits `sensorData` event with the sensor data.

## Contributing

Contributions are welcome! Please submit pull requests or open issues for any improvements or new features.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Submit a pull request to the main branch.

## License

This project is licensed under the MIT License.
