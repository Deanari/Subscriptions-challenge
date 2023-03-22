# Subscriptions-challenge

Hello there. This is a subscriptions challenge made in Next.js and MySQL

### How do I get set up? ###
* npm install
* Create your mysql database on your favourite provider
* Replicate the schema with './database/main-schema.sql'
* Create an .env file at root with the following variables:
    - DATABASE_HOST: Your db host, or by default -> localhost
    - DATABASE_USER: Your db user, or by default -> root
    - DATABASE_PASSWORD: Your db password, or by default -> password
* npm run dev

### How do I use this? ###
* run the project
* go to http://localhost:3000/
* Edit amount, interval, next donation

### Troubleshoot ###
* Client does not support authentication protocol...
    - run in mysql ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

### Choices ###
Handling concurrency:
    * In order to prevent modifications to a subscription that is in donation process, I added a new column is_reserved to Subscription, to reserve the resource until the donation is completed and prevent other services from updating.
    * In order to handle payment delays there is a column in Donation table to check when considering last donation, this could be linked to a webhook.

### TODO ###
* Validations on PATCH