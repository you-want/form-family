import type {
  ComponentPublicInstance,
  CSSProperties,
  ExtractPropTypes,
  PropType,
} from "vue";
import { YSearchForm, YTable } from "../index";
import { withInstall } from "../_util/type";
import Styles from "./index.module.less";
import { YTableProps } from "../YTable/index";

// YSearchTable
export const YSearchTableProps = () => ({
  searchFormColumns: {
    type: Object,
    default: () => {},
  },
  formProps: {
    type: Object,
    default: () => {},
  },
  tableProps: {
    type: Object,
    default: () => {},
  },
});

const YSearchTable = defineComponent({
  name: "YSearchTable",
  props: YSearchTableProps(),
  slots: ["extra"],
  emits: ["queryClick"],
  setup(props, { attrs, slots, emit, expose }) {
    const {
      searchFormColumns,
      formProps,
      // tableColumns,
      // tableData,
      tableProps,
    } = props;
    const tableCardProps = ref({
      title: tableProps.title || "",
    });
    delete tableProps.title;
    // 生命周期
    onMounted(() => {});
    onUnmounted(() => {});
    // 事件函数
    const queryClick = (data: any) => {
      emit("queryClick", data);
    };
    // 渲染函数
    return () => {
      return (
        <div class={Styles.YSearchTable}>
          <a-card
            class={Styles.YSearchFormBox}
            bodyStyle={{ padding: "24px 24px 0" }}
          >
            <YSearchForm
              columns={searchFormColumns}
              formProps={formProps}
              onQueryClick={queryClick}
            />
          </a-card>
          <a-card
            class={Styles.YTableBox}
            {...tableCardProps}
            extra={slots.extra?.()}
          >
            <YTable {...tableProps} onQueryClick={queryClick}>
              {{
                bodyCell: slots.bodyCell,
              }}
            </YTable>
          </a-card>
        </div>
      );
    };
  },
});

export default withInstall(YSearchTable);
