<template>
  <div class="search_table">
    <YSearchTable
      :search-form-columns="searchFormColumns"
      :table-props="tableProps"
      @query-click="queryClick"
    >
      <template #extra>
        <a-button type="primary" @click="createClick">
          <template #icon>
            <PlusOutlined />
          </template>
          新增
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <!-- 域名 -->
        <template v-if="column.dataIndex === 'domains'">
          {{ record.domains?.join("; ") }}
        </template>
        <!-- 收敛域名 -->
        <template v-if="column.dataIndex === 'convergeDomains'">
          {{ record.convergeDomains?.join("; ") || "否" }}
        </template>
        <!-- 负责人 -->
        <template v-if="column.dataIndex === 'operator'">
          <template v-if="record.operator?.length > 1">
            <a-tooltip color="#ffffff">
              <template #title>
                <a-tag
                  v-for="op in record.operator"
                  :key="op"
                  color="processing"
                >
                  {{ op.name }}
                </a-tag>
              </template>
              <a>{{ ` ${record.operator?.[0]?.name}...` }}</a>
            </a-tooltip>
          </template>
          <span v-else>{{ `${record.operator?.[0]?.name || "-"}` }}</span>
        </template>
        <!-- 发布状态 -->
        <template v-if="column.dataIndex === 'releaseStatusName'">
          <a-tag v-if="record.releaseStatus === 2" color="success">
            {{ record.releaseStatusName }}
          </a-tag>
          <a-tag v-else color="default">
            {{ record.releaseStatusName }}
          </a-tag>
        </template>
        <!-- 操作 -->
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-popconfirm
              v-if="record.releaseStatus !== 2"
              title="您确定发布该条内容吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="releaseClick(record)"
            >
              <a-button type="link"> 发布 </a-button>
            </a-popconfirm>
            <!-- <a-popconfirm
              v-if="record.releaseStatus===2"
              title="您确定下线该条内容吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="releaseClick(record)"
            >
              <a-button type="link">
                下线
              </a-button>
            </a-popconfirm> -->
            <a-button type="link" @click="routerClick(record)"> 路由 </a-button>
            <a-button type="link" @click="editClick(record)"> 编辑 </a-button>
            <a-popconfirm
              title="您确定删除该条内容吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteClick(record)"
            >
              <a-button type="link"> 删除 </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </YSearchTable>
  </div>
</template>

<script lang="ts" setup name="search_table">
import { reactive, ref, onMounted } from "vue";
import {
  CloudFilled,
  DeleteFilled,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { SearchFormColumns, TableColumns } from "./data";

const tableProps = reactive({
  title: "表格",
  columns: TableColumns,
  dataSource: [] as any,
  loading: false,
  scroll: {
    x: 1200,
  },
  rowKey: (record: any) => record.key,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
});
const searchFormColumns = reactive(SearchFormColumns);
const createEditFormRef = ref();
const queryData = ref({});

onMounted(() => {});

// 创建
const createClick = () => {};
// 编辑
const editClick = (record) => {};
// 发布
const releaseClick = async (record) => {};
// 路由
const routerClick = (record) => {};
// 删除
const deleteClick = async (record) => {};
// 查询
const queryClick = async (query?: any) => {
  // queryData.value = Object.assign(queryData.value, query || {})
  // queryData.value?.pagination && (tableProps.pagination = queryData.value.pagination)
  // try {
  //   tableProps.loading = true
  //   const res = await getDomainList({
  //     page: tableProps.pagination.current,
  //     pageSize: tableProps.pagination.pageSize,
  //     ...queryData.value
  //   })
  //   tableProps.dataSource = res.data?.list || []
  //   tableProps.pagination.total = res.data?.total || 0
  //   tableProps.loading = false
  // }
  // catch (error) {
  //   tableProps.loading = false
  //   console.error('error: ', error)
  // }
};
</script>

<style lang="less" scoped>
.search_table {
  .top_query_box {
    margin-bottom: 16px;
  }
  .ant-btn-link {
    padding: 0;
  }
}
</style>
