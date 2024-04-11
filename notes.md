##### Notes for CS260
- Remember to create the repo in GitHub instead of your console, you'll run into less problems.
- Remember where you are in the directory before you clone a repo.
[Link to MergeConflict File](conflictTest.md)

## HTML structure
- I learned a couple new commands in HTML:
    - <img src="" alt = "" width="">
    - Quote like \<!-- -->
    - the table syntax
- things from the project that I learned
    - things get complicated pretty fast, there's tons and tons of HTML pages you have to create
    - A dataBase will need to be accessed multiple times to complete a transaction
    - It's pretty tedious to write out the structure for every page
    - Just like any other language, HTML also has libraries
    - A calendar feature is available
        - Chances are when you spend a ton of time trying to create something specefic for your website it probably already exists. I was thinking of how to add a calendar into my system. I was going back and forth on the structure, but I concluded a 4x7 table that would have a form in every box that would pull from the database to show what was avaialble on which days. After psending about 20 min thinking and starting to implement I thought to myself someone else has to have implemented this before so i looked it up and there's libraries for calendars
    - Copy & Paste as much as you can from the previous files. I realized that my header looks pretty similar in all my files so I just copy and pasted the header and the footer and i changed the body to contain all the info i needed
    - how to deploy
        - ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup
 
## CSS 
- For this deliverable I got my application close to the end styling.
- I made 10 pages once again. I made the header and the footer consistent across all of them.
- My app looks great on all window sizes and devices
- I used good spacing and contrast
- I used consistent fonts accross my app

## LOGIN
- I learned the hard way that JSON needs to be under a certain length to be sent
- I also learned that json objects need to be objects and not strings
./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s startup


## React 
- import 'bootstrap/dist/css/bootstrap.min.css';
    need to first do 
    npm install bootstrap react-bootstrap
    npm install react react-dom react-router-dom
    EXAMPLE:
import Button from 'react-bootstrap/Button';
    
export function NavButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <Button variant='primary' onClick={() => navigate({ url })}>
      {text}
    </Button>
  );
}
