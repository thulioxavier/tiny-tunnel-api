import { exec } from "child_process"
import { FastifyReply, FastifyRequest } from "fastify";
import { promisify } from "util"
export const RestartService = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const restart = promisify(exec);

        const scriptPath = '/workspaces/tiny-tunnel-api/src/ssh/restart.sh';

        const { stdout, stderr } = await restart(`bash ${scriptPath}`);

        console.log(stdout, stderr);

        if (stderr) {
            request.log.error({ action: 'Server restart error', stderr });
            reply.status(500).send({ error: 'Failed to restart server', details: stderr });
        } else {
            request.log.info({ action: 'Server restarted', stdout });
            reply.status(200).send({ message: 'Server is restarting', details: stdout });
        }

    } catch (error) {
        request.log.error({ action: 'Server restart exception', error });
        reply.status(500).send({ error: 'Internal Server Error', message: 'Failed to execute restart script' });
    }
}