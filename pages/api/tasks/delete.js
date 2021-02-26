import db from '../../../utils/db';

export default async (req, res) => {
    const { id } = req.query;

    try {
        await db.collection("tasks").doc(id).delete()
        res.status(200).json({"message": "Task deleted successfully."})
    } catch (error) {
        res.status(404).json({"message": error})
    }
      
}  
