import questions from "./questions.js";
var haveIt = [];
export var getQuestion = () => {
  var APIKEY = "eC6pP4bAeQMAssW3dBMi7u3SFGnAUr3g";
  var me = {};
  var a = Math.floor(Math.random() * 13);
  var num = 0;

  me.init = () => {
    getQuestion().viewQuestion(a);
    getQuestion().randomise();
    getQuestion().pickAnswer();
    getQuestion().clickedInput();
    $("#questionNumber").text(function () {
      return num;
    });
    getQuestion().nextQuestion();
  };

  me.viewQuestion = (a) => {
    // questons
    // console.log("This is a: " + a);
    if (haveIt.length < 10) {
      // console.log("Have it in lenght <10 : " + haveIt.length);
      if (!haveIt.includes(a)) {
        // console.log("!If have it : " + haveIt);
        haveIt.push(a);
      } else {
        while (true) {
          a = Math.floor(Math.random() * 13);
          // console.log("This is a in the while: " + a);
          if (!haveIt.includes(a)) {
            haveIt.push(a);
            // console.log("This is haveit Push: " + haveIt);
            // console.log("This is a in Push: " + a);
            break;
          }
        }
      }
    }
    var question = questions.results[a].question;
    var quesitonDiv = document.createElement("div");
    var questionView = document.getElementById("question");
    quesitonDiv.append(question);
    questionView.append(quesitonDiv);
    //
    //answers

    var answerView = document.getElementById("answer");
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("class", "answerDiv");
    answerDiv.setAttribute("id", "answerDivId");

    var correctAnswer = questions.results[a].correct_answer;
    var wrongAnswers = [];
    for (var i = 0; i < 3; i++) {
      var answerSpan = document.createElement("span");
      var inputSpan = document.createElement("input");

      answerSpan.setAttribute("class", "answerSpan");
      inputSpan.setAttribute("class", "inputSpan");

      answerSpan.setAttribute("id", "answerSpanId");
      inputSpan.setAttribute("id", "inputSpanId");
      inputSpan.setAttribute("type", "radio");
      inputSpan.setAttribute("name", "radioButton");

      wrongAnswers.push(questions.results[a].incorrect_answers[i]);
      answerSpan.append(inputSpan);
      answerSpan.append(questions.results[a].incorrect_answers[i]);
      answerDiv.append(answerSpan);
    }
    // answerDiv.append(wrongAnswers);
    var answerSpan = document.createElement("span");
    var inputSpan = document.createElement("input");
    answerSpan.setAttribute("class", "answerSpan");
    inputSpan.setAttribute("class", "inputSpan");

    answerSpan.setAttribute("id", "answerSpanId");
    inputSpan.setAttribute("id", "inputSpanId");
    inputSpan.setAttribute("type", "radio");
    inputSpan.setAttribute("name", "radioButton");
    inputSpan.setAttribute("value", "correct");

    answerSpan.append(inputSpan);
    answerSpan.append(correctAnswer);
    answerDiv.append(answerSpan);
    answerView.append(answerDiv);
    //
  };

  me.pickAnswer = () => {
    var clicked = document.getElementById("answerDivId");
    var arr = [];
    for (var i = 0; i < 4; i++) {
      arr.push(clicked.childNodes[i].innerHTML);
    }
  };

  me.clickedInput = () => {
    $(".inputSpan").each(function () {
      $(this).attr("checked", false);
    });
  };

  me.randomise = () => {
    var tmpArr = [];
    var tmp = document.getElementsByClassName("answerSpan");

    for (var i = 0; i < 4; i++) {
      tmpArr.push(tmp[i]);
      tmpArr.sort(function () {
        return Math.floor(Math.random() - 0.5);
      });
    }
    for (var i = 0; i < 4; i++) {
      var tmpSpan = document.getElementById("answerDivId");
      tmpSpan.append(tmpArr[i]);
    }
  };

  me.potvrdi = function () {
    var tmpSpan = document.getElementsByClassName("inputSpan");
    var b = 0;
    for (var i = 0; i < 10; i++) {
      if (tmpSpan[i].checked) {
        if (tmpSpan[i].value == "correct") {
          b++;
          $("#answer").empty();
          $("#question").empty();
          return true;
        } else return false;
      }
    }
  };

  me.nextQuestion = function () {
    var b = 0;
    document.getElementById("SubbmitId").addEventListener("click", function () {
      if (getQuestion().potvrdi() == true) {
        a = Math.floor(Math.random() * 13);
        b++;
        if (b <= 10) {
          $("#questionNumber").text(function () {
            num++;
            return num;
          });
          getQuestion().viewQuestion(a);
          getQuestion().randomise();
          getQuestion().pickAnswer();
          getQuestion().clickedInput();
        }
      } else {
        getQuestion().gifGenerator("fail");
      }
      if (b == 10) {
        getQuestion().gifGenerator("victory");
      }
    });
  };

  me.gifGenerator = function (condition) {
    let url = `http://api.giphy.com/v1/gifs/random?api_key=${APIKEY}&limit=1&tag=${condition}`;
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        console.log(content);
        console.log(content.data);
        console.log(content.meta);
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        img.setAttribute("id", "gifId");
        let fc = document.createElement("figcaption");
        img.src = content.data.images.downsized_large.url;
        img.alt = content.data.title;
        fc.textContent = content.data.title;
        fig.appendChild(img);
        // fig.appendChild(fc);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", fig);
        $("#answer").empty();
        $("#question").empty();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return me;
};
