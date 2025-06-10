# IoT Application for Project Visualization & Management

## Overview

This IoT application was developed specifically for the IoT special lab at my College to manage and monitor IoT (Internet of Things) projects. It aims to bridge the gap between hardware and software integration, particularly for first-year students or those from non-computing backgrounds who are new to web dashboard development.

![alt text](login.png)

## Problem It Solves

The application addresses several key challenges:

- **Integration Complexity:** Simplifies the integration of hardware and software components, making it easier for beginners to work with IoT projects.
- **Data Latency:** Reduces data latency by Socket IO, also allowing for local server deployment, which can operate offline without internet connectivity.
- **Alert System:** Sends alert emails in case of abnormalities detected in the system, ensuring timely intervention(requires internet).

## Key Features

- **Custom Arduino Library:** Developed to reduce complexity and promote clean code, making it easier for students to integrate Arduino devices.
- **Tutorial Page:** Includes a tutorial section on the website that guides users through API endpoints, coding, and attachment sending.
- **Project Management:** Users can manage projects and sensors, with visualization capabilities.
- **Admin Dashboard:** Faculty members can view user projects, track lab activities, and present reports to higher authorities, showcasing both hardware and software support.



## Technologies Used

- **Frontend:** React, Tailwind CSS, ShadCN UI, GetJustd, Recharts.
- **Backend:** Node.js, Express, MySQL, Prisma ORM, Socket.IO, JWT (JSON Web Tokens), Nodemailer, bcrypt.
- **Custom Arduino Library:** For seamless integration with Arduino devices.(This project can be used with any WiFi based Microcontroller not only limited to Arduino)

## Future Development

This project is designed to be extensible. Future enhancements could include implementing new API functionalities, expanding device support, and enhancing offline capabilities.

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.