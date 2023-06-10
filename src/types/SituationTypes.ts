export interface Root {
	_id: string;
	situation: SituationType;
	flow: Flow[];
	row: Row;
}

export interface SituationType {
	map(
		arg0: (item: any) => import('react/jsx-runtime').JSX.Element
	): import('react').ReactNode;
	title: string;
	description: string;
	image_path: string;
}

export interface Flow {
	id: string;
	label: string;
	type: string;
	targets: string[];
	media: MediaType[];
}

export interface MediaType {
	name: string;
	type: string;
}

export interface Row {}
