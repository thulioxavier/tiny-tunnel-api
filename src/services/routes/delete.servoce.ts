import { dbClient } from "../../config/database/client"

export const DeleteRouter = async (routerId: string) => {
    const output = await dbClient.routes.delete({where: {
        id: routerId
    }});

    return output;
}