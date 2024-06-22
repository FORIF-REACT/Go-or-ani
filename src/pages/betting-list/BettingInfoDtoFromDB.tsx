export type BettingInfoDtoFromDB = {
    id: number;
    title: string;
    host_id: number;
    created_date: string;
    players: {id:string, points:number, bet_index:number}[];
	options: string[];
    deadline: number;
}