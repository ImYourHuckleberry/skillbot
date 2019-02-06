var SlackBot = require("slackbots");
const request = require("request");
var channel = "bottest";
var skillArray = [];
var mysql = require("mysql");
var displayName = "testname";
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const masterSkillList = [
  "A# .NET",
  "A# (Axiom)",
  "A-0 System",
  "A+",
  "A++",
  "ABAP",
  "ABC",
  "ABC ALGOL",
  "ABSET",
  "ABSYS",
  "ACC",
  "Accent",
  "Ace DASL",
  "ACL2",
  "ACT-III",
  "Action!",
  "ActionScript",
  "Actor",
  "Ada",
  "Adenine",
  "Agda",
  "Agilent VEE",
  "Agora",
  "AIMMS",
  "Aldor",
  "Alef",
  "ALF",
  "ALGOL 58",
  "ALGOL 60",
  "ALGOL 68",
  "ALGOL W",
  "Alice",
  "Alma-0",
  "AmbientTalk",
  "Amiga E",
  "AMOS",
  "AMPL",
  "AngelScript",
  "Angular",
  "Apex",
  "APL",
  "App Inventor",
  "AppleScript",
  "APT",
  "Arc",
  "ARexx",
  "Argus",
  "AspectJ",
  "Assembly language",
  "ATS",
  "Ateji PX",
  "AutoHotkey",
  "Autocoder",
  "AutoIt",
  "AutoLISP / Visual LISP",
  "Averest",
  "AWK",
  "Axum",
  "Active Server Pages",
  "B",
  "B",
  "Babbage",
  "Ballerina",
  "Bash",
  "BASIC",
  "bc",
  "BCPL",
  "BeanShell",
  "Batch file",
  "Bertrand",
  "BETA",
  "BLISS",
  "Blockly",
  "BlooP",
  "Boo",
  "Boomerang",
  "Bourne shell",
  "BPEL",
  "Business Basic",
  "C",
  "C",
  "C--",
  "C++",
  "C*",
  "C#",
  "C/AL",
  "Caché ObjectScript",
  "C Shell",
  "Caml",
  "Cayenne",
  "CDuce",
  "Cecil",
  "Cesil",
  "Céu",
  "Ceylon",
  "CFEngine",
  "Cg",
  "Ch",
  "Chapel",
  "Charity",
  "Charm",
  "CHILL",
  "CHIP-8",
  "chomski",
  "ChucK",
  "Cilk",
  "Citrine",
  "CL (IBM)",
  "Claire",
  "Clarion",
  "Clean",
  "Clipper",
  "CLIPS",
  "CLIST",
  "Clojure",
  "CLU",
  "CMS-2",
  "COBOL – ISO/IEC 1989",
  "CobolScript – COBOL Scripting language",
  "Cobra",
  "CoffeeScript",
  "ColdFusion",
  "COMAL",
  "Combined Programming Language (CPL)",
  "COMIT",
  "Common Intermediate Language (CIL)",
  "Common Lisp (also known as CL)",
  "COMPASS",
  "Component Pascal",
  "Constraint Handling Rules (CHR)",
  "COMTRAN",
  "Cool",
  "Coq",
  "Coral 66",
  "CorVision",
  "COWSEL",
  "CPL",
  "Cryptol",
  "Crystal",
  "Csound",
  "CSP",
  "Cuneiform",
  "Curl",
  "Curry",
  "Cybil",
  "Cyclone",
  "Cython",
  "Carvalho",
  "D",
  "D",
  "DASL (Datapoint's Advanced Systems Language)",
  "Dart",
  "Darwin",
  "DataFlex",
  "Datalog",
  "DATATRIEVE",
  "dBase",
  "dc",
  "DCL",
  "Delphi",
  "DinkC",
  "DIBOL",
  "Dog",
  "Draco",
  "DRAKON",
  "Dylan",
  "DYNAMO",
  "DAX (Data Analysis Expressions)",
  "E",
  "E",
  "Ease",
  "Easy PL/I",
  "EASYTRIEVE PLUS",
  "eC",
  "ECMAScript",
  "Edinburgh IMP",
  "EGL",
  "Eiffel",
  "ELAN",
  "Elixir",
  "Elm",
  "Emacs Lisp",
  "Emerald",
  "Epigram",
  "EPL (Easy Programming Language)",
  "EPL (Eltron Programming Language)",
  "Erlang",
  "es",
  "Escher",
  "ESPOL",
  "Esterel",
  "Etoys",
  "Euclid",
  "Euler",
  "Euphoria",
  "EusLisp Robot Programming Language",
  "CMS EXEC (EXEC)",
  "EXEC 2",
  "Executable UML",
  "F",
  "F",
  "F#",
  "F*",
  "Factor",
  "Fantom",
  "FAUST",
  "FFP",
  "Fjölnir",
  "FL",
  "Flavors",
  "Flex",
  "FlooP",
  "FLOW-MATIC",
  "FOCAL",
  "FOCUS",
  "FOIL",
  "FORMAC",
  "@Formula",
  "Forth",
  "Fortran – ISO/IEC 1539",
  "Fortress",
  "FoxBase",
  "FoxPro",
  "FP",
  "Franz Lisp",
  "F-Script",
  "G",
  "G",
  "Game Maker Language",
  "GameMonkey Script",
  "GAMS",
  "GAP",
  "G-code",
  "GDScript",
  "Genie",
  "GDL",
  "GJ",
  "GEORGE",
  "GLSL",
  "GNU E",
  "GM",
  "Go",
  "Go!",
  "GOAL",
  "Gödel",
  "Golo",
  "GOM (Good Old Mad)",
  "Google Apps Script",
  "Gosu",
  "GOTRAN",
  "GPSS",
  "GraphTalk",
  "GRASS",
  "Grasshopper",
  "Groovy",
  "H",
  "Hack",
  "HAGGIS",
  "HAL/S",
  "Halide (programming language)",
  "Hamilton C shell",
  "Harbour",
  "Hartmann pipelines",
  "Haskell",
  "Haxe",
  "Hermes",
  "High Level Assembly",
  "HLSL",
  "HolyC",
  "Hop",
  "Hopscotch",
  "Hope",
  "Hugo",
  "Hume",
  "HyperTalk",
  "Hexa",
  "I",
  "Io",
  "Icon",
  "IBM Basic assembly language",
  "IBM BASICA",
  "IBM HAScript",
  "IBM Informix-4GL",
  "IBM RPG",
  "Irineu",
  "IDL",
  "Idris",
  "Inform",
  "J",
  "J",
  "J#",
  "J++",
  "JADE",
  "JAL",
  "Janus (concurrent constraint programming language)",
  "Janus (time-reversible computing programming language)",
  "JASS",
  "Java",
  "JavaFX Script",
  "JavaScript",
  "JCL",
  "JEAN",
  "Join Java",
  "JOSS",
  "Joule",
  "JOVIAL",
  "Joy",
  "JScript",
  "JScript .NET",
  "JSON",
  "Julia",
  "Jython",
  "K",
  "K",
  "Kaleidoscope",
  "Karel",
  "Karel++",
  "KEE",
  "Kixtart",
  "Klerer-May System",
  "KIF",
  "Kojo",
  "Kotlin",
  "KRC",
  "KRL",
  "KRL (KUKA Robot Language)",
  "KRYPTON",
  "Korn shell (ksh)",
  "Kodu",
  "Kv",
  "L",
  "LabVIEW",
  "Ladder",
  "LANSA",
  "Lasso",
  "LaTeX",
  "Lava",
  "LC-3",
  "Leda",
  "Legoscript",
  "LIL",
  "LilyPond",
  "Limbo",
  "Limnor",
  "LINC",
  "Lingo",
  "LINQ",
  "LIS",
  "LISA",
  "Lisp – ISO/IEC 13816",
  "Lite-C",
  "Lithe",
  "Little b",
  "LLL",
  "Logo",
  "Logtalk",
  "LotusScript",
  "LPC",
  "LSE",
  "LSL",
  "LiveCode",
  "LiveScript",
  "Lua",
  "Lucid",
  "Lustre",
  "LYaPAS",
  "Lynx",
  "M",
  "M (alternative name for the MUMPS programming language)",
  "M2001",
  "M4",
  "M#",
  "Machine code",
  "MAD (Michigan Algorithm Decoder)",
  "MAD/I",
  "Magik",
  "Magma",
  "make",
  "Maude system",
  "Maple",
  "MAPPER (now part of BIS)",
  "MARK-IV (now VISION:BUILDER)",
  "Mary",
  "MASM Microsoft Assembly x86",
  "MATH-MATIC",
  "Mathematica",
  "MATLAB",
  "Maxima (see also Macsyma)",
  "Max (Max Msp – Graphical Programming Environment)",
  "MaxScript internal language 3D Studio Max",
  "Maya (MEL)",
  "MDL",
  "Mercury",
  "Mesa",
  "Metafont",
  "MetaQuotes Language (MQL4/MQL5)",
  "MHEG-5 (Interactive TV programming language)",
  "Microcode",
  "MicroScript",
  "MIIS",
  "Milk (programming language)",
  "MIMIC",
  "Mirah",
  "Miranda",
  "MIVA Script",
  "ML",
  "Model 204",
  "Modelica",
  "Modula",
  "Modula-2",
  "Modula-3",
  "Mohol",
  "MOO",
  "Mortran",
  "Mouse",
  "MPD",
  "Mathcad",
  "MSIL – deprecated name for CIL",
  "MSL",
  "MUMPS",
  "MuPAD",
  "Mutan",
  "Mystic Programming Language (MPL)",
  "N",
  "NASM",
  "Napier88",
  "Neko",
  "Nemerle",
  "NESL",
  "Net.Data",
  "NetLogo",
  "NetRexx",
  "NewLISP",
  "NEWP",
  "Newspeak",
  "NewtonScript",
  "Nial",
  "Nice",
  "Nickle (NITIN)",
  "Nim",
  "NPL",
  "Not eXactly C (NXC)",
  "Not Quite C (NQC)",
  "NSIS",
  "Nu",
  "NWScript",
  "NXT-G",
  "O",
  "o:XML",
  "Oak",
  "Oberon",
  "OBJ2",
  "Object Lisp",
  "ObjectLOGO",
  "Object REXX",
  "Object Pascal",
  "Objective-C",
  "Objective-J",
  "Obliq",
  "OCaml",
  "occam",
  "occam-π",
  "Octave",
  "OmniMark",
  "Onyx",
  "Opa",
  "Opal",
  "OpenCL",
  "OpenEdge ABL",
  "OPL",
  "OpenVera",
  "OPS5",
  "OptimJ",
  "Orc",
  "ORCA/Modula-2",
  "Oriel",
  "Orwell",
  "Oxygene",
  "Oz",
  "P",
  "P",
  "P4",
  "P′′",
  "ParaSail (programming language)",
  "PARI/GP",
  "Pascal – ISO 7185",
  "PCASTL",
  "PCF",
  "PEARL",
  "PeopleCode",
  "Perl",
  "PDL",
  "Perl 6",
  "Pharo",
  "PHP",
  "Pico",
  "Picolisp",
  "Pict",
  "Pig (programming tool)",
  "Pike",
  "PIKT",
  "PILOT",
  "Pipelines",
  "Pizza",
  "PL-11",
  "PL/0",
  "PL/B",
  "PL/C",
  "PL/I – ISO 6160",
  "PL/M",
  "PL/P",
  "PL/SQL",
  "PL360",
  "PLANC",
  "Plankalkül",
  "Planner",
  "PLEX",
  "PLEXIL",
  "Plus",
  "POP-11",
  "POP-2",
  "PostScript",
  "PortablE",
  "POV-Ray SDL",
  "Powerhouse",
  "PowerBuilder – 4GL GUI application generator from Sybase",
  "PowerShell",
  "PPL",
  "Processing",
  "Processing.js",
  "Prograph",
  "PROIV",
  "Prolog",
  "PROMAL",
  "Promela",
  "PROSE modeling language",
  "PROTEL",
  "ProvideX",
  "Pro*C",
  "Pure",
  "PureBasic",
  "Pure Data",
  "Python",
  "Q",
  "Q (equational programming language)",
  "Q (programming language from Kx Systems)",
  "Q# (Microsoft programming language)",
  "Qalb",
  "QtScript",
  "QuakeC",
  "QPL",
  "R",
  "R",
  "R++",
  "Racket",
  "RAPID",
  "Rapira",
  "Ratfiv",
  "Ratfor",
  "rc",
  "React",
  "REBOL",
  "Red",
  "Redcode",
  "Redux",
  "REFAL",
  "Reia",
  "REXX",
  "Ring",
  "Rlab",
  "ROOP",
  "RPG",
  "RPL",
  "RSL",
  "RTL/2",
  "Ruby",
  "RuneScript",
  "Rust",
  "S",
  "S",
  "S2",
  "S3",
  "S-Lang",
  "S-PLUS",
  "SA-C",
  "SabreTalk",
  "SAIL",
  "SALSA",
  "SAM76",
  "SAS",
  "SASL",
  "Sather",
  "Sawzall",
  "Scala",
  "Scheme",
  "Scilab",
  "Scratch",
  "Script.NET",
  "Sed",
  "Seed7",
  "Self",
  "SenseTalk",
  "SequenceL",
  "Serpent",
  "SETL",
  "SIMPOL",
  "SIGNAL",
  "SiMPLE",
  "SIMSCRIPT",
  "Simula",
  "Simulink",
  "Singularity",
  "SISAL",
  "SLIP",
  "SMALL",
  "Smalltalk",
  "SML",
  "Strongtalk",
  "Snap!",
  "SNOBOL (SPITBOL)",
  "Snowball",
  "SOL",
  "Solidity",
  "SOPHAEROS",
  "SPARK",
  "Speedcode",
  "SPIN",
  "SP/k",
  "SPS",
  "SQL",
  "SQR",
  "Squeak",
  "Squirrel",
  "SR",
  "S/SL",
  "Starlogo",
  "Strand",
  "Stata",
  "Stateflow",
  "Subtext",
  "SBL",
  "SuperCollider",
  "SuperTalk",
  "Swift (Apple programming language)",
  "Swift (parallel scripting language)",
  "SYMPL",
  "SystemVerilog",
  "T",
  "T",
  "TACL",
  "TACPOL",
  "TADS",
  "TAL",
  "Tcl",
  "Tea",
  "TECO",
  "TELCOMP",
  "TeX",
  "TEX",
  "TIE",
  "TMG, compiler-compiler",
  "Tom",
  "TOM",
  "Toi",
  "Topspeed",
  "TPU",
  "Trac",
  "TTM",
  "T-SQL",
  "Transcript",
  "TTCN",
  "Turing",
  "TUTOR",
  "TXL",
  "TypeScript",
  "Tynker",
  "U",
  "Ubercode",
  "UCSD Pascal",
  "Umple",
  "Unicon",
  "Uniface",
  "UNITY",
  "Unix shell",
  "UnrealScript",
  "V",
  "Vala",
  "Verilog",
  "VHDL",
  "Vim script",
  "Viper",
  "Visual Basic",
  "Visual Basic .NET",
  "Visual DataFlex",
  "Visual DialogScript",
  "Visual Fortran",
  "Visual FoxPro",
  "Visual J++",
  "Visual J#",
  "Visual LISP",
  "Visual Objects",
  "Visual Prolog",
  "VSXu",
  "V++",
  "W",
  "WATFIV, WATFOR",
  "WebAssembly",
  "WebDNA",
  "Whiley",
  "Winbatch",
  "Wolfram Language",
  "Wyvern",
  "X",
  "X++",
  "X10",
  "xBase",
  "xBase++",
  "XBL",
  "XC (targets XMOS architecture)",
  "xHarbour",
  "XL",
  "Xojo",
  "XOTcl",
  "XOD (programming language)",
  "XPath",
  "XPL",
  "XPL0",
  "XQuery",
  "XSB",
  "XSharp",
  "XSLT",
  "Xtend",
  "Y",
  "Yorick",
  "YQL",
  "Yoix",
  "Z",
  "Z notation",
  "Zebra, ZPL, ZPL2",
  "Zeno",
  "ZetaLisp",
  "ZFRAME",
  "ZOPL",
  "Zsh",
  "ZPL",
  "Z++"
];
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

