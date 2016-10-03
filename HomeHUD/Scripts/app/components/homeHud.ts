declare const configUrl: string;

import * as _ from 'lodash';

import { Api } from '../state/api';


export interface ILightSwitch {
    id: string | number;
    name: string;
}

export interface IRoomConfig {
    id: number;
    name: string;
    lights: number[];
}


//export class AppConfig {
//    //private configUrl: 'Home/GetConfigSettings';
//    //private api: Api;

//    public config: IRoomConfig[];

//    private rooms: Array<IControlPanelTab>;
//    //constructor(IRoomConfig config) {


//       // this.getConfigSettings();

//        this.rooms = [
//            { index: 0, name: 'Aaaaaaaaaaaaaaa', hash: 'control', lights: [] },
//            { index: 1, name: 'Bbbbbbb', hash: 'gaming',
//                lights: <Array<ILightSwitch>>[
//                {
//                    id: 1,
//                    name: 'Biurko Bartka'
//                },{
//                    id: 2,
//                    name: 'Biurko Justyny'
//                }]
//            },
//            { index: 2, name: 'Cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc', hash: 'bed',
//                lights: <Array<ILightSwitch>>[
//                {
//                    id: 3,
//                    name: 'Lampki pod lozkiem'
//                }]
//            },
//            { index: 3, name: 'Dddd dddddd dddd ddd', hash: 'living',
//                lights: <Array<ILightSwitch>>[
//                {
//                    id: 4,
//                    name: 'Lampa stojaca'
//                }]
//            }
//        ]
//    }

//    //private getConfigSettings() {
//    //    this.api = new Api();
//    //    this.config = this.api.getJson(this.configUrl);
//    //}

//    public getRooms(){
//        return this.rooms;
//    }

//    public getRoomLights(roomIndex: number){
//        const room = _.find(this.rooms, (entry: IControlPanelTab) => entry.index === roomIndex);
//        console.log(room.lights)
//        return room.lights;
//    }
//}

//export const homeHudConfig = new HomeHud();
