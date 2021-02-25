import db from '../../utils/db';


export default (req, res) => {
  const {firstName, lastName, email, id} = req.body;

db.collection("users").doc(id).set({
    firstName,
    lastName,
    email
})
.then(result => res.status(200).json(result))
.catch(error => res.status(404).json({"message": error}))

}  