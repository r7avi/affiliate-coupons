# My Affiliate Coupons

This is a Next.js project that provides a platform for users to find and use affiliate coupon codes. The application features a user-friendly interface to browse coupons by category, with the ability to reveal coupon codes on click.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/my-affiliate-coupons.git
   cd my-affiliate-coupons
   ```

2. Install the dependencies for both the frontend and backend:

   ```bash
   npm install
   cd backend
   npm install
   ```

3. Create a `.env.local` file based on the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env.local` file with your API base URL and any other necessary environment variables:

   ```plaintext
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   
      

### Running the Development Server

To run both the frontend and backend servers concurrently, use the following command:
   ```bash
   npm run dev
   ```


This will start the Next.js development server and the backend server. You can access the application at [http://localhost:3000](http://localhost:3000).

### Project Structure

- **src/**: Contains the main application code.
  - **app/**: Contains the Next.js pages and components.
  - **globals.css**: Global styles for the application.
- **backend/**: Contains the backend server code.
  - **server.js**: The main server file for handling API requests.
  - **addCoupons.js**: Script to add initial coupon data to the database.
- **package.json**: Contains project metadata and dependencies for both frontend and backend.

### Features

- Browse coupons by category (Electronics, Fashion, Home & Garden).
- Click to reveal coupon codes.
- Responsive design for a better user experience.

### Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB (with Mongoose)

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing coupon data.
