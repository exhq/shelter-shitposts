const {
	http: { intercept },
    util: { log }
} = shelter;




const unintercept = intercept(
	"post",
	/\/channels\/\d+\/messages/,
	(req, send) => {
		let newContent = req?.body?.content; // this variable technically unnecessary
        if (!newContent) return
        req.body.content = "mmeowwww";
		return send(req);
	},
);


export function onUnload() {
	log("Goodbye, World from shelter!")
	unintercept()
}
