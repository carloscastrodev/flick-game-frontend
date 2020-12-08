export default class SocketIOService {
  private ioConnectLink: string | undefined = process.env.REACT_APP_BACKEND_URL;
  private io: SocketIOClientStatic;
  private ioSocket: SocketIOClient.Socket;

  constructor(io: SocketIOClientStatic) {
    this.io = io;
    this.ioSocket = this.io(this.ioConnectLink as string);
    window.addEventListener("beforeunload", (e) => {
      this.disconnect();
    });
  }

  private disconnect(): void {
    this.ioSocket.disconnect();
  }

  public publish(event: string, ...args: any): void {
    this.ioSocket.emit(event, args);
  }

  public subscribe(event: string, callback: Function): Function {
    this.ioSocket.on(event, callback);

    const unsubscribe = () => {
      this.ioSocket.off(event, callback);
    };

    return unsubscribe;
  }

  public getSocketId(): string {
    return this.ioSocket.id;
  }
}
