import db from '../../../utils/db';

export default async (req, res) => {
    const { project } = req.query;
    let tasks = [];

    try {
        const taskRef = db.collection("tasks").where("project", "==", project)
        const snapshot = await taskRef.get()
        snapshot.forEach(doc => {
          tasks.unshift({...doc.data(), id: doc.id})
        })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json({"message": error})
    }
      
}   