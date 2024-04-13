const {
	flux: { intercept },
} = shelter;

const {
	util: { log }
} = shelter;


const unintercept = intercept((d) => {
	if (d.type === "MESSAGE_CREATE"){
		log(d)
		d.message.embeds = [...(d.message && d.message.embeds ? d.message.embeds : []), {
            type: "safety_policy_notice",
            title: "",
            description: "",
            fields: [
                {
                    name:"incident_time",
                    value:3
                },
                {
                    name:"classification_id",
                    value:3
                }
            ]
        }]
		return;
	}
});

export function onUnload() {
	log("Goodbye, World from shelter!")
	unintercept()
}
