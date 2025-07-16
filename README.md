# Journal Frontend

A simple journal web application built with React, Bootstrap, and Tailwind CSS. Users can sign up, log in, and manage their journal entries securely.

## Features
- 🔒 User authentication (login/signup)
- 📝 Create, edit, and delete journal entries
- Responsive and modern UI
- Error handling for login/signup

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd journal-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
npm run build
```

## Project Structure
- `src/pages/` — Main pages (Login, Signup, Journal List)
- `src/components/` — Reusable UI components
- `src/contexts/` — React context for user state
- `src/api/` — API calls and authentication helpers

## API
This frontend expects a backend REST API (see `src/api/journalApi.js` for endpoints). Update the `baseURL` in `journalApi.js` if your backend URL changes.

## Customization
- Update styles in `src/App.css` or use Tailwind/Bootstrap classes.
- Change the logo or branding in the relevant components.

## License
MIT
