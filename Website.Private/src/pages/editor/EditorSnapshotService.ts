import {SnapshotRecord} from "./types/SnapshotRecord.ts";
import {BlockState} from "./types/state/BlockState.ts";
import {requestTagState} from "./utils/requestTagState.ts";
import getSelectionStart from "../../utils/getSelectionStart.ts";
import {EditorCaretHandler} from "./EditorCaretHandler.ts";
import {SelectionFormat} from "./types/caret/SelectionFormat.ts";
import {TagCollapsedCaretRecord} from "./types/caret/record/TagCollapsedCaretRecord.ts";


export class EditorSnapshotService {
    private static snapshots: SnapshotRecord[] = [];
    private static current: number = 0;
    private static versions: number = 0;
    private static pendingSnapshot: SnapshotRecord | null;
    private static timeout: number | null;

    public static setInitialSnapshot(blocks: BlockState[]) {
        this.snapshots = [{
            blocks,
            offset: 0,
            focusedTagId: "",
            selectionMode: SelectionFormat.NodeCollapsed
        }];
    }
    private static setCaret(snapshot: SnapshotRecord) {
        if(snapshot.focusedTagId && snapshot.offset) {
            EditorCaretHandler.setNextCaretPosition( new TagCollapsedCaretRecord(
                snapshot.focusedTagId, snapshot.offset
            ));
        }
    }
    public static retrocede() {
        this.pushThrottledSnapshot();

        if (this.current > 0) {
            this.current--;
        }

        const snapshot = this.snapshots[this.current];
        this.setCaret(snapshot);
        return snapshot;
    }

    public static advance() {
        this.pushThrottledSnapshot();
        if (this.current < this.versions) {
            this.current++;
        }

        const snapshot = this.snapshots[this.current];
        this.setCaret(snapshot);
        return snapshot;
    }

    private static pushThrottledSnapshot() {
        if(this.pendingSnapshot == null) return;
        const pendingSnapshot = this.pendingSnapshot;
        this.pendingSnapshot = null;



        const {current, versions} = this;
        if (pendingSnapshot.blocks) {

            const snapshot_length = this.snapshots.length;

            if (snapshot_length > 0) {
                const lastSnapshot = this.snapshots[snapshot_length - 1];
                if (lastSnapshot.blocks == pendingSnapshot.blocks) return;
            }

            if (current != versions) {
                let newSnapshots = this.snapshots.slice(0, current + 1);
                newSnapshots.push(pendingSnapshot)
                this.snapshots = newSnapshots;
            }

            else this.snapshots.push(pendingSnapshot);

            this.versions = this.current + 1;
            this.current = this.versions;
            this.timeout = null;
        }
    }

    public static async captureSnapshot(blocks: BlockState[]) {
        let focusedTagId: string | undefined;
        let offset: number | undefined;
        let mode: SelectionFormat = SelectionFormat.TagCollapsed;
        const startPoint = getSelectionStart();

        if(!startPoint) return;
        const {startNode, startOffset} = startPoint;

        const editable = startNode.parentElement;

        if(editable instanceof Element) {
            const tagElement = editable.parentElement as Element;
            const tagState = await requestTagState(tagElement);
            focusedTagId = tagState.id;
            offset = startOffset;
            mode = SelectionFormat.TagCollapsed;
        }

        this.pendingSnapshot = { blocks, focusedTagId, offset, selectionMode: mode}

        if (this.timeout != null) return;

        this.timeout = setTimeout(() => {
            if (this.timeout == null) return;
            this.pushThrottledSnapshot();
        }, 1000);
    }
}