var bot = new SlackBot({
  token: "xoxb-3488203655-535560171009-a2vox4OBmRBQdidf3J6fuBt8",
  name: "skillbot"
});
//bot.on fires when the bot starts up
bot.on("start", function() {
  bot.postMessageToChannel(channel, "Hello world!");
});
//listens for messages, does nothing if not recieving a message. Once it gets a message it calls "handleMessage()"
bot.on("message", function(data) {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data, data.text);
});

//handleMessage() will look for keywords in the message to determine what to do. Keywords include addSkill, skillbotInfo, mySkills, and skillbotGetInfo

//addSkill will get the users skills and user name and store those in the database if they are new or update based on name if they are already in database
//this needs to be changed from display_name to real_name so that it will be consistent

//skillbotInfo attempts to let users know the prompts
//the trouble with that is that skillbot then says the prompts and tries to execute its other functions
//this breaks the app

//myInfo returns the list of skills associated with you in the database

//skillbotGetInfo takes a name after the prompt and will return all skills associated with that name

function handleMessage(data, message) {
  if (message.includes("addSkill")) {
    console.log("i fired");
    skillArray = [];
    parseSkills(message);

    getUserProfile(data.user, function(error, profile) {
      if (error) {
        // do something for errror
        return; // very important to return if there is an error
      }

      console.log("the line im lookingat " + profile);
      sendGreeting(profile);
    });
  }

  //I crash the app because I say the word skillbot but am not associated with a user, I need fixed
  else if (message.includes("skillbotInfo")) {
    bot.postMessageToChannel(
      channel,
      `To use skillbot type "addSkill" followed by a comma seperated list of your skills`
    );
  } else if (message.includes("mySkills")) {
    getUserProfile(data.user, function(error, profile) {
      if (error) {
        // do something for errror
        return; // very important to return if there is an error
      }
      displayName = profile.toString();
      getMongoSkills(displayName);
    });
  } else if (message.includes("skillbotGetInfo")) {
    parseName(message, function(error, profile) {
      if (error) {
      }
    });
    console.log(skillArray);
    // getSkills(skillArray);
    getMongoSkills(skillArray);
  }
}

