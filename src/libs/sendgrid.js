// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require("@sendgrid/mail");
import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function months(number) {
  const monthsArray = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return monthsArray[number - 1];
}

function weekdayName(day) {
  const weekArray = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return weekArray[day];
}

function requestEmail(
  email,
  name,
  fullname,
  level,
  image,
  type,
  title,
  fullDate
) {
  const templateData = {
    email: email,
    name: name,
    fullname: fullname,
    level: level,
    image: image,
    type: type,
    title: title,
    year: fullDate.getFullYear(),
    month: months(fullDate.getMonth()),
    day: fullDate.getDate(),
    time: fullDate.toLocaleTimeString("en-US"),
    week: weekdayName(fullDate.getDay()),
  };

  const msg = {
    to: email,
    from: { name: "FitBuddy", email: "fitbuddy.kodemia@gmail.com" },
    subject: `¡Tienes una solicitud de carrera de ${name}!`,
    templateId: "d-50f9a8a9b15a4cb5b67977a621e998cb",
    dynamic_template_data: templateData,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Enviado!");
    })
    .catch((error) => {
      console.error(error);
    });
}

function acceptedEmail(
  runnerName,
  email,
  name,
  level,
  km,
  raceImage,
  type,
  title,
  fullDate,
  desc
) {
  const templateData = {
    runnerName: runnerName,
    email: email,
    name: name,
    level: level,
    km: km,
    raceImage: raceImage,
    type: type,
    title: title,
    desc: desc,
    year: fullDate.getFullYear(),
    month: months(fullDate.getMonth()),
    day: fullDate.getDate(),
    time: fullDate.toLocaleTimeString("en-US"),
    week: weekdayName(fullDate.getDay()),
  };
  const msg = {
    to: email,
    from: { name: "FitBuddy", email: "fitbuddy.kodemia@gmail.com" },
    subject: `¡${runnerName} te ha aceptado para correr!`,
    templateId: "d-8ca50ca9e18a4fe68e5ca139a408ba20",
    dynamic_template_data: templateData,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Enviado!");
    })
    .catch((error) => {
      console.error(error);
    });
}

export { requestEmail, acceptedEmail };
