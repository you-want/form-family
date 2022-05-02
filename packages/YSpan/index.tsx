import type {
  ComponentPublicInstance,
  CSSProperties,
  ExtractPropTypes,
  PropType,
} from "vue";
import {
  defineComponent,
  ref,
  reactive,
  watch,
  onMounted,
  getCurrentInstance,
  computed,
  onUnmounted,
  onUpdated,
} from "vue";
import { withInstall } from "../_util/type";

// YSpan
export const YSpanProps = () => ({
  nodeItem: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
  detailData: {
    type: Object,
    default: () => {},
  },
});

const YSpan = defineComponent({
  name: "YSpan",
  props: YSpanProps(),
  emits: ["update"],
  setup(props, { slots, emit, expose }) {
    const { nodeItem, formData, detailData } = props;
    // 生命周期
    onBeforeMount(() => {});
    onUnmounted(() => {});
    // 事件函数

    // 渲染函数
    return () => {
      return (
        <span>{detailData[nodeItem.key] || formData[nodeItem.key] || "-"}</span>
      );
    };
  },
});

export default withInstall(YSpan);
