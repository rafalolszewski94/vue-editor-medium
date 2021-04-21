let IS_PROD = process.env.NODE_END === 'production';
module.exports = {
  title: 'Vue Editor Medium',
  description: 'Vue 2 integration with Medium Editor',

  base: IS_PROD ? '/vue-editor-medium/' : '',

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    lastUpdated: true,
    searchPlaceholder: 'Search...',

    repo: 'rafalolszewski94/vue-editor-medium',
    docsRepo: 'rafalolszewski94/vue-editor-medium',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],

    sidebar: [
      '/guide/'
    ]
  }
}
