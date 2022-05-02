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
// @ts-ignore
import { cloneDeep } from 'lodash';

// RenderNode
export const RenderNodeProps = () => ({
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
  formMap: {
    type: Object,
    default: () => {},
  },
});

const RenderNode = defineComponent({
  name: "RenderNode",
  props: RenderNodeProps(),
  emits: ['formDataChange'],
  setup(props, { slots, emit, expose }) {
    const { columnsItem, columnsIndex, formData, detailData, formMap } = props;
    const optionsIsExpression = ref(false); // options 是否是表达式
    const nodeItem: Record<string, any> = ref({})

    // 生命周期
    onBeforeMount(() => {
      const nodeProps = columnsItem.nodeProps || {};
      if (isExpression(nodeProps.optionStr)) { // 表达式
        optionsIsExpression.value = true;
        const str = getRunString(nodeProps.optionStr)?.[1] || "";
        nodeProps.options = evaluateString(str) || [];
        dealOptionsOne()
      } else if (nodeProps.options) { // 非表达式 有 options
        dealOptionsOne()
      }      
      // 设置默认值
      if (
        nodeProps.value !== undefined ||
        nodeProps.defaultValue !== undefined
      ) {
        emit("formDataChange", nodeProps.value || nodeProps.defaultValue)
        delete nodeProps.value;
        delete nodeProps.defaultValue;
      }
    });
    onUnmounted(() => {});

    watch(formData, (newValue, oldValue) => {
      const nodeProps = columnsItem.nodeProps || {};
      if (optionsIsExpression.value) {
        const oldOptionsString = JSON.stringify(nodeProps.options)
        const str = getRunString(nodeProps.optionStr)?.[1] || "";
        nodeProps.options = evaluateString(str) || [];
        const newOptionsString = JSON.stringify(nodeProps.options)
        if(newOptionsString!==oldOptionsString) {
          emit("formDataChange", undefined)
        }
        dealOptionsOne()
      }
    });

    // 事件函数
    const dealOptionsOne = () => {
      // 仅有一条数据，且是必填项目
      const nodeProps = columnsItem.nodeProps || {};
      if (
        nodeProps.options?.length === 1 &&
        isRequired(columnsItem.formItemProps?.rules)
      ) {
        const valueStr = nodeProps?.fieldNames?.value || "value";
        const labelStr = nodeProps?.fieldNames?.label || "label";
        const option = cloneDeep(nodeProps.options[0])
        if (columnsItem.key2) option.key = nodeProps.options[0][labelStr]
        emit("formDataChange", nodeProps.options[0][valueStr], option)
      }
    }
    // 获取可运行的表达式
    const getRunString = (func: string) => {
      const pattern = /^{{(.+)}}$/;
      return func.match(pattern);
    };
    // formData 整个 form 的值
    const evaluateString = (string: string) => {
      return Function(
        `"use strict";const formData = ${JSON.stringify(
          formData
        )};const formMap = ${JSON.stringify(formMap)};return (${string})`
      )();
    };
    // 判断是否是“函数”
    // JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数
    const isExpression = (func: any) => {
      if (typeof func !== "string") return false;
      // 这样的 pattern {{.....}}
      const pattern = /^{{(.+)}}$/;
      const reg1 = /^{{(function.+)}}$/;
      const reg2 = /^{{(.+=>.+)}}$/;
      if (
        typeof func === "string" &&
        func.match(pattern) &&
        !func.match(reg1) &&
        !func.match(reg2)
      ) {
        return true;
      }
      return false;
    };
    const isRequired = (rules: any[] | object | undefined) => {
      if (rules === undefined) return false;
      const rulesStr = JSON.stringify(rules);
      if (rulesStr.indexOf('"required":true') > -1) return true;
    };

    // 渲染函数
    return () => {
      if (!columnsItem.nodeProps) return null;
      const nodeProps = columnsItem.nodeProps || {};
      const tag = columnsItem.tag;
      // 常用属性设置 start
      // 设置 placeholder （没 自定义 用 默认）
      if (!nodeProps.placeholder) {
        const placeholderTypeOneList = ["Input", "Textarea", "InputNumber"];
        const placeholderTypeTwoList = ["Radio", "DatePicker", "Select"];
        if (placeholderTypeOneList.includes(tag)) {
          nodeProps.placeholder = "请输入";
        } else if (placeholderTypeTwoList.includes(tag)) {
          nodeProps.placeholder = "请选择";
        }
      }
      // 设置 allowClear （默认为 true）
      nodeProps.allowClear = nodeProps.allowClear === false ? false : true;
      // 常用属性设置 end
      const Com = components[`Y${tag}`];
      return (
        <Com
          nodeItem={columnsItem}
          formData={formData}
          detailData={detailData}
          onUpdate={(value: any, option: unknown) => {
            emit("formDataChange", value, option)
          }}
        />
      );
    };
  },
});

export default withInstall(RenderNode);
