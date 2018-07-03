// Global variables

// Game Object
let game = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currGuess: "",
    currAnswer: "",
    currQuestion: 0,
    prometheus: true,
    questions: [
        {
            question: "Who was the first member of the Fellowship to die?",
            answer: "Boromir",
            options: ["Pippin", "Gandalf", "Gimli"]
        },
        {
            question: "What race is Gandalf?",
            answer: "Maiar",
            options: ["Human", "Elf", "God"]
        }
    ],
    shuffle: function (array) {
        // Code found on Stack Exchange
        var curr = array.length, temp, rand;

        // While there remain elements ot shiffle
        while (0 !== curr) {
            // Pick a remaining element
            rand = Math.floor(Math.random() * curr);
            curr -= 1;

            // Swap it with the current element
            temp = array[curr];
            array[curr] = array[rand];
            array[rand] = temp;
        }
        return array;
    },
    reset: function () {
        //Reset variables
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.currQuestion = 0;
        game.prometheus = true;

        //Display start button
        let startBtn = $("<button>");
        startBtn.text("START");
        startBtn.addClass("start-btn");
        $(".answers").append(startBtn);
    },
    clearScreen: function () {
        $(".timer").empty();
        $(".question").empty();
        $(".answers").empty();
    },
    displayQuestion: function (qNum) {
        // ***** Start Timer *****
        $(".timer".append("Time Remaining: <span id='time'></span>"));
        timer.start();
        // ***** Display Question *****
        var quest = $("<h3>");
        quest.addClass("quest");
        quest.text(game.questions[qNum].question);
        $(".question").append(quest);

        // ***** Display Options *****
        let temp = game.questions[qNum].options;
        temp.push(game.questions[qNum].answer);
        // Shuffle the temp array
        temp = game.shuffle(temp);
        //Print to the screen
        for (let i = 0; i < temp.length; i++) {
            let option = $("<h5>");
            option.addClass("option");
            //Set different classes for correct and incorrect answer
            if (game.questions[qNum].answer === temp[i]) {
                option.addClass("correct");
            } else {
                option.addClass("incorrect");
            }
            //Add Text
            option.text(temp[i]);
            //Add it to the screen
            $(".answers").append(option);
        }
    },
    questionScreen: function () {
        game.clearScreen;
        game.displayQuestion(game.currentQuestion);
    },
    inBetweenScreen: function () {
        game.currQuestion++;
        if (game.currentQuestion === game.questions.length) {
            game.finalScreen;
        } else {
            game.questionScreen;
        }
    },
    finalScreen: function () {
        game.clearScreen;
        // Display generic ending message
        $(".question").html("<h3>All Done!</h3>");

        //Display final score
        $(".answers").append("<h5>Correct: " + game.correct + "</h5>");
        $(".answers").append("<h5>Incorrect: " + game.incorrect + "</h5>");
        $(".answers").append("<h5>Unanswered: " + game.unanswered + "</h5>");

        game.reset;
    }
};

// Timer object
let timer = {
    maxTime: 30,
    time: timer.maxTime,
    start: function () {
        timer.time = timer.maxTime;
        $("#time").html(timer.time + " seconds");
        intervalId = setInterval(timer.count, 1000);
    },
    count: function () {
        timer.time--;
        $("#time").html(timer.time + " seconds");
        // If time runs out
        if (timer.time < 0) {
            clearInterval(intervalId);
            $("#time").html("0 seconds");
            game.inBetweenScreen();
        }
    }
};

// Onload function
window.onload = function () {
    game.reset();

    $(".start-btn").on("click", game.playGame);
}