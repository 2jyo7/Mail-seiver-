![Screenshot (173)](https://github.com/user-attachments/assets/c8ca0fc0-9069-4897-b656-38f7ff466de5)
![Screenshot (172)](https://github.com/user-attachments/assets/04d9a90b-2109-4256-a3ab-ab17c9655996)
# Gmail Email Filtering App

This is a web application that connects to a user's Gmail account to fetch, filter, and categorize their emails. It features an intuitive UI that allows users to filter emails by category, search for specific emails, and preview email content. The app also displays analytics, including the total number of emails and category-wise breakdowns.

## Features

- **Authentication**: Sign in with your Google account using [NextAuth.js](https://next-auth.js.org/).
- **Email Categorization**: Emails are categorized into different categories like `Primary`, `Social`, `Promotions`, etc.
- **Search & Filter**: Filter emails by category and search by subject or snippet.
- **Email Previews**: Click on any email to preview its content.
- **Analytics Panel**: View analytics, including the total number of emails and a breakdown of emails by category.
- **Error Handling**: Handles errors like failed email fetch requests with informative messages.

## Technologies Used

- **Frontend**:

  - [Next.js](https://nextjs.org/) for the React framework.
  - [Tailwind CSS](https://tailwindcss.com/) for styling.
  - [NextAuth.js](https://next-auth.js.org/) for authentication with Google.

- **Backend**:
  - [Next.js API routes](https://nextjs.org/docs/api-routes/introduction) to handle backend logic.
- **Email Categorization**:

  - Categorize emails based on subject and snippet using custom logic.

- **Email Analytics**:
  - Simple analytics that show the total number of emails and category counts.

## Installation

To get the project up and running on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/email-filtering-app.git
cd email-filtering-app
2. Install dependencies
Make sure you have Node.js installed. Then run:

bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env.local file in the root of the project and add the following variables:

env
Copy
Edit
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
You can obtain the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET by setting up a project in the Google Developer Console.

4. Run the development server
Now, you can run the development server:

bash
Copy
Edit
npm run dev
The app should now be running at http://localhost:3000.

Usage
Sign in with your Google account to access your Gmail inbox.

Use the search bar to search for emails by subject or snippet.

Select a category to filter emails based on category (e.g., Primary, Social, etc.).

Click on any email in the list to preview the content.

Contributing
If you would like to contribute to this project, feel free to open a pull request or submit an issue. Here's how you can get started:

Fork the repository

Create a new branch for your changes

Make your changes and commit them

Push your changes to your fork

Create a pull request with a description of your changes

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Next.js

NextAuth.js

Tailwind CSS

Google Developer Console

vbnet
Copy
Edit

### Notes:
- Replace `yourusername` in the repository clone URL with your actual GitHub username.
- Replace `your_secret_here`, `your_google_client_id_here`, and `your_google_client_secret_here` with the actual values from your Google Developer Console setup.

This README covers installation, features, usage, and contribution guidelines to help anyone understand the purpose of the project and how to get started. Let me know if you'd like any further additions!







```
