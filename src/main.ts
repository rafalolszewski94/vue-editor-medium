import Vue, { PropType, VNode } from "vue";

Vue.config.productionTip = false;

import Editor, { CoreOptions, MediumEditor } from "medium-editor";
import "./assets/medium-editor.css";

const VueEditorMedium = Vue.extend({
  props: {
    value: String,
    options: {
      type: Object as PropType<CoreOptions>,
    },
    tag: String,
  },
  data() {
    return {
      editor: (undefined as unknown) as MediumEditor,
    };
  },
  watch: {
    value(newValue) {
      if (newValue === this.editor.getContent(0)) return;
      this.editor.setContent(newValue, 0);
    },
    options: {
      handler() {
        this.onDestroy();
        const editor = this.$refs.editor as HTMLElement;
        this.initializeEditor(editor);
      },
      deep: true,
    },
  },
  mounted() {
    const editor = this.$refs.editor as HTMLElement;
    this.initializeEditor(editor);
  },
  beforeDestroy() {
    this.onDestroy();
  },
  methods: {
    initializeEditor(editor: HTMLElement) {
      this.editor = new Editor(editor);
      this.editor.setContent(this.value, 0);
      this.editor.subscribe("editableInput", this.onUpdate);
    },
    onDestroy() {
      this.editor.unsubscribe("editableInput", this.onUpdate);
      this.editor.destroy();
    },
    onBlur(event: FocusEvent): void {
      this.$emit("blur", event);
    },
    onFocus(event: FocusEvent): void {
      this.$emit("focus", event);
    },
    onUpdate(): void {
      const content = this.editor.getContent(0);
      this.$emit("input", content);
    },
    focus(start?: boolean) {
      const el = this.$refs.editor as HTMLDivElement;
      if (start) {
        el.focus();
        return;
      }
      const range = document.createRange();
      const sel = window.getSelection();
      if (!sel) return;
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
      range.detach(); // optimization

      // set scroll to the end if multiline
      el.scrollTop = el.scrollHeight;
    },
  },
  render(createElement): VNode {
    return createElement("div", {
      ref: "editor",
      on: {
        blur: this.onBlur,
        focus: this.onFocus,
      },
    });
  },
});

export { VueEditorMedium };
export default VueEditorMedium;
