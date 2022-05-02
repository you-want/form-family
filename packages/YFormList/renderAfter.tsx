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
import * as components from "../components";
import { withInstall } from "../_util/type";
import Styles from "./index.module.less";

// RenderAfter
export const RenderAfterProps = () => ({
  columnsItem: {
    type: Object,
    default: () => {},
  },
  columnsIndex: {
    type: Number,
    default: -1,
  },
  formData: {
    type: Object,
    default: () => {},
  },
  detailData: {
    type: Object,
    default: () => {},
  },
  afterProps: {
    type: Object,
    default: () => {},
  },
});

const RenderAfter = defineComponent({
  name: "RenderAfter",
  props: RenderAfterProps(),
  emits: ['formDataChange'],
  setup(props, { slots, emit, expose }) {
    const { columnsItem, columnsIndex, formData, detailData, afterProps } = props;
    // 生命周期
    onMounted(() => {});
    onUnmounted(() => {});

    // 事件函数
    return () => {
      // 特殊后部分UI处理
      const tag = afterProps.tag;
      if (tag === "Button") {
        return (
          <a-button class="myBtn" type="primary" onClick={afterProps.click}>
            {afterProps.label}
          </a-button>
        );
      } else if (tag === "Span") {
        return <span class="ant-form-text">{afterProps.label}</span>;
      } else if (tag === "Tooltip") {
        return (
          <a-tooltip
            title={afterProps.title}
            placement={afterProps.placement || "top"}
          >
            <a-icon
              class="myIcon"
              type={afterProps.type || "question-circle"}
            />
          </a-tooltip>
        );
      }
    };
  },
});

export default withInstall(RenderAfter);
