import {PostSnapshot} from "../types/PostSnapshot.ts";
import {BlockState} from "../types/data/BlockState.ts";

export class EditorSnapshotService {
    private static snapshots: PostSnapshot[] = [];
    private static current: number = 0;
    private static versions: number = 0;

    private static throttledBlocks: BlockState<unknown>[] | null;
    private static timeout: number | null;

    public static setSnapshot(blocks: BlockState<unknown>[]) {
        this.snapshots = [{blocks}];

    }

    public static retrocede() {
        this.pushThrottledSnapshot();
        if (this.current > 0) {
            this.current--;
        }


        return this.snapshots[this.current];
    }

    public static advance() {

        this.pushThrottledSnapshot();
        if (this.current < this.versions) {
            this.current++;
        }

        return this.snapshots[this.current];
    }

    private static pushThrottledSnapshot() {
        const {current, versions} = this;
        if (this.throttledBlocks) {

            const snapshot_length = this.snapshots.length;

            if (snapshot_length > 0) {
                const lastSnapshot = this.snapshots[snapshot_length - 1];
                if (lastSnapshot.blocks == this.throttledBlocks) return;
            }

            if (current != versions) {
                let newSnapshots = this.snapshots.slice(0, current + 1);
                newSnapshots.push({
                    blocks: this.throttledBlocks
                })

                this.snapshots = newSnapshots;
            }

            else this.snapshots.push({
                blocks: this.throttledBlocks
            })

            this.versions = this.current + 1;
            this.current = this.versions;
            this.timeout = null;
            this.throttledBlocks = null;
        }
    }

    public static captureSnapshot(blocks: BlockState<unknown>[]) {
        this.throttledBlocks = blocks;

        if (this.timeout != null) return;

        this.timeout = setTimeout(() => {
            if (this.timeout == null) return;
            this.pushThrottledSnapshot();
        }, 1000);
    }
}