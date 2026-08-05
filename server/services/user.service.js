import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// Iniciar sesión
export async function login(username, password) {
  // Buscar usuario
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // Validar usuario
  if (!user) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  // Comparar contraseña
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  // Generar token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  // Eliminar la contraseña de la respuesta
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
}

// Obtener todos los usuarios
export async function getAllUsers() {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count(),
  ]);

  return {
    total,
    users,
  };
}

// Obtener usuario por id
export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}

// Crear usuario
export async function createUser(userData) {
  const passwordHash = await bcrypt.hash(userData.password, 10);

  return await prisma.user.create({
    data: {
      ...userData,
      password: passwordHash,
    },
  });
}

// Actualizar usuario
export async function updateUser(id, userData) {
  const data = {
    name: userData.name,
    lastname: userData.lastname,
    username: userData.username,
    email: userData.email,
    role: userData.role,
  };

  // Solo actualizar la contraseña si el usuario escribió una nueva
  if (userData.password && userData.password.trim() !== "") {
    data.password = await bcrypt.hash(userData.password, 10);
  }

  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  });
}
// Eliminar usuario
export async function deleteUser(id) {
  return await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
}
