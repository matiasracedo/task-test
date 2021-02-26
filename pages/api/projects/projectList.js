import db from '../../../utils/db';

export default async (req, res) => {
    const { user } = req.query;
    let projects = [];

    try {
        const projectRef = db.collection("projects").where("user", "==", user)
        const snapshot = await projectRef.get()
        snapshot.forEach(doc => {
        projects.unshift({...doc.data(), id: doc.id})
        })
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({"message": error})
    }
      
}    

