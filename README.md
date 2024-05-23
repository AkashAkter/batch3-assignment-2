# E-Commerce

This Express application, developed with TypeScript, effectively manages data using MongoDB and Mongoose. It emphasizes data integrity through Zod validation, ensuring that stored data meets predefined standards. Its modular design and RESTful APIs facilitate scalability and maintainability, making it a robust solution for various web applications.

## Features

- Utilization of an Express server written in TypeScript.
- Integration of MongoDB facilitated by Mongoose.
- Implementation of distinct modules for Product and Order, encompassing suitable data types and validations.
- Assurance of data integrity through validation procedures employing Zod.
- Provision of RESTful API endpoints dedicated to the management of products and orders.

## Prerequisites

- Node.js (v22.2.0 recommended)
- MongoDB
- npm
- Git

# Installation

## Clone the repository

```sh
 git clone  https://github.com/AkashAkter/batch3-assignment-2
cd batch3-assignment-2
```

## Install dependencies

Navigate to the project directory in the terminal and execute npm install

```sh
npm install
```

## Set up environment variables

Create a `.env` file in the root directory and add the following:

```
MONGO_URI=your_mongo_db_connection_string
PORT=5000
```

## Start the server

```
npm run start:dev
```
