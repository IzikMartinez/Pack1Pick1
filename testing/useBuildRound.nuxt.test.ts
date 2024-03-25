import { useBuildDraft } from "~/composables/useBuildDraft"
import { useBuildRound } from "~/composables/useBuildRound"
import { describe, it } from "vitest";

it('Test draftbox state', ()=>{
    useBuildDraft()
    console.log("OUTPUT: ", useBuildRound());
})