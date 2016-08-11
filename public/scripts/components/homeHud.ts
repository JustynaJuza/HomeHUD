export interface IControlPanelTab {
	index: number;
	hash: string;
	name: string;
	lights: Array<ILightSwitch>;
}

export interface ILightSwitch {
	id: string | number;
	name: string;
}

class HomeHUD {
	private rooms: Array<IControlPanelTab>;

	constructor() {
		this.rooms = [
			{ index: 0, name: 'Control panel', hash: 'control', lights: [] },
			{ index: 1, name: 'Gaming room', hash: 'gaming', 
				lights: <Array<ILightSwitch>>[
				{
					id: 'biurkoBartka',
					name: 'Biurko Bartka'
				},{
					id: 'biurkoJustyny',
					name: 'Biurko Justyny'
				}]
			},
			{ index: 2, name: 'Bedroom', hash: 'bed',
				lights: <Array<ILightSwitch>>[
				{
					id: 'lozko',
					name: 'Lampki pod lozkiem'
				}] 
			},
			{ index: 3, name: 'Living room', hash: 'living',
				lights: <Array<ILightSwitch>>[
				{
					id: 'salon',
					name: 'Lampa stojaca'
				}]
			}
		]
	}

	public getRooms(){
		return this.rooms;
	}
}

export const HomeHUDConfig = new HomeHUD();