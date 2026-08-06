import resend from "../config/resend.js";

export const sendWelcomeEmail = async (email, name) => {
  return await resend.emails.send({
    from: "Biblioteca V2 <onboarding@resend.dev>",
    to: email,
    subject: "¡Bienvenido a Biblioteca V2!",
    html: `
      <h2>Hola ${name}</h2>
      <p>Tu cuenta fue creada correctamente.</p>
    `,
  });
};
