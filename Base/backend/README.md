# Backend
The backend of the Drone DT E-commerce.
<br />

## Pre-requisite
* Have a MongoDB account and create a new cluster (To store products, users, orders)
* Have a Cloudinary account (To convert uploaded product images to URL)
<br />

## How to Run Backend Locally
1. Navigate to the Backend Directory
```bash
cd clothix/backend
```
s
3. Create .env File and Configure Environment Variables (Anything with < > you have to configure)
```bash

MONGODB_URI = "<YOUR MONGODB CONNECTION STRING>"
CLOUDINARY_NAME = "<YOUR CLOUDINARY CLOUD NAME>"
CLOUDINARY_API_KEY = <YOUR CLOUDINARY API KEY>
CLOUDINARY_SECRET_KEY = "<YOUR CLOUDINARY API SECRET>"
JWT_SECRET = "<YOUR SECRET>"
ADMIN_EMAIL = "admin@clothix.com"
ADMIN_PASSWORD = "admin123"
```

4. Run the Backend
```bash
npm run server

NietoDveloper

2025
