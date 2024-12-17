# **College Appointment System API**

This is a RESTful API built with the **MERN stack** (MongoDB, Express.js, Node.js) for managing appointment bookings between students and professors. It includes authentication, appointment management, and availability scheduling functionalities. The API is secured with **JWT tokens** and includes automated end-to-end testing.


## **1. Features**

- **User Management**:  
  - Register and login as **Student** or **Professor**.  
  - Logout and retrieve user profiles.  

- **Availability Management**:  
  - Professors can set and update their available time slots.  
  - Students can view available slots.

- **Appointment Management**:  
  - Students can book appointments.  
  - Professors can view or cancel appointments.

- **Authentication**:  
  - Protected routes using **JWT tokens** stored in HTTP-only cookies.

- **Testing**:  
  - End-to-end tests (E2E) validate API flows and user interactions.

---

## **2. Technologies Used**

- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT, Bcrypt.js  
- **Testing**: Jest, Supertest  
- **Environment Management**: Dotenv  
- **Tools**: Postman for API testing  

---

## **3. Installation and Setup**

### Prerequisites:
- Node.js and npm installed on your machine.  
- MongoDB database (MongoDB Atlas or local instance).  

---

### **Steps to Set Up the Project**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tyagiharsh607/college-appointment-system/
   cd college-appointment-system
