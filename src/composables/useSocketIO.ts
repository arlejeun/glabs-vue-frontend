import { ref, watch, type Ref } from "vue";
import { io } from 'socket.io-client'

export const useSocketIO = () => {
    const socket = io('ws://localhost:3000')
    return {
        socket
    }
}