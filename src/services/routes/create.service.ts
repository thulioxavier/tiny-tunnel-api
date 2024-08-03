import { Routes } from "@prisma/client";
import { dbClient } from "../../config/database/client";
import { exec } from "child_process";

export const Create = async (
  data: Omit<Routes, "id" | "createdAt" | "updatedAt">
) => {
  const route = await dbClient.routes.create({
    data,
  });

  exec("./restart.sh");

  return route;
};
