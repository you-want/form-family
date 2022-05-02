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

export type YTableEmits = {
  queryClick: (data: any) => void
};

// YTable
export const YTableProps = () => ({
  onQueryClick: Function as PropType<YTableEmits['queryClick']>,
});

const YTable = defineComponent({
  name: "YTable",
  props: YTableProps(),
  setup(props, { attrs, slots, emit, expose }) {
    const { } = props;
    let _pagination = reactive({
      position: "bottom",
      current: 1,
      pageSize: 10,
      showQuickJumper: true,
      showSizeChanger: true,
      total: 0,
      showTotal: (total: number) => `共 ${total} 条`,
    });
    const tableChangeData = ref({});
    // 生命周期
    onMounted(() => {});
    onUnmounted(() => {});
    // 事件函数
    // 表格改变的触发事件 {} 表示 空查询数据，占位用
    const tableChange = (
      pagination: any,
      filters: any,
      sorter: any,
      { currentDataSource }: any
    ) => {
      _pagination = Object.assign(_pagination, pagination);
      tableChangeData.value = {
        filters,
        sorter,
        currentDataSource,
      };
      emit("queryClick", {
        pagination: _pagination,
        filters,
        sorter,
        currentDataSource,
      });
    };
    // 渲染函数
    return () => {
      return (
        <a-table
          {...attrs}
          pagination={
            attrs?.pagination === false
              ? false
              : Object.assign(_pagination, attrs?.pagination)
          }
          onChange={tableChange}
        >
          {{
            bodyCell: slots.bodyCell,
            headCell: slots.headCell,
          }}
        </a-table>
      );
    };
  },
});

export default withInstall(YTable);
