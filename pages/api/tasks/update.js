import db from '../../../utils/db';


export default async (req, res) => {
    const { id, status } = req.query;
    try {
      const taskRef = db.collection("tasks").doc(id)
      const updated = await taskRef.update({status: status})
      res.status(200).json({ updated });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
