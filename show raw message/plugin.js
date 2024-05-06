(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // plugins/show raw message/index.jsx
  var show_raw_message_exports = {};
  __export(show_raw_message_exports, {
    onUnload: () => onUnload
  });
  var {
    http: {
      intercept
    },
    util: {
      log
    }
  } = shelter;
  var endings = [
    "rawr x3",
    "OwO",
    "UwU",
    "o.O",
    "-.-",
    ">w<",
    "(\u2445\u02D8\uA4B3\u02D8)",
    "(\uA20D\u1D17\uA20D)",
    "(\u02D8\u03C9\u02D8)",
    "(U \u1D55 U\u2741)",
    "\u03C3\u03C9\u03C3",
    "\xF2\u03C9\xF3",
    "(///\u02EC///\u273F)",
    "(U \uFE4F U)",
    "( \u0361o \u03C9 \u0361o )",
    "\u0298w\u0298",
    ":3",
    ":3",
    // important enough to have twice
    ":3",
    // important enough to have thrice
    "XD",
    "nyaa~~",
    "mya",
    ">_<",
    "\u{1F633}",
    "\u{1F97A}",
    "\u{1F633}\u{1F633}\u{1F633}",
    "rawr",
    "^^",
    "^^;;",
    "(\u02C6 \uFECC \u02C6)\u2661",
    "^\u2022\uFECC\u2022^",
    "/(^\u2022\u03C9\u2022^)",
    "(\u273Fo\u03C9o)"
  ];
  var replacements = [["small", "smol"], ["cute", "kawaii"], ["fluff", "floof"], ["love", "luv"], ["stupid", "baka"], ["what", "nani"], ["meow", "nya"], ["hello", "hewwo"]];
  function selectRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  var isOneCharacterString = (str) => {
    return str.split("").every((char) => char === str[0]);
  };
  function replaceString(inputString) {
    let replaced = false;
    for (const replacement of replacements) {
      const regex = new RegExp(`\\b${replacement[0]}\\b`, "gi");
      if (regex.test(inputString)) {
        inputString = inputString.replace(regex, replacement[1]);
        replaced = true;
      }
    }
    return replaced ? inputString : false;
  }
  function uwuify(message) {
    const rule = /\S+|\s+/g;
    const words = message.match(rule);
    let answer = "";
    if (words === null)
      return "";
    for (let i = 0; i < words.length; i++) {
      if (isOneCharacterString(words[i]) || words[i].startsWith("https://")) {
        answer += words[i];
        continue;
      }
      if (!replaceString(words[i])) {
        answer += words[i].replace(/n(?=[aeo])/g, "ny").replace(/l|r/g, "w");
      } else
        answer += replaceString(words[i]);
    }
    answer += " " + selectRandomElement(endings);
    return answer;
  }
  var unintercept = intercept("post", /\/channels\/\d+\/messages/, (req, send) => {
    let newContent = req?.body?.content;
    log(newContent);
    if (!newContent) {
      return send(req);
    }
    if (newContent.startsWith("!u ")) {
      newContent = newContent.replace("!u ", "", 1);
      req.body.content = uwuify(newContent.toLowerCase());
    }
    return send(req);
  });
  function onUnload() {
    log("Goodbye, Wowwd fwom shewtew! ^^;;");
    unintercept();
  }
  return __toCommonJS(show_raw_message_exports);
})();
