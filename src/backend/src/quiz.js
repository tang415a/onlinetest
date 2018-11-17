let quiz = [
  [
    `What would be the output of following code ?`,
    `    (function(){
      var arrayNumb = [2, 8, 15, 16, 23, 42];
      Array.prototype.sort = function(a,b){
        return a - b;
      };
      arrayNumb.sort();
      console.log(arrayNumb);
    })();
    
    (function(){
      var numberArray = [2, 8, 15, 16, 23, 42];
      numberArray.sort(function(a,b){
        if(a == b){
          return 0;
        }else{
          return a < b ? -1 : 1;
        }
      });
      console.log(numberArray);
    })();
    
    (function(){
      var numberArray = [2, 8, 15, 16, 23, 42];
      numberArray.sort(function(a,b){
        return a-b;
      });
      console.log(numberArray);
    })();`,
    [
      `[ 2, 8, 15, 16, 23, 42 ]
      [ 2, 8, 15, 16, 23, 42 ]
      [ 2, 8, 15, 16, 23, 42 ]`,
      `undefined undefined undefined`,
      `[42, 23, 16, 15, 8, 2]
      [42, 23, 16, 15, 8, 2]
      [42, 23, 16, 15, 8, 2]`,
      `Reference Error`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    var employeeId = 'aq123';
    (function Employee() {
      try {
        throw 'foo123';
      } catch (employeeId) {
        console.log(employeeId);
      }
      console.log(employeeId);
    }());`,
    [
      `foo123 aq123`,
      `foo123 foo123`,
      `aq123 aq123`,
      `foo123 undefined`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      'use strict';
    
      var person = {
        name: 'John'
      };
      person.salary = '10000$';
      person['country'] = 'USA';
    
      Object.defineProperty(person, 'phoneNo', {
        value: '8888888888',
        enumerable: false
      })
    
      console.log(Object.keys(person)); 
    })();`,
    [
      `Type Error`,
      `undefined`, 
      `["name", "salary", "country", "phoneNo"]`,
      `["name", "salary", "country"]`
    ],
    3
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var objA = {
        foo: 'foo',
        bar: 'bar'
      };
      var objB = {
        foo: 'foo',
        bar: 'bar'
      };
      console.log(objA == objB);
      console.log(objA === objB);
    }());`,
    [
      `false true`,
      `false false`, 
      `true false`,
      `true true`
    ],
    1
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var objA = Object.create({
        foo: 'foo'
      });
      var objB = objA;
      objB.foo = 'bar';
      console.log(objA.foo);
      console.log(objB.foo);
    }());`,
    [
      `foo bar`,
      `bar bar`, 
      `foo foo`,
      `bar foo`
    ],
    1
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var objA = Object.create({
        foo: 'foo'
      });
      var objB = objA;
      objB.foo = 'bar';
    
      delete objA.foo;
      console.log(objA.foo);
      console.log(objB.foo);
    }());`,
    [
      `foo bar`,
      `bar bar`, 
      `foo foo`,
      `undefined undefined`
    ],
    2
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var objA = {
        foo: 'foo'
      };
      var objB = objA;
      objB.foo = 'bar';
    
      delete objA.foo;
      console.log(objA.foo);
      console.log(objB.foo);
    }());`,
    [
      `foo bar`,
      `undefined undefined`,
      `foo foo`,
      `undefined bar`
    ],
    1
  ],
  [
    `What would be the output of following code ?`,
    `   (function () {
      var array = new Array('a', 'b', 'c', 'd', 'e');
      array[10] = 'f';
      delete array[10];
      console.log(array.length);
    }());`,
    [
      `11`,
      `5`,
      `6`,
      `undefined`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var array1 = [];
      var array2 = new Array(100);
      var array3 = new Array(['1',2,'3',4,5.6]);
      console.log(array1);
      console.log(array2);
      console.log(array3);
      console.log(array3.length);
    }());`,
    [
      `[] [] [Array[5]] 1`,
      `[] [undefined × 100] Array[5] 5`,
      `[] [] ['1',2,'3',4,5.6] 5`,
      `[] [] [Array[5]] 5` 
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var array = new Array('100');
      console.log(array);
      console.log(array.length);
    }());`,
    [
      `undefined undefined`,
      `[undefined × 100] 100`,
      `["100"] 1`,
      `ReferenceError: array is not defined`
    ],
    2
  ],
  [
    `What would be the output of following code ?`,
    `    var func = [];
    for (var i = 0; i < 5; i++) {
      func[i] = function() {
        console.log(i);
      };
    }
    func[3]();`,
    [
      `3`,
      `4`,
      `5`,
      `6`
    ],
    2
  ],
  [
    `What would be the output of following code ?`,
    `    function Person(name, age){
      this.name = name || "John";
      this.age = age || 24;
      this.displayName = function(){
        console.log(this.name);
      };
    }
    
    Person.name = "John";
    Person.displayName = function(){
      console.log(this.name);
    }
    
    var person1 = new Person('John');
    person1.displayName();
    Person.displayName();`,
    [
      `John Person`,
      `John John`,
      `John undefined`,
      `John John`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    function passWordMngr() {
      var password = '12345678';
      this.userName = 'John';
      return {
        pwd: password
      };
    }
    var userInfo = passWordMngr();
    console.log(userInfo.pwd);
    console.log(userInfo.userName);`,
    [
      `12345678 Window`,
      `12345678 John`,
      `12345678 undefined`,
      `undefined undefined`
    ],
    2
  ],
  [
    `What would be the output of following code ?`,
    `    var employeeId = 'aq123';
    function Employee() {
      this.employeeId = 'bq1uy';
    }
    console.log(Employee.employeeId);`,
    [
      `Reference Error`,
      `aq123`,
      `bq1uy`,
      `undefined`
    ],
    3
  ],
  [
    `What would be the output of following code ?`,
    `    var employeeId = 'aq123';

    function Employee() {
      this.employeeId = 'bq1uy';
    }

    console.log(new Employee().employeeId);
    Employee.prototype.employeeId = 'kj182';
    Employee.prototype.JobId = '1BJKSJ';
    console.log(new Employee().JobId);
    console.log(new Employee().employeeId);`,
    [
      `bq1uy 1BJKSJ bq1uy undefined`,
      `bq1uy 1BJKSJ bq1uy`,
      `bq1uy 1BJKSJ kj182`,
      `undefined 1BJKSJ kj182`
    ],
    1
  ],
  [
    `What would be the output of following code ?`,
    `    (function() {
      var greet = 'Hello World';
      var toGreet = [].filter.call(greet, function(element, index) {
        return index > 5;
      });
      console.log(toGreet);
    }());`,
    [
      `Hello World`,
      `undefined`,
      `World`,
      `[ 'W', 'o', 'r', 'l', 'd' ]`
    ],
    3
  ],
  [
    `What would be the output of following code ?`,
    `    (function(){
      var containers = [2,0,false,"", '12', true];
      var containers = containers.filter(Boolean);
      console.log(containers);
      var containers = containers.filter(Number);
      console.log(containers);
      var containers = containers.filter(String);
      console.log(containers);
      var containers = containers.filter(Object);
      console.log(containers);		
    })();`,
    [
      `    [ 2, '12', true ]
	  [ 2, '12', true ]
	  [ 2, '12', true ]
	  [ 2, '12', true ]`,
      `    [false, true]
	  [ 2 ]
	  ['12']
	  [ ]`,
      `    [2,0,false,"", '12', true]
	  [2,0,false,"", '12', true]
	  [2,0,false,"", '12', true]
	  [2,0,false,"", '12', true]`,
      `    [ 2, '12', true ]
	  [ 2, '12', true, false ]
	  [ 2, '12', true,false ]
	  [ 2, '12', true,false]`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    (function(){
      var list = ['foo','bar','john','ritz'];
          console.log(list.slice(1));	
          console.log(list.slice(1,3));
          console.log(list.slice());
          console.log(list.slice(2,2));
          console.log(list);				
    })();`,
    [
      `    [ 'bar', 'john', 'ritz' ]
    [ 'bar', 'john' ]
    [ 'foo', 'bar', 'john', 'ritz' ]
    []
    [ 'foo', 'bar', 'john', 'ritz' ]`,
      `    [ 'bar', 'john', 'ritz' ]
    [ 'bar', 'john','ritz ]
    [ 'foo', 'bar', 'john', 'ritz' ]
    []
    [ 'foo', 'bar', 'john', 'ritz' ]`,
    `    [ 'john', 'ritz' ]
    [ 'bar', 'john' ]
    [ 'foo', 'bar', 'john', 'ritz' ]
    []
    [ 'foo', 'bar', 'john', 'ritz' ]`,
    `    [ 'foo' ]
    [ 'bar', 'john' ]
    [ 'foo', 'bar', 'john', 'ritz' ]
    []
    [ 'foo', 'bar', 'john', 'ritz' ]`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    (function(){
      var list = ['foo','bar','john'];
          console.log(list.splice(1));		
          console.log(list.splice(1,2));
          console.log(list);			
    })();`,
    [
      `[ 'bar', 'john' ] [] [ 'foo' ]`,
      `[ 'bar', 'john' ] [] [ 'bar', 'john' ]`,
      `[ 'bar', 'john' ] [ 'bar', 'john' ] [ 'bar', 'john' ]`,
      `[ 'bar', 'john' ] [] []`
    ],
    0
  ],
  [
    `What would be the output of following code ?`,
    `    (function(){
      var arrayNumb = [2, 8, 15, 16, 23, 42];
      arrayNumb.sort();
      console.log(arrayNumb);
    })();`,
    [
      `[ 2, 8, 15, 16, 23, 42 ]`,
      `[ 42, 23, 26, 15, 8, 2 ]`,
      `[ 15, 16, 2, 23, 42, 8 ]`,
      `[ 8, 42, 23, 2, 16, 15 ]`
    ],
    2
  ],
  [
    `What would be the output of following code ?`,
    `    var obj = {
      message: "Hello",
      innerMessage: !(function() {
        console.log(this.message);
      })()
    };
      
    console.log(obj.innerMessage);`,
    [
      `ReferenceError: this.message is not defined`,
      `undefined`,
      `Type Error`,
      `undefined true`
    ],
    3
  ],
  [
    `What would be the output of following code ?`,
    `    (function(){
      function sayHello(){
        var name = "Hi John";
        return 
        {
          fullName: name
        }
      }
      console.log(sayHello().fullName);
    })();`,
    [
      `Hi John`,
      `undefined`,
      `Reference Error`,
      `Uncaught TypeError: Cannot read property 'fullName' of undefined`
    ],
    3
  ],
  [
    `What would be the output of the following code ?`,
    `    var a = {};
    var b = { key: 'b' };
    var c = { key: 'c' };
    
    a[b] = 123;
    a[c] = 456;
    console.log(a[b]);`,
    [
      `undefined`,
      `123`,
      `456`,
      `Uncaught TypeError`
    ],
    2
  ],
  [
    `What would be the output of the following code ?`,
    `    foo();

    var foo = function() {
      console.log(false);
    }
    
    foo();
    
    function foo() {
      console.log(true);
    }
    
    foo();`,
    [
      `true false false`,
      `Uncaught TypeError false true`,
      `false false true`,
      `true true true`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `    (function() {
      var a = {};
      a.x = a = {'x': 1, 'y': 2};
      console.log(a.x);
    })();`,
    [
      `{x: 1, y: 2}`,
      `1`,
      `undefined`,
      `Uncaught TypeError`
    ],
    1
  ],
  [
    `What would be the output of the following code ?`,
    `    (function test() {
      console.log(
        function () {} instanceof Object,
        function () {} instanceof Function,
        Function instanceof Object,
        Object instanceof Function
      );
    })();`,
    [
      `true true true true`,
      `true true true false`,
      `false true false false`,
      `true false true false`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `    (function(){
      function test(){
        this.a = 1;
        var self = this;
        (function(){
          console.log(this.a);
          console.log(self.a);
        })();
  
        (() => {
          console.log(this.a);
          console.log(self.a);    
        })();
      }
      new test();
    })();`,
    [
      `1 1 1 1`,
      `undefined 1 1 1`,
      `undefined 1 undefined 1`,
      `undefined undefined undefined undefined`
    ],
    1
  ],
  [
    `What would be the output of the following code ?`,
    `    (function(){
      function test(){
        this.a = 1;
        var self = this;
        (function(){
          console.log(this.a);
          console.log(self.a);
        })();
  
        (() => {
          console.log(this.a);
          console.log(self.a);    
        })();
      }
      test();
    })();`,
    [
      `1 1 1 1`,
      `undefined 1 1 1`,
      `undefined 1 undefined 1`,
      `undefined undefined undefined undefined`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `   var User = function() {};

    User.prototype.attributes = {
      isAdmin: false
    };
    
    var admin = new User("Sam"),
      guest = new User("Bob");
    
    admin.attributes.isAdmin = true;
    
    alert(admin.attributes.isAdmin);
    alert(guest.attributes.isAdmin);`,
    [
      `true true`,
      `true false`,
      `false false`,
      `false true`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `    function Person(name) {
      if (name) this.options.name = name;
    }
    
    Person.prototype.options = {
      name: "Default name"
    };
    
    var foo = new Person("foo");
    var bar = new Person("bar");
    
    console.log(foo.options.name);
    console.log(bar.options.name);`,
    [
      `bar bar`,
      `Default name bar`,
      `bar foo`,
      `foo Default name`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `    fullname = 'Peter Parker';
    var obj = {
      fullname: 'Steve Rogers',
      prop: {
        fullname: 'Tony Stark',
        getFullname: function() {
          return this.fullname;
        }
      }
    };
    console.log(obj.prop.getFullname());
    var test = obj.prop.getFullname;
    console.log(test());`,
    [
      `Tony Stark Peter Parker`,
      `Tony Stark undefined`,
      `Tony Stark Steve Rogers`,
      `Steve Rogers Peter Parker`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `   function baz(){
    } 
    function bar(){
      return this;
    }
    function foo(){
      return foo;
    }
    console.log(typeof new baz());
    console.log(typeof new bar());
    console.log(typeof new foo());
    console.log(new baz() instanceof baz);
    console.log(new bar() instanceof bar);
    console.log(new foo() instanceof foo);`,
    [
      `object function function true false false`,
      `object object function true true false`,
      `function function function true false false`,
      `object object object true true true`
    ],
    1
  ],
  [
    `What would be the output of the following code ?`,
    `    console.log(true + false);
    console.log(0 + "0");
    console.log(true + 0);
    console.log("0" + false);`,
    [
      `1 0 1 0`,
      `true 0 true 0`,
      `1 00 1 0false`,
      `truefalse 00 true0 0false`
    ],
    2
  ],
  [
    `What would be the output of the following code (under ES6)?`,
    `    {
      function f() {
        console.log("a");
      }
      f();
      var a = 1;
    }
    {
      function f() {
        console.log("b");
      }
      console.log(a);
    }`,
    [
      `a 1`,
      `b 1`,
      `b undefined`,
      `a undefined`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `    length = 10;
    function fn() {
        console.log(this.length);
    }
    
    var obj = {
        length: 5,
        method: function(fn) {
            fn();
            fn.call(fn);
            arguments[0]();
        }
    }
    
    obj.method(fn, 1);`,
    [
      `10 0 2`,
      `10 0 5`,
      `undefined undefined undefined`,
      `undefined 0 undefined`
    ],
    0
  ],
  [
    `What would be the output of the following code ?`,
    `    function Foo() {
      this.getName = function() {
        console.log(3);
        return {
          getName: getName
        }
      };
      getName = function() {
        console.log(1);
      };
      return this;
    }
    
    Foo.getName = function() {
      console.log(2);
    };
    
    Foo.prototype.getName = function() {
      console.log(6);
    };
    
    var getName = function() {
      console.log(4);
    };
    
    function getName() {
      console.log(5);
    }
    
    Foo.getName();
    getName();
    Foo().getName();
    getName();
    new Foo.getName();
    new Foo().getName();
    new Foo().getName().getName();
    new new Foo().getName();`,
    [
      `2 4 1 1 2 3 3 1 3`,
      `2 5 1 1 2 1 1 1 1`,
      `6 5 3 1 2 1 1 1 1`,
      `2 4 1 1 2 3 1 1 3`
    ],
    0
  ]
];

function formatQuiz(arr) {
  return {
    header: arr[0],
    body: arr[1],
    items: arr[2]
  };
}

function shuffle(arr) {
  let l = arr.length, r, temp;
  while(l > 0) {
    r = Math.floor(Math.random() * l);
    l--;
    temp = arr[r];
    arr[r] = arr[l];
    arr[l] = temp;
  }
}

function genQuiz() {
  let indices = [...Array(quiz.length).keys()];
  shuffle(indices);
  return indices;
}

module.exports = {
  quiz,
  formatQuiz,
  genQuiz
};