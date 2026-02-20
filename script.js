const allQuestions = {
easy:[
{q:"Whole numbers",a:"Infinite"},
{q:"Points on a line",a:"Infinite"},
{q:"Days in a week",a:"Finite"},
{q:"Letters in English alphabet",a:"Finite"},
{q:"Decimals between 1 and 2",a:"Infinite"}
],
medium:[
{q:"Prime numbers",a:"Infinite"},
{q:"Sand grains on Earth",a:"Finite"},
{q:"Real numbers",a:"Infinite"},
{q:"Human population",a:"Finite"},
{q:"Rational numbers",a:"Infinite"}
],
hard:[
{q:"Irrational numbers between 0 and 1",a:"Infinite"},
{q:"Even numbers",a:"Infinite"},
{q:"Digits in π",a:"Infinite"}
]
};

let selectedQuestions=[];
let score=0;
let answered=0;
let currentIndex=0;
let timer;
let timeLeft=15;

function startGame(level){
    selectedQuestions=[...allQuestions[level]];
    shuffle(selectedQuestions);
    selectedQuestions=selectedQuestions.slice(0,10);

    score=0;
    answered=0;
    currentIndex=0;

    document.getElementById("score").innerText="Score: 0";
    document.getElementById("levelSelect").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    loadQuestion();
}

function loadQuestion(){
    if(answered>=10){
        endGame();
        return;
    }

    document.getElementById("question").innerText=
    selectedQuestions[currentIndex].q;

    startTimer();
}

function checkAnswer(choice){
    clearInterval(timer);

    if(choice===selectedQuestions[currentIndex].a){
        score+=10;
    }else{
        score-=5;
    }

    answered++;
    currentIndex++;
    document.getElementById("score").innerText="Score: "+score;
    loadQuestion();
}

function startTimer(){
    timeLeft=15;
    updateCircle();

    timer=setInterval(()=>{
        timeLeft--;
        updateCircle();

        if(timeLeft<=0){
            clearInterval(timer);
            score-=5;
            answered++;
            currentIndex++;
            document.getElementById("score").innerText="Score: "+score;
            loadQuestion();
        }
    },1000);
}

function updateCircle(){
    let angle=(timeLeft/15)*360;
    document.getElementById("timerCircle").style.background=
    `conic-gradient(#00ffcc ${angle}deg,#444 ${angle}deg)`;
    document.getElementById("timerCircle").innerText=timeLeft;
}

function endGame(){
    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    let message="";
    if(score<=50){
        message="Still learning…";
    }else if(score<100){
        message="Infinity Explorer! ♾️";
    }else{
        message="Infinity Master ♾️🔥";
    }

    document.getElementById("result").innerHTML=
    "<h2>Final Score: "+score+"/100</h2><br>"+message;
}

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}
