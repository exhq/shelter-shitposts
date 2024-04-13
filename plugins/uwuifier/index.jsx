const {
	http: { intercept },
    util: { log }
} = shelter;


const endings = [
    "rawr x3",
    "OwO",
    "UwU",
    "o.O",
    "-.-",
    ">w<",
    "(⑅˘꒳˘)",
    "(ꈍᴗꈍ)",
    "(˘ω˘)",
    "(U ᵕ U❁)",
    "σωσ",
    "òωó",
    "(///ˬ///✿)",
    "(U ﹏ U)",
    "( ͡o ω ͡o )",
    "ʘwʘ",
    ":3", 
    ":3", // important enough to have twice
    ":3", // important enough to have thrice
    "XD",
    "nyaa~~",
    "mya",
    ">_<",
    "😳",
    "🥺",
    "😳😳😳",
    "rawr",
    "^^",
    "^^;;",
    "(ˆ ﻌ ˆ)♡",
    "^•ﻌ•^",
    "/(^•ω•^)",
    "(✿oωo)"
];

const replacements = [
    ["small", "smol"],
    ["cute", "kawaii"],
    ["fluff", "floof"],
    ["love", "luv"],
    ["stupid", "baka"],
    ["what", "nani"],
    ["meow", "nya"],
    ["hello", "hewwo"],
];

function selectRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
// returns true if all characters in the string are the same
// "aaaaaaaaaaaaa" -> true
// "aaaaaaaaaaaab" -> false
const isOneCharacterString = (str) => {
    return str.split('').every((char) => char === str[0]);
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

    if (words === null) return "";

    for (let i = 0; i < words.length; i++) {
        if (isOneCharacterString(words[i]) || words[i].startsWith("https://")) {
            answer += words[i];
            continue;
        }

        if (!replaceString(words[i])) {
            answer += words[i]
                .replace(/n(?=[aeo])/g, "ny")
                .replace(/l|r/g, "w");
        } else answer += replaceString(words[i]);

    }

    answer += " " + selectRandomElement(endings);
    return answer;
}

const unintercept = intercept(
	"post",
	/\/channels\/\d+\/messages/,
	(req, send) => {
		let newContent = req?.body?.content;
		log(newContent);
		if (!newContent) {
			return send(req);
		}
		if (newContent.startsWith("!u ")) {
			newContent = newContent.replace("!u ", "", 1)
			req.body.content = uwuify(newContent.toLowerCase());
		}
		return send(req);
	}
);

export function onUnload() {
	log("Goodbye, Wowwd fwom shewtew! ^^;;")
	unintercept()
}
