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
  h,
  resolveComponent,
  watch,
  onMounted,
  getCurrentInstance,
  computed,
  onUnmounted,
  onUpdated,
} from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import * as components from "../components";
import { withInstall } from "../_util/type";
import Styles from "./index.module.less";

// YSearchForm
export const YSearchFormProps = () => ({
  columns: {
    type: Object,
    default: () => {},
  },
  formProps: {
    type: Object,
    default: () => {
      return {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      };
    },
  },
});

const YSearchForm = defineComponent({
  name: "YSearchForm",
  props: YSearchFormProps(),
  emits: ["queryClick"],
  setup(props, { slots, emit, expose }) {
    const { columns, formProps } = props;
    const advanced = ref(true);
    const advancedFalseNum = ref(3); // 收起展示的个数
    const offsetFlag = ref(0);
    const formRef = ref<FormInstance>();
    const formState = reactive({});
    // 生命周期
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      const clientW = document.documentElement.clientWidth;
      handleClientW(clientW);
    });
    onUnmounted(() => window.removeEventListener("resize", handleResize));
    // 事件函数
    const onFinish = (values: any) => {
      console.log("Received values of form: ", values);
      console.log("formState: ", formState);
      emit('queryClick', values)
    };
    const resetFields = () => {
      formRef.value?.resetFields();
    };
    const getColumnsLength = () => {
      return Object.keys(columns).length;
    };
    const handleClientW = (width: number) => {
      const len = getColumnsLength();
      if (width >= 2000) {
        advancedFalseNum.value = 5;
        offsetFlag.value = 6 - (len % 6) - 1;
      } else if (width >= 1600) {
        advancedFalseNum.value = 3;
        offsetFlag.value = 4 - (len % 4) - 1;
      } else if (width >= 992) {
        advancedFalseNum.value = 2;
        offsetFlag.value = 3 - (len % 3) - 1;
      } else if (width >= 576) {
        advancedFalseNum.value = 1;
        offsetFlag.value = 2 - (len % 2) - 1;
      } else {
        advancedFalseNum.value = len + 1;
        offsetFlag.value = 0;
      }
    };
    const handleResize = (e: any) => {
      const e_width = e.target.innerWidth;
      handleClientW(e_width);
    };
    // 渲染函数
    // 特殊后部分UI处理
    const renderAfter = (afterProps: any) => {
      const tag = afterProps.tag;
      if (tag === "Button") {
        return (
          <a-button
            class={Styles.nodeBtn}
            type="primary"
            onClick={afterProps.click}
          >
            {afterProps.label}
          </a-button>
        );
      } else if (tag === "Span") {
        return <span class="ant-form-text">{afterProps.label}</span>;
      }
    };
    const renderNode = (item: any) => {
      // const item = this.item;
      if (!item.nodeProps) return null;
      const nodeProps = item.nodeProps || {};
      const tag = item.tag;
      // 常用属性设置 start
      // 设置 placeholder （没 自定义 用 默认）
      if (!nodeProps.placeholder) {
        const placeholderTypeOneList = ["Input", "Textarea", "InputNumber"];
        const placeholderTypeTwoList = ["RadioGroup", "DatePicker", "Select"];
        if (placeholderTypeOneList.includes(tag)) {
          nodeProps.placeholder = "请输入";
        } else if (placeholderTypeTwoList.includes(tag)) {
          nodeProps.placeholder = "请选择";
        }
      }
      // 设置 allowClear （默认为 true）
      nodeProps.allowClear = nodeProps.allowClear === false ? false : true;
      // 默认空事件，防止没有参数报错
      const defaultFun = () => {};
      // 常用属性设置 end
      const Com = components[`Y${tag}`];
      return (
        <Com
          nodeItem={item}
          formData={formState}
          onUpdate={(value: any) => {
            formState[item.key] = value;
          }}
        />
      );
    };
    const renderCol = (item: any, index: number) => {
      const formItemProps = item.formItemProps;
      const renderData = (
        <a-col xxxl={4} xxl={6} lg={8} sm={12} xs={24}>
          <a-form-item key={index + item.key} {...formItemProps}>
            <div class={Styles.nodeBox}>
              {renderNode(item)}
              {item.afterProps && renderAfter(item.afterProps)}
            </div>
          </a-form-item>
        </a-col>
      );
      return !advanced.value && index >= advancedFalseNum.value
        ? null
        : renderData;
    };
    return () => {
      const len = getColumnsLength();
      const offset = advanced.value ? offsetFlag.value : 0;
      const wrapperColSpan =
        (formProps?.wrapperCol?.span || 0) + (formProps?.labelCol?.span || 0) ||
        24;
      return (
        <div>
          <a-form
            ref={formRef}
            name="advanced_search"
            class={Styles.searchForm}
            model={formState}
            {...formProps}
            onFinish={onFinish}
          >
            <a-row gutter={24}>
              {Object.keys(columns).map((key, index) => {
                const item = columns[key];
                item.key = key;
                item.formItemProps.name = key;
                return renderCol(item, index);
              })}
              <a-col
                xxxl={{ span: 4, offset: 4 * offset }}
                xxl={{ span: 6, offset: 6 * offset }}
                lg={{ span: 8, offset: 8 * offset }}
                sm={{ span: 12, offset: 12 * offset }}
                xs={{ span: 24, offset: 0 }}
                class={Styles.btnBox}
              >
                <a-form-item
                  wrapper-col={{
                    span: wrapperColSpan,
                    offset: 0,
                  }}
                >
                  <a-button type="primary" html-type="submit">
                    查询
                  </a-button>
                  <a-button style="margin: 0 8px" onClick={resetFields}>
                    重置
                  </a-button>
                  {len > advancedFalseNum.value ? (
                    <a
                      style="font-size: 12px"
                      onClick={() => (advanced.value = !advanced.value)}
                    >
                      {advanced.value ? (
                        <>
                          <UpOutlined /> 收起
                        </>
                      ) : (
                        <>
                          <DownOutlined /> 展开
                        </>
                      )}
                    </a>
                  ) : null}
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      );
    };
  },
});

export default withInstall(YSearchForm);
