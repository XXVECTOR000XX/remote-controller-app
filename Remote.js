const { app, screen } = require('electron');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const { spawn, exec } = require('child_process');
const { insertText } = require('@xitanggg/node-insert-text');
const robot = require('robotjs');
const os = require('os');

var screenshot = require('screenshot-desktop');

require('dotenv').config({
  path: app.isPackaged
    ? path.join(process.resourcesPath, '.env')
    : path.join(__dirname, '.env'),
});

const INTERVAL_MILLISECONS_SCREENSHOT = 5000; // cada segundo envia foto a worker
const INTERVAL_RECONECTION = 5000; // cada 5 segundos reconecta
let ws;
let reconectarTimer = null;
let id_socket = null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Esto es para evitar errores que generen ventanas
process.on('uncaughtException', (error) => {
    console.error('Error: ', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Error Promesa: ', reason);
});

app.whenReady().then(() => {
    conectarWebsocket();
})

async function enviarScreenshot() {
    try {
        enviarMensaje({
            type: 'image',
            image_64: (await screenshot({format: 'jpeg'})).toString('base64')
        });
    } catch (error) {}
}

function enviarMensaje(data) {
    console.log('enviar foto');
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    ws.send(JSON.stringify({
        ...data,
        name_user: process.env.NAME_USER
    }));
}

function conectarWebsocket() {
    console.log('intento conexion');

    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        return;
    }

    try {
        ws = new WebSocket('wss://control-remoto.peresprueba29.workers.dev/');
    } catch (error) {
        console.log(error);
        reconectarWebsocket();
        return;
    }

    ws.addEventListener('open', async () => {
        añadirListeners(ws);

        consultarIdSocket();

        while(true) {
            await enviarScreenshot();
            await sleep(INTERVAL_MILLISECONS_SCREENSHOT);
        }
    });

    ws.addEventListener('close', () => {
        reconectarWebsocket();
    });

    ws.addEventListener('error', (error) => {
        console.log(error);
    });
}

function reconectarWebsocket() {
    if (reconectarTimer) return;

    reconectarTimer = setTimeout(() => {
        reconectarTimer = null;
        conectarWebsocket();
    }, INTERVAL_RECONECTION);
}

function añadirListeners(ws) {
    ws.addEventListener('message', (msg) => {
        let data = JSON.parse( msg.data );

        if (data.type == 'image') return; // temp

        switch(data.type) {
            case 'id':
                id_socket = data.id;
                break;
            case 'input':
                manejarInput(data);
                break;
        }

        console.log(data); // aun ningun manejo de inputs
    })
}

function manejarInput(data) {
    try {
        switch(data.input_type) {
            case 'keyboard':
                console.log(data.targetId, ' ', id_socket);
                if (data.targetId != id_socket) return;
                
                insertText(data.input);
                
                break;
            case 'mouse_click':
                console.log(data.targetId, ' ', id_socket);
                if (data.targetId != id_socket) return;
                
                const desplieguePantalla = screen.getPrimaryDisplay();
                const { width: fullWidth, height: fullHeight } = desplieguePantalla.bounds;

                robot.moveMouse(data.input.x / 100 * fullWidth, data.input.y / 100 * fullHeight);
                robot.mouseClick('left');
                
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

function consultarIdSocket() {
    ws.send(JSON.stringify({
        type: 'seeId'
    }));
}