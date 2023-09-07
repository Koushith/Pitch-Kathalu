

# Pitch Kathalu

## Project Overview

"Pitch Kathalu" is a platform that allows aspiring storytellers to pitch their story scripts. After successfully completing the initial screening phases, the selected scripts will be considered for production. To submit a story script, users are required to pay a registration fee of ₹200.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your system
- MongoDB installed locally or a cloud-based MongoDB service

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/pitch-kathalu.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pitch-kathalu
   ```

3. Install server dependencies:

   ```bash
   npm install
   ```

4. Navigate to the client directory:

   ```bash
   cd client
   ```

5. Install client dependencies:

   ```bash
   npm install
   ```

6. Return to the project root directory:

   ```bash
   cd ..
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```
   PORT=8000
   MONGODB_URI=your-mongodb-connection-uri
   INSTAMOJO_API_KEY=your-instamojo-api-key
   INSTAMOJO_AUTH_TOKEN=your-instamojo-auth-token
   ```

   Replace `your-mongodb-connection-uri`, `your-instamojo-api-key`, and `your-instamojo-auth-token` with your actual MongoDB connection URI and Instamojo API credentials.

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   The backend server will run on port 8000.

2. Start the client:

   ```bash
   cd client
   npm start
   ```

   The client will run on port 3000 by default. You can access the application in your web browser at `http://localhost:3000`.

## Tech Stack

- **MERN Stack** (MongoDB, Express.js, React, Node.js) for full-stack development.
- **Instamojo Payment Gateway** for handling registration fee payments.

## Screenshots

<img width="1783" alt="Screenshot 2023-09-06 at 3 35 00 AM" src="https://github.com/Koushith/Pitch-Kathalu/assets/30016242/d1072a6b-e8c4-4bef-8ef5-24b60fe2fa39">
<img width="1783" alt="Screenshot 2023-09-06 at 3 23 10 AM" src="https://github.com/Koushith/Pitch-Kathalu/assets/30016242/2368758b-78db-4e41-9f26-b33f32439403">
<img width="1783" alt="Screenshot 2023-09-06 at 3 24 08 AM" src="https://github.com/Koushith/Pitch-Kathalu/assets/30016242/92313905-ab89-4635-a961-076f80be2cd4">
<img width="1370" alt="Screenshot 2023-09-06 at 3 35 46 AM" src="https://github.com/Koushith/Pitch-Kathalu/assets/30016242/3bd4933d-7d31-4bef-bc16-3b3d2ec9aaee">
<img width="1370" alt="Screenshot 2023-09-06 at 3 36 38 AM" src="https://github.com/Koushith/Pitch-Kathalu/assets/30016242/981e470c-f818-41e5-8d9c-dbd1d80118e4">

## Usage

1. Visit the application at `http://localhost:3000`.
2. Sign up or log in to your account.
3. Complete the required profile information.
4. Click on "Submit Your Story Script."
5. Fill in the details of your story script and upload the script file.
6. Pay the ₹200 registration fee via Instamojo.
7. Your script will be reviewed, and if selected, it will be considered for production.


## License

This project is licensed under the [MIT License](LICENSE).

