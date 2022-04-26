<script>
export default {
  props: {
    /** 组件名称 */
    compName: {
      type: String,
      default: '',
      require: true,
    },
    /** 要显示代码的组件 */
    demoName: {
      type: String,
      default: '',
      require: true,
    },
  },
  data() {
    return {
      sourceCode: '',
    };
  },
  mounted() {
    this.sourceCode = (
      await import(/* @vite-ignore */ `../../packages/${this.compName}/docs/${this.demoName}.vue?raw`)
    ).default;
  }
}
</script>
