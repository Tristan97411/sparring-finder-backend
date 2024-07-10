import createNewUserWithMail from "./restful/createNewUserWithMail";
import updateProfileData from "./restful/updateProfileData";
import * as admin from "firebase-admin";
import getUserData from "./restful/getUserData";
import { updateSportsPalmares } from "./restful/updateSportsPalmares";
import getUsersBySport from "./restful/getUsersBySport";

admin.initializeApp();

exports.createNewUserWithMail = createNewUserWithMail;
exports.updateProfileData = updateProfileData;
exports.updateSportsPalmares = updateSportsPalmares;
exports.getUserData = getUserData;
exports.getUsersBySport = getUsersBySport;
