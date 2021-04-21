---
home: true
heroText: Vue Editor Medium
tagline: Integration with Medium Editor
actionText: Get Started →
actionLink: /guide/
---

<h4>Use editor</h4>

<component 
    v-if="dynamicComponent"
    :is="dynamicComponent"
    v-on:blur="onBlur"
    v-on:focus="onFocus"
    v-model="text"
    ref="mediumEditor"
/>

<button class="btn" v-on:click="setContent">Set content</button>
<button class="btn" v-on:click="clearContent">Clear</button>
<button class="btn" v-on:click="focusEditor">Focus</button>

<br>
<h4>Component events</h4>
<div class="events">
    <span v-if="!events.length">No events yet.</span>
    <span v-for="event in reversedEvents">{{ event }}</span>
</div>

<script>

export default {
    data() {
        return {
            dynamicComponent: null,
            text: 'This is <b>my text</b>',
            events: [],
        }
    },
    mounted () {
        import('../lib/vue-editor-medium').then(module => {
          this.dynamicComponent = module.default
        })
    },
    computed: {
        reversedEvents() { 
            return [...this.events].reverse()
        }
    },
    methods: {
        currentDate() {
            const date = new Date();
            return date.toLocaleTimeString('pl-PL');
        },
        onBlur() {
            this.events.push(`[ ${this.currentDate()} ] => blur`);
        },
        onFocus() {
            this.events.push(`[ ${this.currentDate()} ] => focus`);
        },

        setContent() {
            this.text = 'This content <b>has been set</b> from the <i>method</i>';
        },
        clearContent() {
            this.text = '';
        },
        focusEditor() {
            this.$refs.mediumEditor.focus();
        },
    }
}
</script>

<style lang="stylus">
.btn {
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: $accentColor;
    padding: 0.7rem 1.2rem;
    border-radius: 7px;
    transition: background-color .1s ease;
    box-sizing: border-box;
    border: none;
    outline: none;
    cursor: pointer;
    border-bottom: 1px solid darken($accentColor, 10%);
    appearance: none;

    &:hover {
        background-color: lighten($accentColor, 10%);
    }

    + .btn {
        margin-left: 10px;
    }
}

.medium-editor-element {
    background-color: #f6f6f6;
    border-radius: 8px;
    padding: 5px 15px 3px;
    outline: none;
}
.medium-editor-element:focus {
    background-color: #f1f1f1;
}


.medium-editor-element > p {
    margin: 0;
}

.events {
    background-color: $codeBgColor;
    color: #abbbd0;
    border-radius: 8px;
    padding: 10px 15px;
    max-height: 200px;
    overflow-y: auto;

    span {
        display: block;
        margin: 4px 0;
    }
}
</style>
