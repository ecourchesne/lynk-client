# LYNK - Modern Decoder Management

LYNK is a modern solution for managing decoders, clients, and subscriptions. This project consists of a **frontend** built with React and Vite, and a **backend** powered by NestJS and Prisma.

## Frontend

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/ecourchesne/lynk-client.git .
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

## Backend

### Project Setup Guide

#### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure the database**:
   - Update the `.env` file with your database connection string.

#### Database Management

- **Create a new migration**:
   ```bash
   npx prisma migrate dev --name <migration-name>
   ```

#### Running the Project

- **Start the development server**:
   ```bash
   npm run start:dev
   ```

#### Development Tools

- **Run the linter**:
   ```bash
   npm run lint
   ```