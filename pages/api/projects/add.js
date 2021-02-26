import db from '../../../utils/db'


export default async (req, res) => {
    const { name, user } = req.body;
    try {
      const project = await db.collection("projects").doc(`project_${name}`).set({ name, user })
      res.status(200).json({ project });
    } catch (error) {
      res.status(400).json({ error });
    }
  };