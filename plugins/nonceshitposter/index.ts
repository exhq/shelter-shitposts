const {
    util: { log },
    http: { intercept }
} = shelter

const unintercept = intercept("post", /\/channels\/\d+\/messages/, (req, send) => {
    if(req?.body == null) {return send(req)}
    req.body.nonce = null
    if (req.body.attachments) {
        for (let i = 0; i < req.body.attachments.length; i++) {
            req.body.attachments[i] = {
                ...req.body.attachments[i],
                is_remix: true 
            };
        }
    }
    log(req.body)
    return send(req)
})

export function onUnload() {
    unintercept()
}