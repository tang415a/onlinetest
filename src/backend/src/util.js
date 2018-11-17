const fs = require("fs");
const path = require("path");

function checkDir() {
  let paths = [path.resolve(__dirname, "../stat"),
    path.resolve(__dirname, "../log")
  ];
  paths.forEach(p => {
    if (!fs.existsSync(p))
      fs.mkdirSync(p);
  });
}

function pad(n) {
  return n < 10 ? '0' + String( n ) : n;
}

const stat_file = path.resolve(__dirname, "../stat", "backup");
function backup(test) {
  let data = JSON.stringify(test);
  fs.writeFileSync(stat_file, data, {flag: 'w'});
}

function restore() {
  if (fs.existsSync(stat_file)) {
    try {
      let data = fs.readFileSync(stat_file, {encoding: 'UTF8'});
      return JSON.parse(data);
    }
    catch(e) {
      console.log(e);
      return {};
    }
  }
  return {};
}

function output(test, session_id, quiz) {
  let rec = test[session_id], score = 0, ms = 0, logFile = rec.logFile, data = `Name: ${rec.name}\r\nMail: ${rec.mail}\r\n`;
  for(let i = 0; i < rec.ans.length; i++){
    let idx = rec.qs[i];
    data += `(${i+1}): ${quiz[idx][0]}\r\n\r\n${quiz[idx][1]}\r\n\r\n`;
    let a = rec.ans[i];
    if ("idx" in rec.ans[i]) {      
      if (a.idx === quiz[idx][3]) {
        score++;
        data += `Ans: ${a.val}\r\nCorret\r\n\r\n`;
      }
      else
        data += `Ans: ${a.val}\r\nWrong\r\n\r\n`;
    }
    else
      data += "Blank\r\n";
    ms += a.t;
  }

  const costTime = ((ms) => {
    let s = Math.floor(ms / 1000),
    m = Math.floor(s / 60);
    return {
      total: ms,
      minutes: pad( m % 60 ),
      seconds: pad( s % 60 )
    };
  })(ms);
  const day = [pad(rec.startTime.getMonth()+1), pad(rec.startTime.getDate()), rec.startTime.getFullYear()].join('/');
  data += `Score: ${score}/${rec.ans.length}\r\n${day} ${costTime.minutes}:${costTime.seconds}\r\nStart: ${pad(rec.startTime.getHours())}:${pad(rec.startTime.getMinutes())}:${pad(rec.startTime.getSeconds())}\t\tEnd: ${pad(rec.endTime.getHours())}:${pad(rec.endTime.getMinutes())}:${pad(rec.endTime.getSeconds())}`;

  fs.writeFile(logFile, data, {flag: 'w'}, err => {
    if (err)
      return console.log(err);
    console.log(`${logFile} has been saved.`);
    delete test[session_id];  // no need to keep it
    backup(test);
  });
}

module.exports = {
  checkDir,
  backup,
  restore,
  output
};