export type BettingInfoDto = {
    id: number;
    title: string;
    username: string;
    time: number;
    participants: number;
    img_src: string;
	selections: string[];
    deadline: number;
}