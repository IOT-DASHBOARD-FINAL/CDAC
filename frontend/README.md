# Frontend README

## Overview

The frontend of this IoT application is built using modern web technologies to provide a user-friendly interface for managing and visualizing IoT projects.

## Key Features

- **Real-Time Data Visualization:** Uses Recharts to display real-time data from connected devices.
- **Customizable Interface:** Tailwind CSS allows for a flexible and customizable UI.
- **Responsive Design:** Optimized for desktop, mobile and all type of devices.
- **Tutorial Page:** Includes interactive tutorials to help beginners learn about API usage and integration.

## Technologies Used

- **React:** For building dynamic and interactive UI components.
- **Vite:** A fast and lightweight build tool for efficient development.
- **Tailwind CSS:** Utility-first CSS framework for styling and layout.
- **Tailwind CSS Variable:** For global color declaration to maintain a clean and consistent UI.
- **Recharts:** A composable charting library for React.
- **ShadCN UI:** A customizable component library for building accessible and customizable UI components.
- **GetJustd:** A utility library for simplifying common JavaScript tasks.
- **Framer Motion:** A library for creating animations and gestures in React.
- **React Gauge Components:** Components for creating gauge charts in React.
- **Socket.io-client:** A library for real-time, bidirectional communication between web clients and servers.
- **xlsx:** A library for reading and writing Excel files in JavaScript.

## Code Structure

*   `src/components`: React components for building the user interface.
*   `src/pages`: React components for different pages of the application.
*   `src/styles`: CSS and styling-related files.
*   `src/utils`: Utility functions and helper methods.
*   `App.jsx`: The main application component.
*   `main.jsx`: Entry point for the React application.

## Installation

### Prerequisites

*   Node.js, npm (Node Package Manager) & react must be installed on your system.

1. **Clone the repository:**

    ```
    git clone https://github.com/KAVIRAJec/Iot-Application.git
    ```

2. **Navigate to the frontend directory:**

    ```
    cd frontend
    ```

3. **Install dependencies:**

    ```
    npm install --legacy-peer-deps
    ```

    *(The `--legacy-peer-deps` flag is used to handle potential peer dependency conflicts. You may or may not need it depending on your npm version and dependency tree.)*
    
4. Create a `.env` file and add your environment variables values which are required as defined in sample.env file.

## Usage
1. **Start the development server:**

    ```
    npm run dev
    ```

## Contributing

Contributions are welcome! Please submit pull requests or open issues for any improvements or new features.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Submit a pull request to the main branch.

## License

This project is licensed under the MIT License.