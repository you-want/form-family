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
import type { FormInstance } from "ant-design-vue";
// @ts-ignore
import { isArray } from "lodash";
import RenderCol from "./renderCol";
import { withInstall } from "../_util/type";
import Styles from "./index.module.less";
import type { InternalNamePath, NamePath, ValidateOptions } from "./interface";

export type FormListExpose = {
  getValues: (callback: any) => void;
  resetFields: (name?: NamePath) => void;
  clearValidate: (name?: NamePath) => void;
  validateFields: (
    nameList?: NamePath[] | string,
    options?: ValidateOptions
  ) => Promise<{
    [key: string]: any;
  }>;
  getFieldsValue: (nameList?: InternalNamePath[] | true) => {
    [key: string]: any;
  };
  validate: (
    nameList?: NamePath[] | string,
    options?: ValidateOptions
  ) => Promise<{
    [key: string]: any;
  }>;
  scrollToField: (name: NamePath, options?: {}) => void;
};

// YFormList
export const YFormListProps = () => ({
  columns: {
    type: Object,
    default: () => {},
  },
  formProps: {
    type: Object,
    default: () => {
      return {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      };
    },
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

const YFormList = defineComponent({
  name: "YFormList",
  props: YFormListProps(),
  emits: [],
  setup(props, { slots, emit, expose }) {
    const { columns, formProps, detailData, formMap } = props;
    const formRef = ref<FormInstance>();
    let formState = reactive({});
    // const sameMoreKeyMap = ref({})

    // 生命周期
    onMounted(() => {
      Object.keys(columns).map((key, index) => {
        formState[key] = detailData[key];
      });
    });
    onUnmounted(() => {
      resetFields();
    });
    // 事件函数
    const formDataChange = (obj: { [key: string]: any }) => {
      const { value, option, item, name } = obj;
      if (isArray(item.formItemProps)) {
        formState[name] = value;
        // sameMoreKeyMap[item.key] = true
      } else {
        formState[item.key] = value;
      }
      // label 和 value 两个值都需要，特殊配置了 key2
      if (item.key2) formState[item.key2] = option?.key;
      if (item.key3) formState[item.key3] = option?.item?.[item.key3];
    };
    const onFinish = (values: any) => {
      console.log("Received values of form: ", values);
      console.log("formState: ", formState);
    };
    const getValues = (callback: any) => {
      formRef.value
        ?.validate()
        .then((value) => {
          value = Object.assign(value, formState);
          callback(value);
        })
        .catch((error) => {
          console.error("error", error);
        });
    };
    const resetFields = (name?: NamePath) => {
      formRef.value?.resetFields(name);
    };
    const clearValidate = (name?: NamePath) => {
      formRef.value?.clearValidate(name);
    };
    const validateFields = (
      nameList?: NamePath[] | string,
      options?: ValidateOptions
    ) => {
      formRef.value?.validateFields(nameList, options);
    };
    const getFieldsValue = (nameList?: InternalNamePath[] | true) => {
      formRef.value?.getFieldsValue(nameList);
    };
    const validate = (
      nameList?: NamePath[] | string,
      options?: ValidateOptions
    ) => {
      formRef.value?.validate(nameList, options);
    };
    const scrollToField = (name: NamePath, options?: {}) => {
      formRef.value?.scrollToField(name, options);
    };
    expose({
      getValues,
      resetFields,
      clearValidate,
      validateFields,
      getFieldsValue,
      validate,
      scrollToField,
    } as FormListExpose);

    return () => {
      return (
        <div>
          <a-form
            ref={formRef}
            name="advanced_search"
            class={Styles.formList}
            model={formState}
            {...formProps}
            onFinish={onFinish}
          >
            <a-row>
              {Object.keys(columns).map((key, index) => {
                const item = columns[key];
                item.key = key;
                if (isArray(item.formItemProps)) {
                  item.formItemProps?.map((fipItem: any, fipIndex: number) => {
                    fipItem.name = `${key}.${fipIndex}`;
                  });
                } else {
                  item.formItemProps.name = key;
                }
                return (
                  <RenderCol
                    columnsItem={item}
                    columnsIndex={index}
                    formData={formState}
                    detailData={detailData}
                    formMap={formMap}
                    onFormDataChange={formDataChange}
                  ></RenderCol>
                );
              })}
            </a-row>
          </a-form>
        </div>
      );
    };
  },
});

export default withInstall(YFormList);
