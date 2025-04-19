# Project Setup Guide

## Installation
1. Install dependencies:
   ```bash
   npm i
   ```
2. Configure the database settings in the `.env` file

## Database Management
Create a new migration:
```bash
npx prisma migrate dev --name migrationName
```

## Running the Project
Start the development server:
```bash
npm run start:dev
```

## Development Tools
Run the linter:
```bash
npm run lint
```

## Important Notes
- Make sure to explicitly define access modifiers (public, private, protected) for all methods and attributes