# Real-time Spotify application

In this application users can add songs to the same playlist on the same time. When the owner of the playlist (me) will listen to the song you have add for the first time, you will receive a message. You need to fill in a song you can pick from the Spotify library. Don't you have inspiration at the moment? You can pick one of my recommendation songs of Last.fm.

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

## Project information
So as you have read before, I'm using the Spotify Web Api and Last.fm Api as well. For both API's there are a few things you need to know in case you want to work further on this project:

Spotify:
* Rate-limit:
* Authorization:
* Endpoint(s):

Last.fm:
* Rate-limit: [API Terms of Service](https://www.last.fm/api/tos)
> You will not make more than 5 requests per originating IP address per second, averaged over a 5 minute period, without prior written consent.

* Authorization:
* Endpoint(s):


<!-- Include the sketch you made in class and describe what the real-time aspect of your project will entail. -->

## How to install
First of all, download or clone the project, navigate to the root folder and install dependencies.

`npm install`

Run `npm start` to start the server on port 8000.

## Tooling
- [x] Server: express
- [x] Templating: ejs
- [x] Real-time: socket.io

## Features
<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- Where do the 0️⃣s and 1️⃣s live in your project? What db system are you using?-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->

## Process

> Note that, when using the Web API, only the owner of a collaborative playlist can make changes to that playlist.

NOOOO, WHY?

> We only allow users to add songs to their own playlists, because if collaborative playlists were open to the world, API consumers would be able to search for collaborative playlists and add whatever songs they wanted to any playlist. Until we solve the problem of permissions delegation in a satisfactory manner, we won't implement this feature - so don't expect it in the short term.

https://blog.cloud66.com/3-tips-for-selecting-the-right-database-for-your-app/
https://firebearstudio.com/blog/node-js-database.html
https://www.npmjs.com/package/mysql
https://medium.com/@eligijuskrepsta/setting-up-node-mysql-and-nginx-on-digital-ocean-247546be20df
https://github.com/dwyl/how-to-choose-a-database

mysql problem:
https://stackoverflow.com/questions/49194719/authentication-plugin-caching-sha2-password-cannot-be-loaded
