import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export default functions.https.onCall(async (data: Record<string, any>) => {
  try {
    const { uid: userId } = await admin.auth().createUser({
      email: data.email,
      password: data.password,
    });

    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .set({ email: data.email, ...data.userData }, { merge: true });

    return {
      status: "OK",
      message: "user created",
      userId,
    };
  } catch (e) {
    console.log(e);
    const err = e as {
      codePrefix: string;
      errorInfo: { code: string | number; message: string };
    };
    return {
      status: "ERROR",
      fbCode: err.errorInfo.code,
      message: err.errorInfo.message,
    };
  }
});
