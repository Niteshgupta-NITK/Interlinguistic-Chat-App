# InterLinguistic Chat Application

A chating platform where users from different linguistic groups can chat with each other in their own language. This platform aims to bring the language barrier down 

## Features

-   Users can Create/Join Rooms
-   Bad Words filter to prevent cuss speech
-   Language option on Interface


## Tech Stack

**Server:** Node, Express, MongoDB

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL` - MongoDB url either cloud or localhost for your database

`JWT_SECRET` - Jwt secret token 

`JWT_EXPIRY` -Jwt Token expiry days write as `xd` for token to expire in x days

`COOKIE_TIME` - Time to expire the cookie stored write number x for x days

`CLOUDINARY_NAME`- Cloudinary Cloud Name

`CLOUDINARY_API_KEY`- Cloudinary API key

`CLOUDINARY_API_SECRET`- Cloudinary  API Secret  string

`SMTP_HOST`- SMTP Host (smtp.mailtrap.io)

`SMTP_PORT`- SMTP Port (2525)

`SMTP_USER`- SMTP Username

`SMTP-PASS`- SMTP Password

`STRIPE_API_KEY`- Stripe API key

`STRIPE_SECRET`- Stripe Secret string

`RAZORPAY_API_KEY`- Razorpay API key

`RAZORPAY_SECRET`- Razorpay Secret String



## Run Locally

Clone the project

```bash
  git clone https://github.com/Niteshgupta-NITK/E-commerce-App
```

Go to the project directory and install dependencies

```bash
  cd E-commerce-App
  npm install
```

Start the server
```bash
  npm run dev
```

## Screenshots
![image](https://user-images.githubusercontent.com/56041569/179568648-10881054-1fa9-4a79-8058-2654cf3a3bb2.png)
![image](https://user-images.githubusercontent.com/56041569/179568720-8494d391-450b-4d1a-9115-37e1112db872.png)





## Authors

-   [@Niteshgupta-NITK](https://github.com/Niteshgupta-NITK)
