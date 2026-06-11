export type DiagramTool = {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  mermaidType: string;
  intro: string;
  tips: string[];
  template: string;
};

export const diagramTools: DiagramTool[] = [
  {
    slug: "er",
    title: "生成ER图",
    shortTitle: "ER图",
    badge: "ER",
    description: "输入实体、字段和关系，生成数据库 ER 图。",
    mermaidType: "erDiagram",
    intro: "适合数据库建模、表关系梳理和需求评审。",
    tips: [
      "用实体表示表名。",
      "字段后面可补主键、唯一键等说明。",
      "用关系线表达一对一、一对多、多对多。",
    ],
    template: `erDiagram
    USER {
      int id PK
      string name
      string email
      datetime created_at
    }
    ORDER {
      int id PK
      int user_id FK
      decimal total_amount
      string status
      datetime created_at
    }
    ORDER_ITEM {
      int id PK
      int order_id FK
      int product_id FK
      int quantity
      decimal unit_price
    }
    PRODUCT {
      int id PK
      string name
      decimal price
      int stock
    }

    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : appears_in`,
  },
  {
    slug: "sequence",
    title: "生成时序图",
    shortTitle: "时序图",
    badge: "时",
    description: "描述角色之间的调用顺序，生成系统交互时序图。",
    mermaidType: "sequenceDiagram",
    intro: "适合接口设计、登录流程和支付流程梳理。",
    tips: [
      "先定义参与者。",
      "按时间顺序写请求和响应。",
      "可加入 Note、alt、loop 表示分支和循环。",
    ],
    template: `sequenceDiagram
    participant U as 用户
    participant W as Web前端
    participant A as 认证服务
    participant D as 数据库

    U->>W: 输入账号密码并提交
    W->>A: 发送登录请求
    A->>D: 查询用户信息
    D-->>A: 返回用户记录
    A-->>W: 返回 token
    W-->>U: 登录成功并跳转首页`,
  },
  {
    slug: "flowchart",
    title: "生成流程图",
    shortTitle: "流程图",
    badge: "流",
    description: "把业务步骤整理成标准流程图。",
    mermaidType: "flowchart",
    intro: "适合审批流程、注册流程和运营 SOP 可视化。",
    tips: [
      "节点之间用箭头连接。",
      "判断节点可用大括号表示。",
      "给每个节点写清楚动作或结果。",
    ],
    template: `flowchart TD
    A[开始提交需求] --> B[产品整理需求]
    B --> C{是否需要技术评审}
    C -- 是 --> D[开发评估工期]
    C -- 否 --> E[进入排期]
    D --> E
    E --> F[开发实现]
    F --> G[测试验收]
    G --> H[上线发布]`,
  },
  {
    slug: "data-flow",
    title: "生成数据流图",
    shortTitle: "数据流图",
    badge: "数",
    description: "梳理数据从输入、处理到输出的流转路径。",
    mermaidType: "flowchart",
    intro: "适合接口数据流、业务处理链路和系统边界分析。",
    tips: [
      "外部实体、处理过程、数据存储分开描述。",
      "箭头命名可写传输的数据内容。",
      "重点写清楚数据进入、加工和输出。",
    ],
    template: `flowchart LR
    U[用户]
    F[前端表单]
    S[订单服务]
    DB[(订单库)]
    MQ[(消息队列)]
    R[报表系统]

    U -->|填写订单信息| F
    F -->|提交订单数据| S
    S -->|保存订单| DB
    S -->|推送下单事件| MQ
    MQ -->|消费订单事件| R
    R -->|生成分析结果| U`,
  },
  {
    slug: "architecture",
    title: "生成架构图",
    shortTitle: "架构图",
    badge: "构",
    description: "画出系统模块、服务和基础设施之间的结构关系。",
    mermaidType: "flowchart",
    intro: "适合项目汇报、系统设计和技术方案说明。",
    tips: [
      "按层次分组前端、服务层、数据层。",
      "核心依赖尽量简洁，不要一次塞太多细节。",
      "先表达边界，再补充组件名称。",
    ],
    template: `flowchart TB
    subgraph Client[客户端层]
      WEB[Web站点]
      ADMIN[管理后台]
    end

    subgraph Service[服务层]
      API[API 网关]
      USER[用户服务]
      ORDER[订单服务]
      FILE[文件服务]
    end

    subgraph Infra[基础设施]
      REDIS[(Redis)]
      MYSQL[(MySQL)]
      OSS[(对象存储)]
      MQ[(消息队列)]
    end

    WEB --> API
    ADMIN --> API
    API --> USER
    API --> ORDER
    API --> FILE
    USER --> MYSQL
    ORDER --> MYSQL
    ORDER --> REDIS
    FILE --> OSS
    ORDER --> MQ`,
  },
  {
    slug: "functional-structure",
    title: "功能结构图",
    shortTitle: "功能结构图",
    badge: "功",
    description: "把产品模块拆成树状功能结构图。",
    mermaidType: "mindmap",
    intro: "适合产品规划、后台功能梳理和需求拆解。",
    tips: [
      "从产品名称开始向下拆一级、二级功能。",
      "同级功能命名尽量对齐。",
      "避免把交互流程和功能结构混在一起。",
    ],
    template: `mindmap
  root((电商后台))
    商品管理
      商品列表
      商品分类
      库存管理
    订单管理
      订单列表
      售后处理
      发货管理
    用户管理
      用户列表
      会员等级
      地址管理
    数据中心
      销售报表
      用户分析
      渠道分析`,
  },
  {
    slug: "use-case",
    title: "生成用例图",
    shortTitle: "用例图",
    badge: "例",
    description: "梳理参与者和系统功能之间的关系，生成用例图。",
    mermaidType: "flowchart",
    intro: "适合需求分析、角色权限说明和系统边界表达。",
    tips: [
      "左边一般放参与者，右边放系统用例。",
      "参与者和用例之间用连线表达可执行关系。",
      "可以按角色拆成用户、管理员、运营等。",
    ],
    template: `flowchart LR
    U[用户]
    A[管理员]

    subgraph System[订单系统]
      UC1((注册账号))
      UC2((提交订单))
      UC3((支付订单))
      UC4((查看订单))
      UC5((审核退款))
      UC6((管理商品))
    end

    U --- UC1
    U --- UC2
    U --- UC3
    U --- UC4
    A --- UC5
    A --- UC6`,
  },
];

export function getDiagramTool(slug: string) {
  return diagramTools.find((tool) => tool.slug === slug);
}
