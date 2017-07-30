/*
Slack Bot which displays the WooCommerce Quiz consisting of 15 questions with multiple answers.
User has 60 seconds to answer each question otherwise the Quiz will time out.
At the end of the Quiz, the bot displays the number of Correct and Wrong answers and displays a random message.
*/

// Setting a new instance called Conversation and enabling a module for multi-step conversations with hubot
var Conversation = require('hubot-conversation');


// Declaring 3 variables for storing the messages to be displayed at the end of the Quiz
var badWork = [
  "Did you study at all?",
  "Whua Whua! Geeky is sad!",
  "Keep learning and try again soon!"
];

var okWork = [
  "Great work! Almost there!",
  "Good work there! Keep studying!",
  "Keep learning! Beep boop beem!"
];

var goodWork = [
  "Awesome work! Geeky is happy!",
  "Beeb boop beem! Nice work!",
  "Great work! Happy Dance!"
];

/*
Declaring a variable to store Quiz questions.
Each set of question is an obect in an array.
*/
var quizQuestions = [
  {
    question: "1. User created a variable product and its variations but they don’t appear on the site. What would you ask them to check first?",
    choices: "a. Product's attributes\n b. Product's price\n c. Product's stock\n d. Product's description",
    correctAnswer: "b",
    wrongAnswers: ["a", "c", "d"]
  },
  {
    question: "2. User says that their USPS shipping rates are not being returned at checkout. What would you ask them to check first?",
    choices: "a. Origin post code\n b. Product’s weight and dimensions\n c. Have they enabled API rates\n d. All of the above",
    correctAnswer: "d",
    wrongAnswers: ["a", "b", "c"]
  },
  {
    question: "3. User can’t login to their `woocommerce.com` account and claims that they are using their WordPress user name and password that they used for the past 5 years but can’t get in. It is likely that:",
    choices: "a. User forgot their account password\n b. User didn’t create WordPress.com account and is trying to use their self-hosted WordPress login details instead\n c. User forgot their user name\n d. User doesn’t have a WordPress site",
    correctAnswer: "b",
    wrongAnswers: ["a", "c", "d"]
  },
  {
    question: "4. User is getting “Developers: Please make sure that you are including jQuery and there are no JavaScript errors on the page.” error while using Stripe. What is causing it?",
    choices: "a. Stripe keys are placed in incorrect fields\n b. User’s site doesn’t have SSL\n c. Theme or plugin conflict\n d. All of the above",
    correctAnswer: "a",
    wrongAnswers: ["b", "c", "d"]
  },
  {
    question: "5. User is looking to create a site where people can rent bikes online. They have 50 bikes and they want the bikes to be available daily. Which extension does the user need?",
    choices: "a. Subscriptions\n b. Memberships\n c. Bookings\n d. All of the above",
    correctAnswer: "c",
    wrongAnswers: ["a", "b", "d"]
  },
  {
    question: "6. User has a product which he wants to provide for free but the price shows as $0.00 instead. What can they do to have it displayed as `Free`?",
    choices: "a. Write the word ‘Free’ in the price field\n b. Include the word ‘Free’ in the product title\n c. Sorry, there isn’t anything we can do\n d. Use a code snippet that will do the magic",
    correctAnswer: "d",
    wrongAnswers: ["a", "b", "c"]
  },
  {
    question: "7. During checkout user wants to hide the USPS shipping rates on products that they want to ship via Flat Rate and vise versa. Which extension do they need?",
    choices: "a. Advanced Shipping Packages\n b. Conditional Shipping and Payments\n c. Table Rate Shipping\n d. Per-Product Shipping",
    correctAnswer: "b",
    wrongAnswers: ["a", "c", "d"]
  },
  {
    question: "8. User says that their Google Product Feed is missing shipping information. What are they doing wrong?",
    choices: "a. They haven’t set up shipping zones\n b. They haven’t assigned shipping classes to their products\n c. They haven’t configured shipping rules in their Google Merchant Center account\n d. They haven’t specified product’s weight and dimensions",
    correctAnswer: "c",
    wrongAnswers: ["a", "b", "d"]
  },
  {
    question: "9. User is trying to install a theme and getting the following error: “The package could not be installed. No valid plugins were found.” What is causing it?",
    choices: "a. They are installing a theme via ‘Plugins' section\n b. Their theme .zip is corrupted\n c. Their WordPress is outdated\n d. Their host is blocking the installation process",
    correctAnswer: "a",
    wrongAnswers: ["b", "c", "d"]
  },
  {
    question: "10. User says that their site has SSL and you can see that it is using ‘https’ but their System Status Report indicates that they don’t. Why this is happening?",
    choices: "a. Something is not correct with their server setup\n b. The URL they set in ‘Settings > General’ is missing https\n c. Their PHP version is outdated\n d. Their MySQL version is outdated",
    correctAnswer: "b",
    wrongAnswers: ["a", "c", "d"]
  },
  {
    question: "11. User had been using Square as their payment gateway and now excited to start selling Subscriptions products on their site. When they test their Subscriptions products checkout, the Square payment method doesn’t appear. Why?",
    choices: "a. Theme or plugin conflict\n b. Something is blocking the process on the server\n c. Square or Subscriptions versions are outdated\n d. Square and Subscriptions are not compatible",
    correctAnswer: "d",
    wrongAnswers: ["a", "b", "c"]
  },
  {
    question: "12. User wants to be able to print USPS shipping labels for their orders. Which solution would you offer?",
    choices: "a. Use USPS + Stamps.com extensions combination\n b. Enable WooCommerce Shipping Services (included in core)\n c. Manage orders using ShipStation\n d. Any of the above would work",
    correctAnswer: "d",
    wrongAnswers: ["a", "b", "c"]
  },
  {
    question: "13. User wants to add a logo to their Storefront theme. How can they do it?",
    choices: "a. Navigate to 'Appearance > Storefront' and add it there\n b. Navigate to 'Appearance > Customize > Site Identity' and add it there\n c. Navigate to 'Appearance > Header’ and add it there\n d. None of the above are correct",
    correctAnswer: "b",
    wrongAnswers: ["a", "c", "d"]
  },
  {
    question: "14. User says that they’ve tried all things possible but can’t find a way to import Subscriptions products using Order CSV Import Suite. Why?",
    choices: "a. Subscriptions and Order CSV Import Suite are not compatible\n b. They haven’t checked the box next to the 'Include Subscriptions’ field\n c. They haven’t allowed for Subscriptions to be imported on the Product Page\n d. None of these answers are correct",
    correctAnswer: "a",
    wrongAnswers: ["b", "c", "d"]
  },
  {
    question: "15. User wants to be able to split the order during checkout and ship different items by different methods. Which extension would you offer?",
    choices: "a. Dropshipping\n b. Advanced Shipping Packages\n c. Per-Product Shipping\n d. None of the above",
    correctAnswer: "b",
    wrongAnswers: ["a", "c", "d"]
  }
];


