// TODO: remove this whole package once https://github.com/websockets/ws/pull/2299 landed.
// we get wrapper.mjs which has nested defaults
import * as wrapperWebSocket from 'ws';

const createWebSocketStream = wrapperWebSocket.createWebSocketStream.default;
const Receiver = wrapperWebSocket.Receiver.default;
const Sender = wrapperWebSocket.Sender.default;
const WebSocket = wrapperWebSocket.WebSocket.default;
const WebSocketServer = wrapperWebSocket.WebSocketServer.default;

export { createWebSocketStream, Receiver, Sender, WebSocket, WebSocketServer };
export default WebSocket;
export type * from 'ws';;
