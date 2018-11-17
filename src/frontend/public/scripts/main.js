(function(){

  var url_arr = window.location.toString().split('/');
  if (url_arr.length < 4 || url_arr[url_arr.length - 2] !== 'quiz')
    return;   
  let session_id = url_arr[url_arr.length - 1];

  function genArr(items){
    var res = [];
    for(let i = 0; i < items.length; i++)
      res[i] = { val: items[i], idx: i };
    return res;
  }
                                        
  function shuffle(arr){
    let l = arr.length, r, temp;
    while(l > 0) {
      r = Math.floor(Math.random() * l);
      l--;
      temp = arr[r];
      arr[r] = arr[l];
      arr[l] = temp;
    }
  }
 
  let ans, cnt = 0, timer = -1, total;
  const millisecs = 120000;
  function getQuestion(){
    ans = {};
    let get = new XMLHttpRequest();
    get.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {                                                                                                                                                                                                                         
        try {
          let res = JSON.parse(this.responseText);
          if (res.message) {
            if ("END" === res.message){
              if (timer >= 0)
                clearInterval(timer);
              location.reload();
            }
            return;
          }

          document.getElementById("header").innerText = res.header;
          document.getElementById("body").innerText = res.body;
          
          let data = genArr(res.items);
          shuffle(data);
      
          let itemElem = document.getElementById("items");
          itemElem.innerHTML = "";
          data.forEach(function(d) {
            let labelElem = document.createElement("label");
            labelElem.innerText = d.val;
            let $labelElem = $(labelElem);
            $labelElem.addClass("form-control");
            $labelElem.addClass("form-control-lg");
            labelElem.onclick = function(){
              $("label").removeClass("selectedans");
              $(this).addClass("selectedans");
              ans = d;
            };
            itemElem.appendChild(labelElem);
          });
          cnt = res.no;
          initializeClock();
        }
        catch(e){
          return;
        }
      }
    };
    get.open("GET", "/question/" + session_id, false);
    get.send();
  }

  function convertMilliseconds(ms) {
    let s = Math.floor(ms / 1000),
      m = Math.floor(s / 60),
      pad = function(n) {
        return n < 10 ? '0' + String(n) : n;
      };

    return {
      total: ms,
      minutes: pad(m % 60),
      seconds: pad(s % 60),
    };
  }

  function next(){
    ans.t = millisecs - total;
    let post = new XMLHttpRequest();
    post.open("POST", "/question/" + session_id + "/" + cnt, false);
    post.setRequestHeader('Content-type', 'application/json');                   
    post.send(JSON.stringify(ans));
    window.location.reload();
  }

  function initializeClock() {
    total = millisecs;
    if (timer < 0) {
      timer = setInterval(function () {
        let res = convertMilliseconds(total);
        document.getElementById("counterdown").innerText = res.minutes + ":" + res.seconds;//`${res.minutes}:${res.seconds}`;
        if ( 0 >= total ){
          next();
        }
        total-=1000;
      }, 1000 );
    }
  }

  $(document).ready(function(){
    getQuestion();

    document.getElementById("next").onclick = function(){
      next();
    };

    $(window).blur(function(){
       next();
    });
  });

})();