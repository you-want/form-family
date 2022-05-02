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
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { withInstall } from "../_util/type";

// YRadio
export const YRadioProps = () => ({
  nodeItem: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
});

const YRadio = defineComponent({
  name: "YRadio",
  props: YRadioProps(),
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
        <a-radio-group
          {...nodeItem.nodeProps}
          value={formData[nodeItem.key]}
          onChange={(e: any) => {
            emit("update", e.target.value);
          }}
        ></a-radio-group>
      );
    };
  },
});

export default withInstall(YRadio);
