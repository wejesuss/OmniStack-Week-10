import socketio from 'socket.io-client'
import { API_URL } from '../../.env.json'

const socket = socketio(API_URL, {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFucntion) {
    socket.on('new-dev', subscribeFucntion);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();

    socket.on('message', text => {
        console.log(text)
    })
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};