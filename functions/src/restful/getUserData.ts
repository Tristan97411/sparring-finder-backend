import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions.https.onCall(
  async (
    data: Record<string, any>,
    context: functions.https.CallableContext
  ) => {
    try {
      // Vérifiez l'authentification de l'utilisateur avant de procéder à la mise à jour du profil
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "Vous devez être connecté pour mettre à jour le profil."
        );
      }

      // Assurez-vous que l'utilisateur a bien fourni son ID de profil
      const userId = context.auth.uid;
      if (!userId) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "L'ID de l'utilisateur est requis."
        );
      }

      // Mettez à jour les données du profil dans la collection "users" avec l'ID de l'utilisateur actuel
      const userSnap = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const userData = userSnap.data();
      return {
        status: "OK",
        message: "Profil récupéré ",
        userData: userData,
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
