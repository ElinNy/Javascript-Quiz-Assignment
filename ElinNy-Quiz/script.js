/* I start with initializing my references to the DOM and my variables  */
const classmatePic = document.querySelector('#classmatePic');
const numberOfStudents = document.querySelector('#numberOfStudents');
const nameList = document.querySelector('#nameList');
const altOne = document.querySelector('#alt1');
const altTwo = document.querySelector('#alt2');
const firstLi =document.querySelector('#first');
const secondLi =document.querySelector('#second');
const thirdLi =document.querySelector('#third');
const fourthLi =document.querySelector('#fourth');
const pointsHere = document.querySelector("#points");
const result = document.querySelector("#result");
const noPoints = document.querySelector("#noPoints");
const imageEl = document.createElement('img');
const random = [...students];
let slicedArray;
let count = 0;
let points;
let noRight = 0;
let totalScore = 0;
/* Adding the class "hide" to the scores that show during the game */
pointsHere.classList.add("hide");
noPoints.classList.add("hide");
/*  Here I start to push in the name of the current student that shows. 
    I have then made two iterations where as I start a while loop and randomize a number from
    zero up to the length of the array where we get our object (aka the students).
    Then I use a for loop to iterate over the length of the names that will show under the rendered image.
    In that for loop i check if the current name is equal to the one that is placed in the array I've created to 
    show the four names under the image. If it is, I change it to true and then break out of the for loop.
    I then check if it is not true (!found) and if it is, I push it in to the array.
    I then randomize the array so they always change the order they are rendered and render it out on the list items in the html.
*/
function placeNames(name){
    let i= 0;
    let minArray = [];
    minArray.push(name);
    while(i < 3){
        const miniRandom = Math.floor(Math.random() * random.length);
        let found = false;
        for(let j = 0; j <= i; j++){
            if(random[miniRandom].name === minArray[j]){
                found = true;
                break;  
            } 
        } 
        if(!found){
            minArray.push(random[miniRandom].name);
            i++;
        }
    }
    minArray = minArray.sort(() => .5 - Math.random());
    firstLi.innerHTML = `${minArray[0]}`;
    secondLi.innerHTML = `${minArray[1]}`;
    thirdLi.innerHTML = `${minArray[2]}`;
    fourthLi.innerHTML = `${minArray[3]}`; 
}
/*  Here I reset the points and randomize the copied array of students and slice it. 
    I slice it to the value of the paramater when I call the function. The paramater is the number of students I want to get out of the array.
*/
function randomList(numberOfImages){
    points = 0;
    noRight = 0;
    count = 0;
    slicedArray = random.sort(() => .5 - Math.random()).slice(0,numberOfImages);
}
/*  Here I render the image by setting the src to the current imgae that shows. 
    I also call the function placeNames where I send in the current student name.
*/
function renderPics(currentStudent){
    classmatePic.setAttribute('src', slicedArray[currentStudent].image);
    placeNames(slicedArray[currentStudent].name);
}
/*  Here I make a function where I check if the name is equal to the current guess.
    If it is, then I increase the value of the variable "points" by 1. And if it's not, then I increase the value of the variable "noRight".
*/
function placeInNameListEvent(currentGuess){
    if(slicedArray[count].name === currentGuess){
        points++;
        pointsHere.innerHTML = `${points} right`;
    } 
    else {
        noRight++;
        noPoints.innerHTML = `${noRight} wrong`;
    }
}
/*  Here is where i make a click event to see what the target the user clicks on using a selection and 
    I call the function above and send in the targets innerHTML as a parameter to the function. 
    I also call my function where I render the next image that in the slicedArray. When the length of the array is 
    at its end I call the function "endGame", which shows the score you've made in the game.
*/
nameList.addEventListener("click", e => {  
    if(count < slicedArray.length - 1){
        placeInNameListEvent(e.target.innerHTML);
        count++
        renderPics(count);
    }
    else {
        placeInNameListEvent(e.target.innerHTML);
        endGame();
    }
});
/*  Here is my end function. I toggle to make sure that things that needs to show (the score and the number of alternatives to play the game again)
    "unhide" and to hide the image and list of names.
*/
function endGame(){
    pointsHere.classList.toggle("hide");
    noPoints.classList.toggle("hide");
    classmatePic.classList.toggle("hide");
    nameList.classList.toggle("hide");
    numberOfStudents.classList.toggle("hide");
    result.classList.toggle("hide");
    result.innerHTML = `You got ${points}/${totalScore} right! <br> Do you want to guess again?`;
    pointsHere.innerHTML = `&#9829;`;
    noPoints.innerHTML =`&#9829;`;
}
/*  Here is the buttons where you can choose how many images you want to guess.
    I made a click event and using selection to call the randomList function where the number of images is
    sent in as a parameter. I also call the renderPics function to render the image when you click on the buttons
*/
numberOfStudents.addEventListener("click", e => {
    pointsHere.classList.remove("hide");
    noPoints.classList.remove("hide");
    nameList.classList.remove('hide');
    if (e.target === altOne) {
        result.classList.add("hide");
        numberOfStudents.classList.toggle("hide");
        classmatePic.classList.remove("hide");
        totalScore = 10;
        classmatePic.append(imageEl); 
        randomList(10);
        renderPics(0);
     } 
    else if (e.target === altTwo){
        result.classList.add("hide");
        numberOfStudents.classList.toggle("hide");
        classmatePic.classList.remove("hide");
        totalScore = 20;
        classmatePic.append(imageEl); 
        randomList(20);
        renderPics(0);
     } 
     else {
        result.classList.add("hide");
        numberOfStudents.classList.toggle("hide");
        classmatePic.classList.remove("hide");
        classmatePic.append(imageEl); 
        totalScore = random.length;
        randomList();
        renderPics(0);
    }
});
