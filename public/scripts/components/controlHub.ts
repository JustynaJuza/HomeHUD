// interface SignalR {
//     controlHub: ControlHub;
// }
// interface ControlHub {
//     client: ControlHubClient;
//     server: ControlHubServer;
// }
// interface ControlHubClient {
//     //addNewMessageToPage : (name : number, message : string) => void;
// }
// interface ControlHubServer {
//     //send(name: string, message: string): JQueryPromise<void>;
// }

interface IControlHub {
  connected:boolean;
  init: () => void;
}

export class ControlHub implements IControlHub {

    private connection: SignalR.Hub.Connection;
    private proxy: SignalR.Hub.Proxy;

    connected = false;

    public init() : void {
        this.connection = jQuery.hubConnection();
        this.connection.logging = true;
        this.proxy = this.connection.createHubProxy('controlHub');

        this.setClientEventHandlers();
        this.startConnection();
    }

    private setClientEventHandlers() : void {
      this.proxy.on('switchLightOn', (id: string | number) => {
        console.log(id + 'switched on on client')
      })
      this.proxy.on('switchLightOff', (id: string | number) => {
        console.log(id + 'switched off on client')
      })
      this.proxy.on('switchAllLightsOn', () => {
        console.log('all lights switched on on client')
      })
      this.proxy.on('switchAllLightsOff', () => {
        console.log('all lights switched off on client')
      })
    }

    private startConnection(): void {
      this.connection.start()
        .done(() => {
            this.proxy.invoke('switchLightOn', '234').done(() => { console.log('sent'); });
        })
    }
}
