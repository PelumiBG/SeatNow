## SeatNow - An Event Registration App
- SeatNow is an **Event Registration App** that allow Organizers to book an Event and attendees can book a space

## TABLE OF CONTENT
- [features](#features)
- [Technologies Used](#technologies-used)
- [set-up instructions](#setup-instructions)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Future Improvements](#future-improvements)


## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **validation**: , express-validator for input validation
- **Testing**: Postman
- **Environment Management**: dotenv

## Setup Instructions

1. Make sure you have **Node.js** installed 
 - [download from nodejs.org](https://nodejs.org/)
2. Install MySQL if you haven't done that already, create an account
 - https://www.mysql.com/products/workbench/
3. Clone this repository 
 - git clone https://github.com/PelumiBG/SeatNow.git
   cd SeatNow
4. Install the required packages by running `npm install`

## How to Run

1. Create a `.env` file in the root directory with these variables:
   ```
   DB_NAME=your_database_name
   JWT_SECRET=your_secret_key
   PORT=4000
   ```

2. Start the MySQL server

3. Run the application:
   ```
   node app.js
   ```

4. Open your browser and go to `http://localhost:4000/api`

## Project Structure

```
Job-Board-App/
│
├── src/
│   ├── config/
│   │   └── db.js                       # Database connection setup (MySQL)
│   │
│   ├── Controllers/
│   │   ├── registrationController.js      # Manages registration for event
│   │   ├── adminController.js         # Handles admin control
│   │   ├── eventController.js        # Manages Event Logic
│   │
│   ├── Middleware/
│   │   ├── authMiddleware.js          # JWT verification and admin protection
│   │   ├── errorHandler.js      # Centralized error handling
|   |   └── roleMiddleware.js   # admin 
│   │
│   ├── Models/
│   │   ├── index.js               # Association schema
│   │   ├── registration.js            # Registeration schema
│   │   ├── event.js           # Event schema
│   │   ├── user.js              # user shema
|   |
│   ├── Routes/
│   │   ├── eventRoute.js          # /api/event
│   │   ├── authRoute.js             # /api/register
│   │   ├── registration.js            # /api/register-event
│   │
│   ├── Services/
|   |   ├── emailServices.js       # sends confirmation email after registration.
|   |   ├── admin.js         # seed admin
│   │   └── userService.js           # handled the registration and login route
|   |
|   ├── utils/
|   |    ├── generateToke.js      # Generate token for all users
|   |    └── paginate.js         # Handled the workload of pages sent to the server at a time
|   |    └── sendmail.js     
|   |
|   ├── validator/ 
|   |    ├── eventValidator.js          # input validator for event
|   |    ├── registrationValidator.js      # input validator for registration
|   |    └── userValidator.js       # input validator for users 
|   |
│   ├── app.js                          # Express app setup and middleware configuration(Entry Point)
│
├── .env                                # Environment variables
├── .gitignore                          # Ignored files for git
├── package.json                        # Project dependencies 
└── README.md                           # Project documentation
```

## HOW IT WORK

1. SeatNow is an Event app that allows organizers to book a space 
2. Event Organizers Register their event on the app
3. Users can register an account to book a seat.

## Future Improvement
1. Add Admin Dashboard.