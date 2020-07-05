# Adventure Capitalist Clone


![Adventure Capitalist game screen](https://i.ibb.co/dtbLhL5/adventure-capitalist.png)
# About
The project is an idle business based game implementing the standard invest-to-earn scheme. This solution is focused on **front-end** side only, but providing full game functionality at the cost of cross browser/device gameplay (your progress won't be available on desktop, if you've been playing on mobile and vice-versa).

The game simulates money earning while pressing the **round** business produce button and enables you to invest more money into the given business upgrades (**buy** button). There is also a possibility to **hire** a manager, who along with the player, earns money by working on a specified resource. Managers work also while the user is offline, so it is really worth hiring them!

Don't you ever be afraid to close the web browser! 
As long as you don't open the game in the incognito mode whatsoever (including modes without saving local storage), your progress will be saved - and what's even better, the managers will provide you with some nice offline money procs!

You can find live and running game [here](https://radiant-escarpment-86766.herokuapp.com/). Enjoy!

# Getting started
 1. Clone or download the repository package
 2. run `npm install` command in the projects root (and ensure you have node/npm installed :) )
 3. run `npm start`for live reload server, `npm run dev` for 'dev' build or `npm run build` for production, minified build (builds have to be server over a node server btw - **http-server** should suffice)
 4. gl & hf, the game should be served by default on **localhost:8080** or on any iterated, not busy port

# Technical Choices

The game utilizes the power of GPU accelerated graphical library [PIXI.js](https://www.pixijs.com/), along with a bit of [GSAP](https://greensock.com/gsap/) tweaning/easing library and some sounds usage also provided by [PIXI plugin](https://pixijs.io/pixi-sound/examples/#section-library).
Current state of the player's progress is handled by **localStorage** modern browsers mechanism.
Base/early configuration for the game (user, businesses and managers) is held by JSON files, which are parsed by the **webpack** core.
Whole solution is built and developed, as said before, with a strong usage of [webpack](https://webpack.js.org/).
For the deploy I've chosen free [heroku solutions](https://dashboard.heroku.com/apps), with simple CLI config interface.

## Technical trade-offs

### Solution side
As (probably) every application in the world, the whole solution might've been built as a full-stack app, with a strong usage of databases and restful or web socket connection with the client. That being said, might've cost a lot more time while adding only persistence profile at the cost of registering the user and keeping his data in the database. It might've been a viable (and good) choice, however wouldn't meet deadline date.
### What's missing

 - **Tests** - tests are really important to ensure stability of the application; even the base (unit) ones might be really helpful during the development and maintenance phase of the project.
 - JSDoc's - as long as the application is kept in a predefined architectural model (and the [code explains itself](https://scontent.fwaw3-1.fna.fbcdn.net/v/t1.0-9/65425324_2477679815616588_4756914221508198400_n.jpg?_nc_cat=105&_nc_sid=8024bb&_nc_oc=AQlFiRCsPqcKGcnynFng2WXAK85FGHhFE57JvsfQM4g-gowbsVHUuJKNPBwld5bF8do&_nc_ht=scontent.fwaw3-1.fna&oh=9703a4be4ec2f7d5ac5e7b7188a820e6&oe=5F2611F9)) and there's only one developer, they are not required, however they are really appreciated anytime you want to know how something works
 - animations - the feeling of the game might have been took into a whole new level with some particles and animations
 - cross browser/device persistence - as said before, enables a user to have fun using the app anywhere he wants - just log in and enjoy
### Improvements
Oh there's a lot of those, the most welcomed ones I could think of are:
 - add a possibility to buy multiple of an item business
 - add a share for manager, so you still earn money automatically and he doesn't die from hunger
 - gamification - achievements
 - skill tree with perks to even further upgrade your company
 - random events - such as discounts for selected products, or gangsters disturbing you at work (hello [Fast Food Tycon](https://en.wikipedia.org/wiki/Fast_Food_Tycoon))
 - many many more...
# About author
Hey! come check out my profile on [linkedin](https://www.linkedin.com/in/pawe%C5%82marciniec/).
