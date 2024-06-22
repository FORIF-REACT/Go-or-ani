export type BettingInfoDtoFromDB = {
    id: number;
    title: string;
    host_id: number;
    created_date: string;
    players: {[key : string]:number}[];
	options: string[];
    deadline: number;
}