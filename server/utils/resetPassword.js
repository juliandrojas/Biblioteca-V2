import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

async function resetAdmin() {
  const password = await bcrypt.hash("Admin123*", 10);

  await prisma.user.update({
    where: {
      username: "juliand.rojas", // o el username de tu administrador
    },
    data: {
      password,
    },
  });

  console.log("Contraseña actualizada");
}

resetAdmin()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