function parseName(message) {
  var justName = message.replace("skillbotGetInfo ", "");

  skillArray = justName;
}

//need to get the array as array of strings not one big array of a string
function parseSkills(message) {
  const newMessage = message.replace("addSkill ", "");
  console.log(newMessage);
  skills = newMessage.split(", ");
  console.log("skills " + skills);
  isApproved(skills);
}
const isApproved = skills => {
  const masterToLower = masterSkillList.map(skill => skill.toLowerCase);
  skills.map(skill => {
    if (masterSkillList.includes(skill.toLowerCase)) {
      console.log("I APPROVE");
      skillArray.push(skill);
    } else if (!masterSkillList.includes(skill.masterToLower)) {
      console.log("I DISSAPPROVE");
      bot.postMessageToChannel(
        channel,

        "CURRENTLY I AM SUPER CASE SENSITIVE AND '" +
          skill +
          "' IS NOT APPROVED. PLEASE MESSAGE TYLER KRINGS TO HAVE IT ADDED TO OUR LIST "
      );
    }
  });
};

function getUserProfile(userId, cb) {
  request(
    `https://slack.com/api/users.info?token=xoxp-3488203655-524808429478-537915642215-8ee3d6af78079e5ba84049352ff4ec1b&user=${userId}&pretty=1`,
    function(error, response, body) {
      if (error) {
        cb(error, {}); // call the callback with the error first and an empty object. Error first is a node convention.
        return;
      }
      var jsonResponse = JSON.parse(body);
      name = jsonResponse.user.profile.real_name;
      string = JSON.stringify(name);
      console.log(string);
      console.log(jsonResponse);
      cb(null, name);
    }
  );
}

