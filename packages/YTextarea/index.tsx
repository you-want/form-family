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

// YTextarea
export const YTextareaProps = () => ({
  nodeItem: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
});

const YTextarea = defineComponent({
  name: "YTextarea",
  props: YTextareaProps(),
  emits: ["update"],
  setup(props, { slots, emit, expose }) {
    const { nodeItem, formData } = props;
    // 生命周期
    onMounted(() => {});
    onUnmounted(() => {});
    // 事件函数

    // 渲染函数
    return () => {
      return (
        <a-textarea
          autoSize={{ minRows: 2, maxRows: 5 }}
          {...nodeItem.nodeProps}
          value={formData[nodeItem.key]}
          onChange={(e: any) => {
            emit("update", e.target.value);
          }}
        ></a-textarea>
      );
    };
  },
});

export default withInstall(YTextarea);
