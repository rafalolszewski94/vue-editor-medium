# Getting started

## Install
<code-group>
<code-block title="YARN">
```bash
yarn add vue-editor-medium
```
</code-block>

<code-block title="NPM">
```bash
npm install vue-editor-medium
```
</code-block>
</code-group>

## Usage
```vue
<template>
  <vue-editor-medium v-model="content"/>
</template>

<script>
import { VueEditorMedium } from 'vue-editor-medium'

export default {
  components: {
    VueEditorMedium,
  },
  data() {
    return {
      content: 'This is my text'
    }
  }
}
</script>
```




# Options

This library inherits all [MediumEditor options](https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md).

## Setting options
```vue
<template>
  <vue-editor-medium v-model="content" :options="options"/>
</template>

<script>
import { VueEditorMedium } from 'vue-editor-medium'

export default {
  components: {
    VueEditorMedium,
  },
  data() {
    return {
      content: 'This is my text',
      options: {
        static: true
      }
    }
  }
}
</script>
```
 
