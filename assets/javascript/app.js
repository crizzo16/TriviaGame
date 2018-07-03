

// Game global variables
var intervalId;
var game = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentQuestion: 0,
    questions: [
        {
            question: "Who was the first member of the fellowship to die?",
            answer: "Boromir",
            options: ["Pippin", "Gandalf", "Gimli"]
        },
        {
            question: "How many wizard are in Middle Earth?",
            answer: "Five",
            options: ["One", "Two", "Seven"]
        }
    ],
    shuffle: function (array) {
        //Code found on Stack Exchange
        //If it ain't broke, don't fix it
        var curr = array.length, temp, rand;

        //While there remain elements to shuffle
        while (0 !== curr) {

            //Pick a remaining element
            rand = Math.floor(Math.random() * curr);
            curr -= 1;

            //And swap it with the current element.
            temp = array[curr];
            array[curr] = array[rand];
            array[rand] = temp;
        }

        return array;
    },
    displayOptions: function (qNum) {
        //Display options in a random order
        var temp = game.questions[qNum].options;
        temp.push(game.questions[qNum].answer);
        //Shuffle the temp array
        var tempArray = game.shuffle(temp);
        //Print to the screen
        for (var i = 0; i < tempArray.length; i++) {
            var option = $("<h5>");
            option.addClass("option");
            //Set different classes for answer vs wrong option
            if (game.questions[qNum].answer === tempArray[i]) {
                option.addClass("answer");
            } else {
                option.addClass("wrong");
            }
            //Add text
            option.text(tempArray[i]);
            //Add it to the screen
            $(".answers").append(option);
        }
    },
    displayQuestion: function (qNum) {
        var quest = $("<h3>");
        quest.addClass("quest");
        quest.text(game.questions[qNum].question);
        $(".question").append(quest);
    },
    clearQuestion: function () {
        $(".question").empty();
        $(".answers").empty();
    },
    setQuestion: function (qNum) {
        game.clearQuestion();
        game.displayQuestion(qNum);
        game.displayOptions(qNum);
        timer.start();
        
        $(".option").on("click", game.selectAnswer);
    },
    selectAnswer: function () {
        clearInterval(intervalId);
        game.clearQuestion();
        var guess = this.getAttribute("class");
        console.log(this);
        if (guess.includes("answer")) {
            console.log("right answer!!");
            game.correct++;
            game.inBetween(0, game.questions[game.currentQuestion].answer);
            game.currentQuestion++;
        } else if (guess.includes("wrong")){
            console.log("wrong answer :(");
            game.incorrect++;
            game.inBetween(1, game.questions[game.currentQuestion].answer);
            game.currentQuestion++;
        }
    },
    reset: function () {
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.currentQuestion = 0;
        game.before();
    },
    before: function () {
        var startBtn = $("<button>");
        startBtn.text("START");
        startBtn.addClass("start-btn");
        $(".question").append(startBtn);
    },
    start: function () {
        $(".question").empty();
        $(".timer").append("Time Remaining: <span id='time'></span>");
        game.setQuestion(game.currentQuestion);
        $(".option").on("click", game.selectAnswer);
    },
    inBetween: function (num, answer) {
        //If the user guessed correctly
        if (num === 0) {
            $(".question").append("<h3>Correct!</h3>");
        } 
        //If the user guessed incorrectly
        else if (num === 1) {
            $(".question").append("<h3>Incorrect!</h3>");
            $(".answers").append("<h3>The correct answer was: "+ answer + "!</h3>");
        } 
        //If the user ran out of time
        else if (num === 2) {
            $(".question").append("<h3>Out of time!</h3>");
            $(".answers").append("<h3>The correct answer was: "+ answer + "!</h3>");
        } 
        //A wrong number was used
        else {
            console.log("You done messed up");
        }
        setTimeout(() =>  game.setQuestion(game.currentQuestion), 10000);
        
        $(".option").on("click", game.selectAnswer);
    },
};

var timer =  {
    maxTime: 30,
    time: 30,
    start: function () {
        timer.time = timer.maxTime;
        $("#time").html(timer.time + " seconds");
        intervalId = setInterval(timer.count, 1000);
    },
    count: function () {
        timer.time--;
        $("#time").html(timer.time + " seconds");
        if (timer.time < 0) {
            clearInterval(intervalId);
            $("#time").html("0 seconds");
            game.clearQuestion();
            game.inBetween(2, game.questions[game.currentQuestion].answer);
            game.currentQuestion++;
        };
    }
};


window.onload = function () {
    game.before();

    $(".start-btn").on("click", game.start);

    $(".option").on("click", game.selectAnswer);
};
