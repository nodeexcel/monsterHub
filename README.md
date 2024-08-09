## RSSMonster
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

### Background
MonsterHub is a  web-based RSS aggregator developed as an alternative to one of my favorite tools, Google Reader. Motivated by the need to replace Google Reader for tracking RSS feeds, RSSMonster aims to replicate its functionality while offering modern enhancements.

### Features
- Lightweight and Responsive Design: Built using Vue.js 3 for the frontend and Express for the backend, RSSMonster leverages Bootstrap to ensure a fluid and responsive user experience.
- Google Reader-like Behavior: Mimics the behavior of Google Reader, such as marking items as read when you start scrolling and identifying trending content.
- Progressive Web App Support: Install RSSMonster as a PWA for a seamless experience across devices.
- Drag and Drop: Easily manage your feeds with intuitive drag and drop functionality.
- Dark Mode: Switch to dark mode for a comfortable reading experience in low-light environments.
- Fever API Compatibility: Fully compatible with the Fever API, allowing for integration with other RSS tools.

### Prerequisites
* NodeJS 16.x or higher
* Git
* A Mysql installation (other databases will as well with some configuration)

### How to get everything installed
* Clone this repository `git clone https://github.com/nodeexcel/MonsterHub.git.`
* Run `npm install` in both the `client` and `server` folder
* Find the `.env.example` file in the root of both the `client` and `server` folder. Copy and rename the files to `.env`
* Edit `.env` inside the `server` folder and enter your Mysql or Database server login data (at least fill DB_DATABASE, DB_USERNAME and DB_PASSWORD).
* Edit `.env` inside the `client` folder. Change the VITE_APP_HOSTNAME, so it points to the back-end.
* Run `./node_modules/.bin/sequelize db:migrate && ./node_modules/.bin/sequelize db:seed:all` in side the `server` folder. this will add all needed database tables and content to your mysql database. Alternatively you can also uncomment the `//force:` true in the app.js inside the server folder to create the schema structure.
* Optional: Add a cronjob to crawl http://localhost/api/crawl every 5 minutes.

### Development
If you would like to run RSSMonster in development mode I recommend to run:
- Inside the client folder: `npm run dev`.
- Inside the server folder: `npm run debug`.

### Production
If you would like to run RSSMonster in production mode I recommend to run:
- Update the `VITE_APP_HOSTNAME` and `VITE_NODE_ENV` inside the file `client/.env`. Most likely you want to remove port 3000 and point to the url where the backend will be running. For production, make sure you set the `VITE_NODE_ENV` to `production`.
- Update the `NODE_ENV` inside the file `server/.env`. For production, make sure you set the `NODE_ENV` to `production`.
- Inside the client folder build all the static files with: `npm run build`.
- Move the `dist` output folder created inside the `client` folder to the `server` folder. The NodeJS server is also capable of serving out static content.
- Inside the server folder: `npm run start`.

### Docker for development
- Run the following command to build all the images: `docker-compose build`
- Run the following command to start the containers: `docker-compose up`
- The client will be running on port 8080 and communication with the backend takes place via 3000. Make sure these ports aren't being used. The mysql database is accessible via port 3306.

### Docker for production
The production version has the server and client combined into a single container. The VueJS is also compiled into an optimized version. To build this single image, run the following command: `docker build -t rssmonster .`
Lastly you need to run the docker container. You need to provide the correct environment variables for the database server to connect to. Here's is an example: `docker run -d -t -i -e NODE_ENV=production -e DB_HOSTNAME=localhost -e DB_DATABASE=rssmonster -e DB_USERNAME=rssmonser -e DB_PASSWORD=password -p 3000:3000 rssmonster`


### Contributions
I welcome contributions and new features from the community. Feel free to fork the repository and submit pull requests.

#### Credits
The following scripts and plug-ins are used within RSSMonster

* NodeJS https://nodejs.org/en/
* Twitter bootstrap: https://twitter.github.io/bootstrap/
* feed-parser: https://github.com/rowanmanning/feed-parser
* VueJS: https://vuejs.org/