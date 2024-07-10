import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions.https.onCall(
  async (
    data: Record<string, any>,
    context: functions.https.CallableContext
  ) => {
    try {
      // Mettez à jour les données du profil dans la collection "users" avec l'ID de l'utilisateur actuel
      const usersSnap = await admin
        .firestore()
        .collection("users")
        .where("sportNames", "array-contains", data.sport)
        .get();

      const users = [];

      if (!usersSnap.empty) {
        for (const userSnap of usersSnap.docs) {
          users.push(userSnap.data());
        }
      }

      return {
        status: "OK",
        message: "Profil récupéré ",
        users: users,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      throw new functions.https.HttpsError(
        "internal",
        "Une erreur est survenue lors de la mise à jour du profil."
      );
    }
  }
);
