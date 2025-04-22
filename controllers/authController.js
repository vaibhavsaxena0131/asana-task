import { getAccessToken } from '../services/asanaService.js';

export const redirectToAsana = (req, res) => {
    const redirectUri = encodeURIComponent(process.env.ASANA_REDIRECT_URI);
    const authUrl = `https://app.asana.com/-/oauth_authorize?client_id=${process.env.ASANA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&state=xyz`;
    res.redirect(authUrl);
};

export const handleAsanaCallback = async (req, res) => {
    try {
        const token = await getAccessToken(req.query.code);
        req.app.locals.token = token;
        res.json({ message: "OAuth Successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createWebhook = async (req, res) => {
    try {
        const accessToken = req.app.locals.token?.access_token;
        const projectId = process.env.PROJECT_ID;
        const targetUrl = process.env.TARGET_URL;
        const response = await axios.post(
            'https://app.asana.com/api/1.0/webhooks',
            qs.stringify({
                resource: projectId,
                target: targetUrl,
            }),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        res.json({ message: 'Webhook setup successful', response });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const getWebhook = async (req, res) => {
    const hookSecret = req.headers['x-hook-secret'];
    if (hookSecret) {
        res.set('X-Hook-Secret', hookSecret);
        return res.status(200).send();
    }
    console.log('Webhook received:', req.body);
    res.status(200).send('Received');
}