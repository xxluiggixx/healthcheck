# HealthCheck

Welcome to the Project Name repository! This project is a software that checks if a port is open using the `nc` command. It provides a simple and straightforward way to verify the accessibility of a port on a given host.

## Features

- Checks the availability of a specific port on a host using the `nc` command.
- Provides information about whether the port is open or not.
- Can be easily integrated into existing scripts or used as a standalone tool.

## Pre-requirements

Before using this software, please ensure that you have the following:

- A Linux system to run the software.
- The `netcat` package installed on your system.

## Installation

To install the software, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/xxluiggixx/healthcheck-nginx-tomcat.git
   ```

2. Install the necessary dependencies:

    ```bash
   npm install
   ```

3. Create the servers.js file and .env file with the required configuration. You can use the provided .env.example file as a template.

4. Set up a cron job using crontab to schedule the desired task:

    ```bash
    crontab -e
    ```

    Add the following line to the crontab file to schedule the job:

    ```
    * * * * * /path/to/node /path/to/servers.js >> /path/to/logfile.log 2>&1
    ```

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
