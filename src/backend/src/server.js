const express = require("express");
const path = require("path");
const fs = require("fs");

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const svgCaptcha = require("svg-captcha");

const {quiz, formatQuiz, genQuiz} = require('./quiz');
const {checkDir, backup, restore, output} = require('./util');
const mail = require('./mail');
const genId = require('./genId');

checkDir();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

let router = express.Router();
//CORS middleware
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);
app.use(express.static(path.resolve(__dirname, "../../", "./frontend/public")));
app.set('view engine', 'html');

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../", "./frontend/index.html"));
});

app.get("/signup", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../", "./frontend/signup.html"));
});

let captcha_text;
app.get('/captcha', function (req, res) {
  let captcha = svgCaptcha.create();
  captcha_text = captcha.text;
  
  res.type('svg');
  res.status(200).send(captcha.data);
});

router.route('/admin')
  .post(function(req, res){
    let captcha = req.body.captcha || "";
    if (captcha !== captcha_text)
      return res.redirect("/");
    
    let name = req.body.name || "Anonymous";
    name = name.replace(/[^A-Za-z0-9 ]/g, '');
    if (name.length > 20 || name.length <= 0)
      return res.send("");
    const session_id = genId();
    if (!test[session_id]) {
      test[session_id] = {
        qs: genQuiz(),
        ans: [],
        name,
        mail: req.query.mail,
        logFile: path.resolve(__dirname, "../log", `${name}_${session_id}`)        
      };
      backup(test);
    }
    const body = mail(name, session_id, req, app);
    let transporter = nodemailer.createTransport({
      service: '163',
      auth: {
        user: 'XXX@163.com',
        pass: 'XXXXXX'
      }
    });
    
    let mailOptions = {
      from: 'XXX@163.com',
      to: req.body.mail,
      subject: 'Your test session for Bentley Systems',
      html: body
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        let data = fs.readFileSync(path.resolve(__dirname, "../../", "./frontend/end.html"), {encoding: 'UTF8'});
        if (!data)
          return res.send("");
          
        return res.send(data.replace("{{INFO_TEXT}}", `The request has been sent to ${req.body.mail}.`));
      }
    });
  });

let test = restore();
router.route('/quiz')
  .get(function(req, res){
    let name = req.query.name || "Anonymous";
    name = name.replace(/[^A-Za-z0-9]/g, '');
    if (name.length > 30 || name.length <= 0)
      return res.send("");
    const session_id = genId();
    if (!test[session_id]) {
      test[session_id] = {
        qs: genQuiz(),
        ans: [],
        name,
        mail: req.query.mail,
        logFile: path.resolve(__dirname, "../log", `${name}_${session_id}`)        
      };
      backup(test);
    }
    return res.redirect(`/quiz/${session_id}`);
  });

const Question_Count = 3;
router.route('/quiz/:session_id')
  .get(function(req, res){
    let session_id = req.params.session_id;
    if (!test[session_id])
      return res.send("{'message': 'SESSION ID ERROR'}");

    let question_no = test[session_id].ans.length;
    if (0 === question_no) {
      test[session_id].ans.push("placeholder");
      return res.sendFile(path.resolve(__dirname, "../../", "./frontend/instructions.html"));
    }

    if (1 === question_no && test[session_id].ans[0] === "placeholder") {
      test[session_id].ans = [];
      question_no = 0;
      test[session_id].startTime = new Date();      
    }
      
    if (question_no >= test[session_id].qs.length ||
      question_no >= Question_Count) {
      // ends
      test[session_id].endTime = new Date();
      output(test, session_id, quiz);

      let data = fs.readFileSync(path.resolve(__dirname, "../../", "./frontend/end.html"), {encoding: 'UTF8'});
      if (!data)
        return res.send("");
        
      return res.send(data.replace("{{INFO_TEXT}}", `${test[session_id].name}, this is the end of test. Thank you very much for your time! Have a good day.`));
    }

    res.sendFile(path.resolve(__dirname, "../../", "./frontend/quiz.html"));
  });

router.route('/question/:session_id')
  .get(function(req, res){
    let session_id = req.params.session_id;
    if (!test[session_id])
      return res.send('{"message": "SESSION ID ERROR"}');

    let question_no = test[session_id].ans.length;
    if (question_no >= test[session_id].qs.length ||
        question_no >= Question_Count) {
          return res.send('{"message": "END"}');
        }
      
    let q = formatQuiz(quiz[test[session_id].qs[question_no]]);
    q.no = question_no;
    test[session_id].ans.push("null");            
    res.send(q);
  });

router.route('/question/:session_id/:cnt')
  .post(function(req, res){
    let session_id = req.params.session_id;
    if (!test[session_id])
      return res.send("{'message': 'SESSION ID ERROR'}");

    let cnt = req.params.cnt;
    if (!test[session_id].ans[cnt] || "null" === test[session_id].ans[cnt])
      test[session_id].ans[cnt] = req.body;
    res.send("");
  });

app.use(router);
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => console.log("Serving on port " + app.get("port")));