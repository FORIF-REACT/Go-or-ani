import { BettingInfoDto } from "./BettingInfoDto";
import { BettingInfoDtoFromDB } from "./BettingInfoDtoFromDB";

export function convertBettingInfoDto(dbData: BettingInfoDtoFromDB, username: string, img_src: string): BettingInfoDto {
    return {
        id: dbData.id,
        title: dbData.title,
        username: username,
        time: Number.parseInt(dbData.created_date),
        participants: dbData.players.length,
        img_src: img_src,
        selections: dbData.options,
        deadline: dbData.deadline,
    };
}
