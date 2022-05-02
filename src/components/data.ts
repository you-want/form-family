import type { ColumnType } from 'ant-design-vue/lib/table/interface'

// 搜索配置
export const SearchFormColumns = {
  env: {
    tag: 'Select',
    formItemProps: {
      label: '环境'
    },
    nodeProps: {
      options: [
        { value: 1, label: '线上' },
        { value: 2, label: '灰度' }
      ]
    }
  },
  groupId: {
    tag: 'Select',
    formItemProps: {
      label: '应用组'
    },
    nodeProps: {
      options: []
    }
  },
  application: {
    tag: 'Select',
    formItemProps: {
      label: '应用'
    },
    nodeProps: {
      options: []
    }
  },
  search: {
    tag: 'Input',
    formItemProps: {
      label: '关键字'
    },
    nodeProps: {
      placeholder: '模糊搜索域名或ID'
    }
  }
}

// 表格配置
export const TableColumns: ColumnType[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50
  },
  {
    title: '环境',
    dataIndex: 'envName',
    width: 100
  },
  {
    title: '域名',
    dataIndex: 'domains'
  },
  {
    title: '收敛',
    dataIndex: 'convergeDomains'
  },
  {
    title: '应用',
    dataIndex: 'application'
  },
  {
    title: '负责人',
    dataIndex: 'operator',
    width: 110
  },
  {
    title: '发布状态',
    dataIndex: 'releaseStatusName',
    width: 100
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 170,
    fixed: 'right'
  }
]
