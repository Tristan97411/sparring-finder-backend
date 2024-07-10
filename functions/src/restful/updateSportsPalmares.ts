import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const updateSportsPalmares = functions.https.onCall(
  async (data: Record<string, any>, context) => {
    try {
      // Vérifiez l'authentification de l'utilisateur avant de procéder à la mise à jour du palmarès sportif
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "Vous devez être connecté pour mettre à jour le palmarès sportif."
        );
      }

      // Récupérer l'ID de l'utilisateur authentifié
      const userId = context.auth.uid;

      const sportNames = data.sportsPalmares.map((sport: any) => sport.name);

      // Mettre à jour les données du palmarès sportif dans la collection "users" avec l'ID de l'utilisateur actuel
      await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          { sportsPalmares: data.sportsPalmares, sportNames: sportNames },
          { merge: true }
        );

      return {
        status: "OK",
        message: "Palmarès sportif mis à jour avec succès",
        userId,
      };
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du palmarès sportif :",
        error
      );
      throw new functions.https.HttpsError(
        "internal",
        "Une erreur est survenue lors de la mise à jour du palmarès sportif."
      );
    }
  }
);
