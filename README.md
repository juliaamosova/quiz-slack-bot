### Description
Slack Bot which displays the WooCommerce Quiz consisting of 15 questions with multiple answers. User has 60 seconds to answer each question otherwise the Quiz will time out. At the end of the Quiz, the Bot displays the number of Correct and Wrong answers and a random message depending on that number.

### Commands
**All commands are case-insensitive**

Type `Hi Geeky!` - to starts the Bot. The bot will ask you whether you want to take the JavaScript Quiz or not.

Type `No`  - if you don’t want to take the Quiz. The Bot will display the message and the image. At this moment the Dialog with the Bot ends and you would need to start from the beginning (type  `Hi Geeky!` ) if you want to take the Quiz.

Type  `Yes` - if you you want to take the Quiz. The Bot will display the rules and instructions on how to start the Quiz.

Type  `Start`  to start the Quiz. At this moment the Bot will display the first Quiz question and multiple answers for you to select from. There is only one correct answer. You have 60 seconds to answer the question. If the answer is not received, the Bot will time out and the message  `Timed out! please start again`  will be displayed. You will need to start from the beginning (type  `Hi Geeky!` ) if you want to try again.

Type  `a` ,  `b` ,  `c`  or  `d` - (depending on which of the choices presented you think is the correct answer) to continue the Quiz and move on to the next Question.
The Bot will display whether or not you provided the correct answer and will display the next question. The loop will continue until all the 15 questions are answered.

Once all 15 Questions are answered, the Bot will display the number of **Correct** and **Wrong** Answers. The Bot will also display a random message taken from one of the arrays of responses depending on how many correct answers you’ve given and the image.

At this moment, all the previous choices made will be cleared and if you want to start the Bot again, type  `Hi Geeky!`.

### Tools

The Bot had been built using the following tools:

- **[Slack bot user](https://api.slack.com/bot-users)**

- **[Hubot](https://hubot.github.com/)**

- **[Hubot Conversation](https://github.com/lmarkus/hubot-conversation)**

- **[CoffeeScript](http://coffeescript.org/)**

- **[Heroku](https://www.heroku.com/)**

- **[Yeoman](https://yeoman.io)** 

### Code notes

The way to control the Bot flow is to make sure you start several Dialogs during the Bot cycle and clear choices where needed. See Dialog Diagram below:

![](https://cloudup.com/czr-geZdaQm+)
Image Link: https://cloudup.com/czr-geZdaQm

_____________________

`var switchBoard = new Conversation(robot, [type]);`

This line of code registers a custom listener allowing the instance to check all incoming messages.  `Type`  parameter can take one of two values:  `user`  (default) or  `room` . It defines if this conversation is with the whole room or with a particular user only. If the message comes from a user (or a room) that we're having a conversation with, it will be processed as the next step in an ongoing Dialog. In the case of this Bot,  `type`  parameter is  `user` .
