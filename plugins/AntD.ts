
import { App } from 'vue'
import {
  Form,
  Input,
  Radio,
  Select,
  Table,
  Layout,
  Card,
  Button,
  Breadcrumb,
  Tooltip,
  DatePicker,
  Avatar,
  Dropdown,
  Menu,
  ConfigProvider,
  Checkbox,
  Switch,
  InputNumber,
  Row,
  Col,
  Space,
  Tag,
  Divider,
  Drawer,
  Popconfirm,
  Tabs,
} from 'ant-design-vue'
const install = (app: App) => {
  app
    .use(Form)
    .use(Table)
    .use(Layout)
    .use(Card)
    .use(Input)
    .use(Radio)
    .use(Select)
    .use(Button)
    .use(Breadcrumb)
    .use(Tooltip)
    .use(DatePicker)
    .use(Avatar)
    .use(Dropdown)
    .use(Menu)
    .use(ConfigProvider)
    .use(Checkbox)
    .use(Switch)
    .use(InputNumber)
    .use(Row)
    .use(Col)
    .use(Space)
    .use(Tag)
    .use(Divider)
    .use(Drawer)
    .use(Popconfirm)
    .use(Tabs)
}

export default install
