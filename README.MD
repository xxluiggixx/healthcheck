# HealthCheck

Welcome to HealthCheck repository! This project is a software that checks if a port is open by sending an HTTP request to the specified host and port. It provides a simple and straightforward way to verify the accessibility of a port on a given host.

## Features

- Checks the availability of a specific port on a host by sending an HTTP request.
- Can be easily integrated into existing scripts or used as a standalone tool.
- Send notification via email (SMTP_ENABLE=true)
- Send notification via slack (SLACK_ENABLE=true)
- Stablish time healtcheck (TIME_INTERVAL=60000 mili sec)

## Pre-requirements

Before using this software, please ensure that you have the following:

- ssh key pair installed.

## Installation

To install the software, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/xxluiggixx/healthcheck.git
   ```

2. Install the necessary dependencies:

    ```bash
   npm install
   ```

3. Create the config/hosts.js file and .env file with the required configuration. You can use the provided .env.example file as a template.

    ```
      ##<<<< Software config >>>> 
      PathPrivateKey=/path/to/private/key
      LOG_ENABLE=true  <by default is false>
      SERVICE_CMD="systemctl restart tomcat"
      TIME_INTERVAL=60000
      ## <<<<<----Mail Config---->>>>>
      SMTP_ENABLE=true
      SMTP_EMAIL_FROM=servicio@example.com
      #multi dest
      SMTP_EMAIL_TO=garcia@example.com,diaz@example.com,silvera@example.com
      SMTP_PORT=25
      SMTP_DOMAIN=smtp.example.com
      SMTP_SECURE=false
      SMTP_USERNAME=servicio
      SMTP_PASSWORD=1234567
      ## <<<<<----Slack Config---->>>>>
      SLACK_ENABLE=true
      URL_SLACK=https://hooks.slack.com/services/asdasdasdasdasdasdasdasd
    ```

4. Set on .env file TIME_INTERVAL value. Default value 60000 = 1 min
5. Recommend execute this program with pm2 enviroment 

## Usage

  To run the software, execute the following command:

     npm start

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your modifications.
4. Commit and push your changes to your fork.
5. Submit a pull request.
