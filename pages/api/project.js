import db from '../../utils/db'
import { firebase } from '../../src/firebase';
import "firebase/auth";

let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) uid = user.uid;
});

export default async (req, res) => {
    const { name } = req.body;
    try {
      const project = await db.collection("projects").doc(`project_${name}`).set({ name, user: uid })
      res.status(200).json({ project });
    } catch (error) {
      res.status(400).json({ error });
    }
  };