import db from '../../../utils/db';

export default async (req, res) => {
    const { id } = req.query;

    try {
        await db.collection("projects").doc(id).delete()
        res.status(200).json({"message": "Project deleted successfully."})
    } catch (error) {
        res.status(404).json({"message": error})
    }
      
}    