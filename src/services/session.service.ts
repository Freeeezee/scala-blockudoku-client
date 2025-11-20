import {get} from "../utils/service.util";

export const joinSession = async (sessionId: string) => {
    await get(`/join-session/${sessionId}`);
}