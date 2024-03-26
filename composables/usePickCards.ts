import {Round} from "~/composables/types/draft_types";
import {PackBuilder} from "~/composables/useBuildPack";

export function usePickCards(round: PackBuilder[], pack_id: number) {
    const picks = round.filter(pack => pack.pack.index == pack_id)
        .forEach(pack => pack.removeRandomCard())
    )
}