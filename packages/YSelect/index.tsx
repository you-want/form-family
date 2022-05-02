import { Item } from "ant-design-vue/lib/menu";
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
  onBeforeMount,
  onUpdated,
} from "vue";
import { withInstall } from "../_util/type";

// YSelect
export const YSelectProps = () => ({
  nodeItem: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
});

const YSelect = defineComponent({
  name: "YSelect",
  props: YSelectProps(),
  emits: ["update"],
  setup(props, { slots, emit, expose }) {
    const { nodeItem, formData } = props
    // 生命周期
    onBeforeMount(() => {});
    onUnmounted(() => {});
    // 事件函数

    // 渲染函数
    return () => {
      const nodeProps = nodeItem.nodeProps;

      const valueStr = nodeProps?.fieldNames?.value || "value";
      const labelStr = nodeProps?.fieldNames?.label || "label";
      
      return (
        <a-select
          {...nodeProps}
          options={undefined}
          fieldNames={undefined}
          value={formData[nodeItem.key]}
          onChange={(value: any, option: unknown) => {
            emit("update", value, option);
          }}
        >
          {nodeProps?.options?.map((item: any) => {
            return (
              <a-select-option value={item[valueStr]} key={item[labelStr]} item={item}>
                {item[labelStr]}
              </a-select-option>
            );
          })}
        </a-select>
      );
    };
  },
});

export default withInstall(YSelect);
