interface IRoomTab {
	index: number;
	hash: string;
	name: string;
}

interface IHomeHUD {
	rooms: Array<IRoomTab>;
}

class HomeHUD implements IHomeHUD {
	rooms: Array<IRoomTab>;

	constructor() {
		this.rooms = [
			{ index: 0, name: 'Control panel', hash: 'control' },
			{ index: 1, name: 'Gaming room', hash: 'gaming' },
			{ index: 2, name: 'Bedroom', hash: 'bed' },
			{ index: 3, name: 'Living room', hash: 'living' }
		]
	}
}

export { HomeHUD, IHomeHUD, IRoomTab };