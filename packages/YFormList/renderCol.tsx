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
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
// @ts-ignore
import { isArray, cloneDeep } from "lodash";
import RenderNode from "./renderNode";
import RenderAfter from "./renderAfter";
import { withInstall } from "../_util/type";
import Styles from "./index.module.less";

// RenderCol
export const RenderColProps = () => ({
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

const RenderCol = defineComponent({
  name: "RenderCol",
  props: RenderColProps(),
  emits: ["formDataChange"],
  setup(props, { slots, emit, expose }) {
    const { columnsItem, columnsIndex, formData, detailData, formMap } = props;
    const hiddenIsExpression = ref(false); // hidden 是否是表达式
    const hiddenItem = ref(false); // hidden
    // 生命周期
    onMounted(() => {
      if (isExpression(columnsItem.hidden)) {
        hiddenIsExpression.value = true;
        const str = getRunString(columnsItem.hidden)?.[1] || "";
        hiddenItem.value = evaluateString(str) || false;
      } else {
        hiddenItem.value = columnsItem.hidden || false;
      }
    });
    onUnmounted(() => {});
    watch(formData, (newValue, oldValue) => {
      if (hiddenIsExpression.value) {
        const str = getRunString(columnsItem.hidden)?.[1] || "";
        hiddenItem.value = evaluateString(str) || false;
      }
    });

    // 事件函数
    // 获取可运行的表达式
    const getRunString = (func: string) => {
      const pattern = /^{{(.+)}}$/;
      return func.match(pattern);
    };
    // 解析函数字符串值
    // formData 整个 form 的值
    const evaluateString = (string: string): boolean => {
      return Function(
        `"use strict";const formData = ${JSON.stringify(
          formData
        )};return (${string})`
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

    // 渲染函数
    return () => {
      const formItemProps = columnsItem.formItemProps;
      return hiddenItem.value ? null : (
        <a-col span={columnsItem.colSpan || 24}>
          {isArray(formItemProps) ? (
            formItemProps?.map((arrItem: any, arrIndex: number) => {
              return (
                <a-form-item key={arrIndex + columnsItem.key} {...arrItem}>
                  <div class={Styles.nodeBox}>
                    <RenderNode
                      columnsItem={columnsItem}
                      columnsIndex={columnsIndex}
                      formData={formData}
                      detailData={detailData}
                      formMap={formMap}
                      onFormDataChange={(value, option) =>
                        emit("formDataChange", {
                          value,
                          option,
                          item: columnsItem,
                          name: arrItem.name
                        })
                      }
                    ></RenderNode>
                    <PlusCircleOutlined
                      class={Styles.nodeAfterBtn}
                      onClick={() => {
                        const obj = cloneDeep(arrItem);
                        obj.label = " ";
                        obj.colon = false;
                        obj.name = `${columnsItem.key}.${arrIndex + 1}`;
                        formItemProps.push(obj);
                      }}
                    />
                    {arrIndex === 0 ? null : (
                      <MinusCircleOutlined
                        class={Styles.nodeAfterBtn}
                        onClick={() => {
                          formItemProps.splice(arrIndex, 1);
                        }}
                      />
                    )}
                  </div>
                </a-form-item>
              );
            })
          ) : (
            <a-form-item
              key={columnsIndex + columnsItem.key}
              {...formItemProps}
            >
              <div class={Styles.nodeBox}>
                <RenderNode
                  columnsItem={columnsItem}
                  columnsIndex={columnsIndex}
                  formData={formData}
                  detailData={detailData}
                  formMap={formMap}
                  onFormDataChange={(value, option) =>
                    emit("formDataChange", { value, option, item: columnsItem })
                  }
                ></RenderNode>
                {columnsItem.afterProps ? (
                  <RenderAfter
                    afterProps={columnsItem.afterProps}
                  ></RenderAfter>
                ) : null}
              </div>
            </a-form-item>
          )}
        </a-col>
      );
    };
  },
});

export default withInstall(RenderCol);
