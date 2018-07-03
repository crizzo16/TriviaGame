let game = {
    //Variables
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currGuess: "",
    currAnswer: "",
    currQuestion: 0,
    questions: [
        {
            question: "Who did Samwise Gamgee marry?",
            answer: "Rosie Cotton",
            options: ["Harriet Dunben", "Marigold Proudfeet", "Euphemia Sackville"]
        },
        {
            question: "What color is NOT associated with a wizard in Middle Earth?",
            answer: "Red",
            options: ["Blue", "Brown", "Grey", "White"]
        },
        {
            question: "How many wizard are in Middle Earth?",
            answer: "Five",
            options: ["One", "Two", "Seven"]
        },
        {
            question: "What race is Gandalf?",
            answer: "Maiar",
            options: ["Human", "Elf", "God"]
        }
    ],
    shuffle: function (array) {
        // Code found on Stack Exchange
        let curr = array.length, temp, rand;

        // While there remain elements to shuffle
        while (0 !== curr) {
            //Pick a remaining element
            rand = Math.floor(Math.random() * curr);
            curr--;

            //Swap it with the current element
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
        game.shuffle(game.questions);

        //Display Start buton
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
    copy: function (array) {
        let temp = [];
        for (let i=0; i<array.length; i++) {
            temp.push(array[i]);
        }
        return temp;
    },
    displayQuestion: function () {
        //Make sure screen is empty
        game.clearScreen();
        // ***** Display Question *****
        let quest = $("<h3>");
        quest.addClass("quest");
        quest.text(game.questions[game.currQuestion].question);
        $(".question").append(quest);

        // ***** Display Options *****
        let temp = game.copy(game.questions[game.currQuestion].options);
        temp.push(game.questions[game.currQuestion].answer);
        console.log("options: " + game.questions[game.currQuestion].options);
        console.log("temp: " + temp);
        //Shuffle the temp array
        temp = game.shuffle(temp);
        //Print to the screen
        for (let i = 0; i < temp.length; i++) {
            let option = $("<h5>");
            option.addClass("option");
            //Set different classes for correct and incorrect answer
            if (game.questions[game.currQuestion].answer === temp[i]) {
                option.addClass("correct");
            } else {
                option.addClass("incorrect");
            }
            //Add Text
            option.text(temp[i]);
            //Add it to the screen
            $(".answers").append(option);
        }

        // ***** Start Timer *****
        $(".timer").append("Time Remaining: <span id='time'></span>");
        timer.start();

        // ***** Click function *****
        $(".option").on("click", function () {
            clearInterval(intervalId);
            if (this.getAttribute("class").includes("incorrect")) {
                game.inBetween("incorrect");
            } else {
                game.inBetween("correct");
            }
        });
    },
    inBetween: function (guess) {
        $(".question").empty();
        $(".answers").empty();
        //General results message
        let result = $("<h3>");
        result.addClass("result");
        //The correct result
        let resultAnswer = $("<h5>");
        resultAnswer.addClass("result-answer");
        //The fun image
        let qImage = $("<img/>");
        qImage.addClass("qImage");

        //Check to see how they answered
        //If correct
        if (guess === "correct") {
            game.correct++;
            result.text("Correct!");
            //qImage.attr("src", game.questions[game.currQuestion].imgSrc);
        }
        //If incorrect
        else if (guess === "incorrect") {
            game.incorrect++;
            result.text("Incorrect!");
            resultAnswer.text("The correct answer is: " + game.questions[game.currQuestion].answer);
            //qImage.attr("src", game.questions[game.currQuestion].imgSrc);
        }
        //If out of time
        else if (guess === "OOT") {
            game.unanswered++;
            result.text("Out of time!");
            resultAnswer.text("The correct answer is: " + game.questions[game.currQuestion].answer);
            //qImage.attr("src", game.questions[game.currQuestion].imgSrc);
        }
        //Something went wrong
        else {
            console.log("You done messed up");
        }

        //Append the results
        $(".question").append(result);
        $(".answers").append(resultAnswer);
        //$(".answers").append(qImage);

        //Move onto next question or final screen
        //game.checkGameDone;
        setTimeout(() => game.checkGameDone(), 5000);
    },
    finalScreen: function () {
        game.clearScreen();
        $(".question").append("<h3>All Done!</h3>");
        //Display final results
        let finalResults = $("<div>");
        finalResults.addClass("final-results");
        //Correct answers
        let first = $("<h5>");
        first.addClass("results-display");
        first.text("Correct: " + game.correct);
        //Incorrect answers
        let second = $("<h5>");
        second.addClass("results-display");
        second.text("Incorrect: " + game.incorrect);
        //Unanswered answers
        let third = $("<h5>");
        third.addClass("results-display");
        third.text("Unanswered: " + game.unanswered);
        //Print to screen
        finalResults.append(first);
        finalResults.append(second);
        finalResults.append(third);
        $(".answers").append(finalResults);
        game.reset();

        $(".start-btn").on("click", game.displayQuestion);
    },
    checkGameDone: function () {
        console.log("starting checkGameDone");
        //Move onto the next question
        console.log("before: " + game.currQuestion);
        game.currQuestion++;
        console.log("after: " + game.currQuestion);
        //If it exists, diaplsy it
        if (game.currQuestion < game.questions.length) {
            game.displayQuestion();
        }
        //Otherwise the game is done
        else {
            game.finalScreen();
        }
    }
};

let timer = {
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
        // If time runs out
        if (timer.time < 0) {
            clearInterval(intervalId);
            $("#time").html("0 seconds");
            game.inBetween("OOT");
        }
    }
};

window.onload = function () {
    game.reset();

    $(".start-btn").on("click", game.displayQuestion);

    $(".option").on("click", function () {
        if (this.getAttribute("class").includes("incorrect")) {
            game.inBetween("incorrect");
        } else {
            game.inBetween("correct");
        }
    });
}