// Initiating the Bot
module.exports = function(bot) {

  //Making a new Conversation instance aware of the bot
  var switchBoard = new Conversation(bot);

  // To start the bot, type "Hi Geeky!"
  bot.respond(/Hi Geeky!/i, function(firstMessage) {

      //Initiating the Intro Dialog which tracks 2 answers: Yes and No
      var introDialog = switchBoard.startDialog(firstMessage);

      firstMessage.reply("Hi! Do you want to take the WooCommerce Quiz? (Yes / No)");

      introDialog.addChoice(/No/i, function(userNo){
        userNo.reply("No worries! See you next time!\n https://cloudup.com/cz78Q6iS-03");
      });

      introDialog.addChoice(/Yes/i, function(userYes){
        userYes.reply("Awesome!\n Type 'start' to begin.\n There are 15 questions in the Quiz and you'll have 1 minute to answer each question.");

        //Initiating the next Dialog (to start the Quiz)
        var dialogStart = switchBoard.startDialog(userYes);

        dialogStart.addChoice(/Start/i, function(userStart) {
          userStart.send("Let's go!");

          // Calling function which displays the Quiz questions
          askQuestion(userStart, 0, 0);
        });
      });
    });

  // Declaring function which displays the Quiz questions
  var askQuestion = function(message, index, numOfCorrectAnswers) {

    // Checking if all the questions have been answered (default case to exit the function)
    if (index >= quizQuestions.length) {
      message.reply("You've finished the Quiz!");
      message.send("Number of Correct Answers: " + numOfCorrectAnswers);
      message.send("Number of Wrong Answers: " + (quizQuestions.length - numOfCorrectAnswers));

      // Checking the number of Correct Answers and displaying the message based on that number
      if (numOfCorrectAnswers <= 10 ) {
        message.send(message.random(badWork) + "\n" + "https://cloudup.com/cpgDG7CO1cL");
      } else if (numOfCorrectAnswers <= 14) {
        message.send(message.random(okWork) + "\n" + "https://cloudup.com/cn22a6ISy7Q");
      } else if (numOfCorrectAnswers = 15) {
        message.send(message.random(goodWork) + "\n" + "https://cloudup.com/ccfFzNvFiaJ");
      }

      return;
    }

    // Initiating the final Dialog (for the Quiz answers). The Dialog will time out if the answer is not received within 60 seconds
    var questionDialog = switchBoard.startDialog(message, 60000);

    // Displaying the question and answer choices
    message.reply(quizQuestions[index].question);
    message.send(quizQuestions[index].choices);

    // Checking if user's answer is Correct
    questionDialog.addChoice(quizQuestions[index].correctAnswer, function(correctAnswerMsg) {
      correctAnswerMsg.send("Correct Answer!");
      questionDialog.resetChoices();

      // Calling the function that displays the Quiz questions again on the next element (question) of an array
      askQuestion(message, index + 1, numOfCorrectAnswers + 1);
    });

    // Checking if user's answer is one of the available Wrong Answers
    for (var i = 0; i <= quizQuestions[index].wrongAnswers.length; i++) {
      questionDialog.addChoice(quizQuestions[index].wrongAnswers[i], function(wrongAnswerMsg) {
        wrongAnswerMsg.send("Wrong Answer!");
        questionDialog.resetChoices();

        // Calling the function that displays the Quiz questions again on the next element (question) of an array
        askQuestion(message, index + 1, numOfCorrectAnswers);
      });
    }
    }
  };
