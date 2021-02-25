import db from '../../../utils/db';


export default (req, res) => {
  const project = req.query;

  db.collection("tasks").where("project", "===", project)
    .get()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(404).json({"message": error}))
}    