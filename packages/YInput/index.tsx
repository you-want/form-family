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
import { Input } from "ant-design-vue";
import { withInstall } from "../_util/type";

// YInput
export const YInputProps = () => ({
  nodeItem: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
});

const YInput = defineComponent({
  name: "YInput",
  props: YInputProps(),
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
        <a-input
          {...nodeItem?.nodeProps}
          value={nodeItem?.key && formData[nodeItem?.key]}
          onChange={(e: any) => {
            emit("update", e.target.value);
          }}
        ></a-input>
      );
    };
  },
});

export default withInstall(YInput);
