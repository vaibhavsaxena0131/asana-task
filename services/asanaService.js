import axios from 'axios';

export const getAccessToken = async (code) => {
    try {
        const res = await axios.post('https://app.asana.com/-/oauth_token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.ASANA_CLIENT_ID,
                client_secret: process.env.ASANA_CLIENT_SECRET,
                redirect_uri: process.env.ASANA_REDIRECT_URI,
                code,
            },
        });
        return res.data;
    } catch (err) {
        console.error("Failed to get access token:", err.response?.data || err.message);
        throw new Error("Failed to get access token");
    }
};

export const getTasks = async (accessToken) => {
    try {
        const res = await axios.get('https://app.asana.com/api/1.0/tasks', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;

    } catch (err) {
        console.error("Failed to get tasks:", err.response?.data || err.message);
        throw new Error("Failed to get tasks");
    }

};

export const createWebhook = async (accessToken, resourceId, targetUrl) => {
    try {
        const res = await axios.post('https://app.asana.com/api/1.0/webhooks', {
            data: {
                target: targetUrl,
                resource: resourceId
            }
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return res.data;

    } catch (err) {
        console.error("Failed to create webhook:", err.response?.data || err.message);
        throw new Error("Failed to create webhook");
    }

};

export const getUserTasks = async (accessToken) => {
    try {
        const meRes = await axios.get('https://app.asana.com/api/1.0/users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const workspaceGid = meRes.data.data.workspaces[0].gid;
        const tasksRes = await axios.get(
            `https://app.asana.com/api/1.0/tasks?assignee=me&workspace=${workspaceGid}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return tasksRes.data;
    } catch (err) {
        throw new Error('Failed to fetch tasks: ' + err.message);
    }
};
