<template>
    <div>
        <div class="transpose-keys">
            <a v-for="key in keys" :key="key.name" :class="{ selected: currentKey && currentKey.name === key.name }"
                @click.prevent="transposeSong(key.name)">
                {{ key.name }}
            </a>
        </div>
        <pre v-html="formattedSong"></pre>
    </div>
</template>

<script>
export default {
    props: {
        initialKey: {
            type: String,
            required: true
        },
        songText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            keys: [
                { name: 'Ab', value: 0, type: 'F' },
                { name: 'A', value: 1, type: 'N' },
                { name: 'A#', value: 2, type: 'S' },
                { name: 'Bb', value: 2, type: 'F' },
                { name: 'B', value: 3, type: 'N' },
                { name: 'C', value: 4, type: 'N' },
                { name: 'C#', value: 5, type: 'S' },
                { name: 'Db', value: 5, type: 'F' },
                { name: 'D', value: 6, type: 'N' },
                { name: 'D#', value: 7, type: 'S' },
                { name: 'Eb', value: 7, type: 'F' },
                { name: 'E', value: 8, type: 'N' },
                { name: 'F', value: 9, type: 'N' },
                { name: 'F#', value: 10, type: 'S' },
                { name: 'Gb', value: 10, type: 'F' },
                { name: 'G', value: 11, type: 'N' },
                { name: 'G#', value: 0, type: 'S' }
            ],
            currentKey: null,
            song: this.songText,
            chordRegex: /^[A-G][b#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7#5|7#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|M7|M9|M11|M13|mb5|m|sus|sus2|sus4)*(\/[A-G][b#]*)*$/,
            chordReplaceRegex: /([A-G][b#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7#5|7#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|M7|M9|M11|M13|mb5|m|sus|sus2|sus4)*)/g
        };
    },
    computed: {
        formattedSong() {
            return this.song.split('\n').map(line => {
                return this.isChordLine(line)
                    ? `<span>${this.wrapChords(line)}</span>`
                    : `<span>${line}</span>`;
            }).join('\n');
        }
    },
    methods: {
        getKeyByName(name) {
            if (name.charAt(name.length - 1) === 'm') {
                name = name.substring(0, name.length - 1);
            }
            return this.keys.find(key => key.name === name) || null;
        },
        getChordRoot(input) {
            return (input.length > 1 && (input.charAt(1) === 'b' || input.charAt(1) === '#'))
                ? input.substr(0, 2)
                : input.substr(0, 1);
        },
        getNewKey(oldKey, delta, targetKey) {
            const oldKeyObj = this.getKeyByName(oldKey);
            if (!oldKeyObj) return { name: oldKey }; // Return the old key if not found
            let keyValue = oldKeyObj.value + delta;
            if (keyValue > 11) keyValue -= 12;
            if (keyValue < 0) keyValue += 12;

            const type = keyValue === 0 || keyValue === 2 || keyValue === 5 || keyValue === 7 || keyValue === 10
                ? targetKey.type
                : 'N';

            return this.keys.find(key => key.value === keyValue && key.type === type) || { name: oldKey }; // Return old key if not found
        },
        getDelta(oldIndex, newIndex) {
            return newIndex - oldIndex;
        },
        transposeSong(targetKey) {
            const newKey = this.getKeyByName(targetKey);
            if (!newKey || (this.currentKey && this.currentKey.name === newKey.name)) return;

            const delta = this.getDelta(this.currentKey.value, newKey.value);
            this.song = this.song.split('\n').map(line => {
                if (this.isChordLine(line)) {
                    return this.wrapChords(line.split(' ').map(chord => {
                        const oldChordRoot = this.getChordRoot(chord);
                        const newChordRoot = this.getNewKey(oldChordRoot, delta, newKey);
                        return chord.replace(oldChordRoot, newChordRoot.name);
                    }).join(' '));
                }
                return line;
            }).join('\n');

            this.currentKey = newKey;
        },
        isChordLine(input) {
            return input.trim().split(' ').every(token => token.match(this.chordRegex));
        },
        wrapChords(input) {
            return input.replace(this.chordReplaceRegex, "<span class='c'>$1</span>");
        }
    },
    created() {
        this.currentKey = this.getKeyByName(this.initialKey);
        if (!this.currentKey) {
            console.error(`Invalid initial key: ${this.initialKey}`);
        }
    }
};
</script>

<style>
.transpose-keys a {
    cursor: pointer;
    margin-right: 5px;
}

.transpose-keys a.selected {
    font-weight: bold;
}
</style>