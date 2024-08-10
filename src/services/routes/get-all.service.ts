import { Routes } from "@prisma/client";
import { dbClient } from "../../config/database/client";

export const GetAllRoutes = async (): Promise<Routes[] | []> => {

    const routes = await dbClient.routes.findMany();

    routes?.map((route) => {
        console.log(process.env[route.jwtSecretsEnv]);
    })

    return routes ?? [];
}