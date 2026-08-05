import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

async function main() {
  const password = await bcrypt.hash("Admin123*", 10);

  await prisma.user.create({
    data: {
      name: "Administrador",
      lastname: "Sistema",
      username: "admin",
      email: "admin@biblioteca.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("Administrador creado.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
