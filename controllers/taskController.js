import { getUserTasks } from '../services/asanaService.js';

export const getTasksController = async (req, res) => {
    try {
        const token = req.app.locals.token?.access_token;
        if (!token) throw new Error('Access token not found');
        const tasks = await getUserTasks(token);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProjectDetails = async (req, res) => {
    const accessToken = req.app.locals.token?.access_token;
    const projects = await axios.get('https://app.asana.com/api/1.0/projects', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}