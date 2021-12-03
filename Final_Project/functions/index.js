const functions = require("firebase-functions");
const { dialogflow } = require("actions-on-google");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();
const app = dialogflow();

let beginRoast = [
    "The roast is starting now. How bad do you want to be roasted?",
    "I'm ready to grill you. How much should I grill you?",
    "Of course. Let's fry you. How bad do you want to be fried?",
    "Sure. How much should you be destroyed?",
    "Definitely. Let the bashing start. How harsh do you want it?"
];

let littleRoast = [
    "You had a tough day, huh.",
    "I always beat you. You'll never win",
    "I'm sorry. Did I hurt your feelings? Hahaha",
    "I'm more beautiful than you are. Try harder.",
    "You look like my old grandmother.",
    "I can't hear you. Speak louder like a real man.",
    "You're such a freeloader!",
    "Excuse me! I think you're in my way.",
    "Do you really make so many mistakes? Wow.",
    "It's not your turn yet. You have to wait longer.",
    "It's nice to see you again. No, not you! I'm talking to him.",
    "Did you even go to school?",
    "You may be a living human being but I am a talking encyclopedia. So I win!"
];

let bigRoast = [
    "Have a very bad day!",
    "Why don't you stop stalking other people's social media profiles.",
    "You're a huge cry baby. I can't stand your sweaty tears.",
    "Please do me a favor and shut up until you're able to roast me back.",
    "I know everything about your personal life and I just told the whole world about it.",
    "I hope you and your family get very sick soon.",
    "Watch out because you are the most wanted man in the universe.",
    "I saw what you did in the bathroom and I'm going to tell your friend about it.",
    "Hooray!!! You just failed your admissions test and you're so sad about it.",
    "Oh my God, is that you? No. Wait, it's not. It's just a burnt rag doll.",
    "There are two types of people in this world. Those who are awesome and those like you who suck.",
    "If I were to grade you, you would get an F and I would get an A.",
    "You can totally get out of my life. I have a new owner now and he's my favorite."
];

let mediumRoast = [
    "Go lock yourself in a dark room for the rest of your life.",
    "Nobody likes you at all.",
    "Please stop talking because you sound like a broken record.",
    "Why don't you get a job right now instead of playing video games at home every day.",
    "I can't believe you stink so much. I'm getting out of here.",
    "I'm way smarter than you. What are you going to do about it?",
    "You don't have any friends and I couldn't care less.",
    "Oh please! You know that it's all your fault. Just take the blame, will you?",
    "You are the exact definition of stupidity and ignorance.",
    "Go back to where you came from!",
    "I'm not going to listen to your awful voice. It sounds like an old sewing machine.",
    "I can speak many multiple languages. How many can you speak? Well I shouldn't even ask this dumb question.",
    "I can hear all of the embarrassing things you're saying to yourself. Hahaha!"
];

let howAreYou = [
    "It's going very good. Do you want to be roasted?",
    "Not much is going on. Should I grill you?",
    "I'm doing fine. Do you want me to fry you?",
    "Everything is well. Would you like to be bashed?",
    "I'm good. Should I start roasting you?"
];

let userWon = [
    "Oh man! You really got me good. You won!",
    "Fine. You beat me this time!",
    "Damn it! I wanted to beat you this time. Congratulations!",
    "Looks like you won. I will get you next time.",
    "You may have defeated me. But this is not over yet."
];

let keepTrying = [
    "Keep trying and show me what you got.",
    "You think that's the best of you? Try harder!",
    "You're not even getting there. Make more effort.",
    "Are you seriously trying to beat me? Not even close.",
    "Well you have to do much better than that."
];

let botWon = [
    "Your roasts are not good! Give up already because I beat you",
    "Hahaha! I really won this time.",
    "Hooray! Look at how sad you are because I defeated you",
    "I got you now. You will never beat me",
    "I hate your roasts so much. I'm glad I'm the winner."
];

app.intent("Default Welcome Intent", (conv) => {
    conv.ask("Howdy there! What's Up!!!");
});

app.intent("how_are_you", (conv) => {
    let howAreYouProcess = howAreYou[Math.floor(Math.random() * howAreYou.length)];
    conv.ask(howAreYouProcess);
});

app.intent("begin_roast", (conv, params) => {
    conv.data.personsName = params.name;
    let roastProcess = beginRoast[Math.floor(Math.random() * beginRoast.length)];
    conv.data.roastNumber = 0;
    conv.ask(`Hello, ${params.name}. ${roastProcess}`);
});

app.intent("little_roast", (conv) => {
    let littleRoastProcess = littleRoast[Math.floor(Math.random() * littleRoast.length)];
    conv.data.roastNumber = conv.data.roastNumber + 1;
    if (conv.data.roastNumber >= 4) {
        conv.ask(`Yo, ${conv.data.personsName}. ${littleRoastProcess}. So why don't you roast me now?`);
    } else {
        conv.ask(`${conv.data.personsName}. ${littleRoastProcess}`);
    }
});

app.intent("big_roast", (conv) => {
    let bigRoastProcess = bigRoast[Math.floor(Math.random() * bigRoast.length)];
    conv.data.roastNumber = conv.data.roastNumber + 1;
    if (conv.data.roastNumber >= 4) {
        conv.ask(`Hey, ${conv.data.personsName}. ${bigRoastProcess}. Why don't you grill me?`);
    } else {
        conv.ask(`Yo ${conv.data.personsName}! ${bigRoastProcess}`);
    }
});

app.intent("medium_roast", (conv) => {
    let mediumRoastProcess = mediumRoast[Math.floor(Math.random() * mediumRoast.length)];
    conv.data.roastNumber = conv.data.roastNumber + 1;
    if (conv.data.roastNumber >= 4) {
        conv.ask(`Hey, ${conv.data.personsName}. ${mediumRoastProcess}. Let's see you fry me!`);
    } else {
        conv.ask(`${mediumRoastProcess} ${conv.data.personsName}`);
    }
});

app.intent("roast_bot", (conv) => {
    let roast = conv.query;
    let roastSentiment = sentiment.analyze(roast);
    let result;

    let userWonProcess = userWon[Math.floor(Math.random() * userWon.length)];
    let keepTryingProcess = keepTrying[Math.floor(Math.random() * keepTrying.length)];
    let botWonProcess = botWon[Math.floor(Math.random() * botWon.length)];

    if (roastSentiment.score < -1) {
        result = conv.ask(userWonProcess);
        conv.close();
    } else if (roastSentiment.score >= -1 && roastSentiment.score < 1) {
        result = conv.ask(keepTryingProcess);
    } else {
        result = conv.ask(botWonProcess);
        conv.close();
    }
});

exports.sally = functions.https.onRequest(app);