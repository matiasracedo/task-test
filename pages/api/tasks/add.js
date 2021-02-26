import db from '../../../utils/db'


export default async (req, res) => {
    const { task, project } = req.body;
    try {
      const newTask = await db.collection("tasks").doc(`${project}_${task}`).set({ task, project, status: 'pending' })
      res.status(200).json({ newTask });
    } catch (error) {
      res.status(400).json({ error });
    }
  };  