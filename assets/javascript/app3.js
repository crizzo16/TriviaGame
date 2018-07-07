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
            options: ["Harriet Dunben", "Marigold Proudfeet", "Euphemia Sackville"],
            imgSrc: "assets/images/samwiseFamily.gif"
        },
        {
            question: "What color is NOT associated with a wizard in Middle Earth?",
            answer: "Red",
            options: ["Blue", "Brown", "Grey", "White"],
            imgSrc: "assets/images/whiteWizard.gif"
        },
        {
            question: "How many wizards are in Middle Earth?",
            answer: "Five",
            options: ["One", "Two", "Seven"],
            imgSrc: "assets/images/radagast.gif"
        },
        {
            question: "What race is Gandalf?",
            answer: "Maiar",
            options: ["Human", "Elf", "God"],
            imgSrc: "assets/images/gandalf.gif"
        },
        {
            question: "Who did not have a family member featured in 'The Hobbit'?",
            answer: "Aragorn",
            options: ["Gimli", "Legolas", "Frodo"],
            imgSrc: "assets/images/gloin.gif"
        },
        {
            question: "Who was the youngest in the Fellowship?",
            answer: "Pippin",
            options: ["Gandalf", "Frodo", "Legolas", "Aragorn", "Merry", "Samwise", "Gimli", "Boromir"],
            imgSrc: "assets/images/pippin.gif"
        },
        {
            question: "How old is Aragorn?",
            answer: "87",
            options: ["37", "57", "77", "107", "127"],
            imgSrc: "assets/images/aragorn.gif"
        },
        {
            question: "Who forged the rings of power, not including the One Ring?",
            answer: "Celebrimbor",
            options: ["Sauron", "Galadriel", "Gandalf", "Elrond"],
            imgSrc: "assets/images/ringsOfPower.gif"
        },
        {
            question: "What is the name of the pony in the first film?",
            answer: "Bill",
            options: ["Spot", "Shadowfax", "Hidalgo", "Brego"],
            imgSrc: "assets/images/breakfast.gif"
        },
        {
            question: "What is the name of Bilbo's sword that is later given to Frodo?",
            answer: "Sting",
            options: ["Orcrist", "Glamdring", "Narsil", "Ringil"],
            imgSrc: "assets/images/sting.gif"
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
        let qImage = "";

        //Check to see how they answered
        //If correct
        if (guess === "correct") {
            game.correct++;
            result.text("Correct!");
            qImage = "<img src='" + game.questions[game.currQuestion].imgSrc + "' class='qImage'/>";
        }
        //If incorrect
        else if (guess === "incorrect") {
            game.incorrect++;
            result.text("Incorrect!");
            resultAnswer.text("The correct answer is: " + game.questions[game.currQuestion].answer);
            qImage = "<img src='" + game.questions[game.currQuestion].imgSrc + "' class='qImage'/>";
        }
        //If out of time
        else if (guess === "OOT") {
            game.unanswered++;
            result.text("Out of time!");
            resultAnswer.text("The correct answer is: " + game.questions[game.currQuestion].answer);
            qImage = "<img src='" + game.questions[game.currQuestion].imgSrc + "' class='qImage'/>";
        }
        //Something went wrong
        else {
            console.log("You done messed up");
        }
        console.log(qImage);
        //Append the results
        $(".question").append(result);
        $(".answers").append(resultAnswer);
        $(".answers").append(qImage);

        //Move onto next question or final screen
        //game.checkGameDone;
        setTimeout(() => game.checkGameDone(), 10000);
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
        game.currQuestion++;
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