function sendGreeting(displayName) {
  var greeting = getGreeting();
  if (skillArray.length > 0) {
    bot.postMessageToChannel(
      channel,
      greeting +
        " " +
        displayName +
        " you have added " +
        skillArray +
        " to your list of skills"
    );
  }

  //isExistingUser(displayName, stringSkills);
  isExistingMongoUser(displayName, skillArray);
}

function getGreeting() {
  var greetings = [
    "hello!",
    "hi there!",
    "cheerio!",
    "how do you do!",
    "¡hola!"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function isExistingMongoUser(name, skillArray) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("skillDatabase").findOne({ name: name }, function(err, res) {
      if (err) throw err;

      if (res === null) {
        enterMongoData(name, skillArray);
      } else {
        updateMongoData(name, skillArray);
      }
      db.close();
    });
  });
}

function enterMongoData(name, skillArray) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: name, skills: skillArray };
    dbo.collection("skillDatabase").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
}

function updateMongoData(name, skillArray) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    console.log(skillArray);
    for (let i = 0; i < skillArray.length; i++) {
      dbo
        .collection("skillDatabase")
        .update(
          { name: name },
          { $addToSet: { skills: skillArray[i] } },
          function(err, res) {
            if (err) throw err;
            db.close();
          }
        );
    }
  });
}

function getMongoSkills(name) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    console.log(name);
    var query = { name: name };
    dbo
      .collection("skillDatabase")
      .find(query)
      .toArray(function(err, result) {
        if (err) throw err;
        console.log("skills");
        console.log(result[0].skills);
        console.log(result);

        bot.postMessageToChannel(channel, result[0].skills.toString());
        db.close();
      });
  });
}
