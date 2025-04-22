export const handleWebhook = (req, res) => {
    console.log("Webhook triggered:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
};