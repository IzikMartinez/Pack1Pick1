import {PackBuilder} from "~/composables/useBuildPack";

export function usePickCards(round: PackBuilder[], pack_id: number) {
     console.log("Picker was called")
     round.filter(pack => pack.pack.index == pack_id)
        .forEach(pack => pack.removeRandomCard())
}