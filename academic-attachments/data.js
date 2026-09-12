/**
 * 学术附件元数据集（演示数据）
 * 仅包含公开论文附件的描述性元数据，不包含任何文件实体或下载地址。
 *
 * 字段说明：
 *  id          唯一标识
 *  title       附件标题
 *  type        类型：dataset 数据集 / supplement 补充材料 / code 代码包
 *  size        附件大小（人类可读，来源于发布方声明）
 *  source      来源说明：发布机构 / 仓储 / 许可
 *  access      合规访问方式（开放获取或申请后获取，均指向发布方页面）
 *  accessUrl   发布方官方页面（占位演示链接，example.edu 为保留演示域名）
 *  updatedAt   更新时间（ISO 8601）
 *  authors     关联论文作者
 *  venue       关联论文出处
 *  abstract    摘要
 *  files       文件结构（来源于发布方公布的清单）
 */
const ATTACHMENTS = [
  {
    id: "ATT-2024-0001",
    title: "全球山地冰川月际物质平衡数据集（2000–2023）",
    type: "dataset",
    size: "4.7 GB（压缩分卷，12 个 NetCDF 文件）",
    source: "高山冰冻圈联合实验室 · 发布于机构数据仓储；CC BY 4.0",
    access: "开放获取，需在发布方页面登记用途后获取",
    accessUrl: "https://data.example.edu/records/glacier-mb-2024",
    updatedAt: "2024-11-08",
    authors: "李沐霖, Sarah Okafor, 陈昱辰",
    venue: "Journal of Cryospheric Science, 2024",
    abstract:
      "本数据集汇集全球 19 条参照冰川 2000–2023 年的月际物质平衡重建结果，基于再分析气象场与原位花杆观测的能量平衡同化模型生成。数据以 0.5° 网格组织，包含表面物质收支、反照率与正积温派生变量，并附不确定性场。适用于气候变化归因与水文情景研究，使用时请勿重新分发原始分卷，建议引用论文及数据集 DOI。",
    files: [
      { name: "README.md", note: "数据字典与引用方式", children: [] },
      { name: "data/", note: "", children: [
        { name: "monthly_balance_2000_2023.nc", note: "主数据文件，3.1 GB", children: [] },
        { name: "uncertainty_ensemble.nc", note: "集合不确定性场，1.2 GB", children: [] },
        { name: "shards/", note: "按冰川分卷", children: [
          { name: "glacier_01_alps.nc", note: "", children: [] },
          { name: "glacier_07_himalaya.nc", note: "", children: [] }
        ]}
      ]},
      { name: "scripts/", note: "", children: [
        { name: "validate.py", note: "读取与校验脚本", children: [] }
      ]},
      { name: "metadata.json", note: "schema 版本与变量定义", children: [] }
    ]
  },
  {
    id: "ATT-2024-0002",
    title: "补充材料：跨语言预训练模型的句法迁移实验附录",
    type: "supplement",
    size: "18 MB（PDF + CSV 表格）",
    source: "计算语言学学会（ACL Anthology 镜像）；CC BY-NC 4.0",
    access: "随论文开放获取",
    accessUrl: "https://aclanthology.example.org/2024.ijcnlp-1.42/",
    updatedAt: "2024-08-21",
    authors: "Hana Vermeer, 赵青遥, Daniel Ruiz",
    venue: "IJCNLP-AACL 2024",
    abstract:
      "附录包含正文未展开的全部探针实验：12 种语言对的逐层句法表示相似度热力图、随机基线与置换检验结果、超参数敏感性分析，以及人工标注指南全文。所有统计检验明细以长表 CSV 提供，便于元分析复用。本附录不包含正文模型权重，权重请见作者所在机构的模型卡页面。",
    files: [
      { name: "appendix.pdf", note: "附录正文，含图 A1–A37 与表 S1–S14", children: [] },
      { name: "tables/", note: "", children: [
        { name: "probe_scores_long.csv", note: "全部探针得分（长表）", children: [] },
        { name: "permutation_tests.csv", note: "置换检验 p 值与效应量", children: [] }
      ]},
      { name: "annotation_guideline.pdf", note: "句法标注手册，22 页", children: [] },
      { name: "hyperparameters.md", note: "各实验完整超参数", children: [] }
    ]
  },
  {
    id: "ATT-2024-0003",
    title: "code",
    type: "code",
    size: "源码归档 6.3 MB（不含模型权重）",
    source: "第一作者 GitHub 组织 · MIT License；权重依协议单独申请",
    access: "代码开放获取；训练数据与权重需通过机构协议申请",
    accessUrl: "https://github.example.org/harbourlab/reef-forecast",
    updatedAt: "2025-02-14",
    authors: "A. Fernandez, 林知远, M. Oduya",
    venue: "Nature Computational Science, 2025",
    abstract:
      "赤潮预报系统 REEF 的可复现实验包：含时空图神经网络定义、ERA5 再分析数据预处理管线、回测脚本与确定性复现用配置文件。仓库不含业务化运行的实况接入模块，亦不附带受分发限制的训练权重；README 说明了权重申请的审批流程与预计周期。提供 Dockerfile 与最小样例数据，可在普通工作站上完成端到端冒烟测试。",
    files: [
      { name: "README.md", note: "复现步骤、权重申请指引", children: [] },
      { name: "src/", note: "", children: [
        { name: "model.py", note: "时空图网络结构定义", children: [] },
        { name: "dataset.py", note: "数据管线", children: [] },
        { name: "backtest.py", note: "回测入口", children: [] }
      ]},
      { name: "configs/", note: "", children: [
        { name: "exp_main.yaml", note: "主实验配置", children: [] },
        { name: "exp_ablation.yaml", note: "消融实验配置", children: [] }
      ]},
      { name: "tests/", note: "", children: [
        { name: "test_pipeline.py", note: "冒烟测试", children: [] }
      ]},
      { name: "Dockerfile", note: "", children: [] },
      { name: "requirements.txt", note: "依赖锁定清单", children: [] },
      { name: "LICENSE", note: "MIT", children: [] }
    ]
  },
  {
    id: "ATT-2023-0014",
    title: "明清县级财政登记微观数据（1550–1850）抽样版",
    type: "dataset",
    size: "320 MB（Parquet 列式存储）",
    source: "社会经济史数据中心 · 受控访问；数据使用协议（DUA）",
    access: "受限访问：需提交研究计划，经数据治理委员会审批",
    accessUrl: "https://dsc.example-history.edu/access/ming-qing-fiscal",
    updatedAt: "2023-12-02",
    authors: "吴思齐, P. Holloway, 郑可",
    venue: "Journal of Economic History, 2023",
    abstract:
      "抽样版覆盖 43 个县的赋役全书与蠲缓档案转录条目，字段包括税目、石/两折算、蠲免比例与灾伤记录，所有条目保留档册溯源信息。由于原始契约含可能的可识别宗族信息，抽样版仍按受控数据管理：使用者须签署数据使用协议，禁止重新识别个人、禁止将数据转交第三方。页面仅公布变量字典与文件组织方式，具体记录在审批通过后于安全计算环境内使用。",
    files: [
      { name: "codebook.pdf", note: "变量字典与编码规则（公开）", children: [] },
      { name: "data/", note: "审批后于安全环境内可见", children: [
        { name: "county_panel.parquet", note: "县级面板", children: [] },
        { name: "tax_items.parquet", note: "税目明细", children: [] },
        { name: "disaster_relief.parquet", note: "灾伤蠲缓记录", children: [] }
      ]},
      { name: "provenance/", note: "", children: [
        { name: "archive_sources.csv", note: "档册馆藏编号对照", children: [] }
      ]},
      { name: "DUA.pdf", note: "数据使用协议模板", children: [] }
    ]
  },
  {
    id: "ATT-2025-0021",
    title: "补充材料：柔性压力传感器阵列表征与稳定性测试",
    type: "supplement",
    size: "94 MB（视频、原始曲线与图纸）",
    source: "材料与器件开放仓库（图随文仓储）；CC BY 4.0",
    access: "随论文开放获取",
    accessUrl: "https://materials.example-repo.org/supplements/flex-array-77",
    updatedAt: "2025-04-30",
    authors: "郭晚晴, I. Petrov, 何川",
    venue: "Advanced Functional Materials, 2025",
    abstract:
      "补充材料汇总器件表征的原始证据：10 000 次循环加载的阻抗-应变原始曲线、不同湿度梯度下的漂移测量视频、阵列光刻掩膜版图纸（Gerber）与截面 SEM 原始图像包。视频采用开放格式并附播放校验值说明。材料合成步骤仅以文字与配比表形式给出，不提供任何受出口管制的前体获取渠道信息。",
    files: [
      { name: "figures_raw/", note: "", children: [
        { name: "cyclic_10000_curves.csv", note: "循环测试原始曲线", children: [] },
        { name: "sem_cross_section.zip", note: "SEM 原图，61 MB", children: [] }
      ]},
      { name: "videos/", note: "", children: [
        { name: "humidity_drift_test.webm", note: "湿度漂移测试记录", children: [] }
      ]},
      { name: "masks/", note: "", children: [
        { name: "array_layout_v3.gbr", note: "光刻掩膜版 Gerber 文件", children: [] }
      ]},
      { name: "synthesis_notes.pdf", note: "合成步骤与配比表", children: [] }
    ]
  },
  {
    id: "ATT-2024-0009",
    title: "单细胞 ATAC-seq 肿瘤微环境注释数据集（12 个队列）",
    type: "dataset",
    size: "12.4 GB（压缩矩阵 + H5AD）",
    source: "国家基因组数据信息中心 · 受控访问（dbGaP 等同机制）",
    access: "受限访问：伦理批件与 DAC 授权后获取",
    accessUrl: "https://genomics.example.org/dac/study-scatac-tme",
    updatedAt: "2024-06-17",
    authors: "沈听澜, R. Kowalski, 黄薇",
    venue: "Cancer Cell, 2024",
    abstract:
      "整合 12 个已发表队列的单细胞染色质可及性数据，统一完成峰调用、细胞类型注释与染色质开放模块推断。因样本来源于人类受试者，数据按受控层级管理：本条目仅公开分析流程版本、细胞类型本体映射表与汇总统计（不含个体层面数据）。授权研究者可在审计环境中读取 H5AD 主矩阵，下载与再分发均被禁止。",
    files: [
      { name: "summary_stats/", note: "公开汇总层", children: [
        { name: "peak_counts_by_type.csv", note: "按细胞类型汇总", children: [] },
        { name: "ontology_mapping.csv", note: "细胞类型本体映射", children: [] }
      ]},
      { name: "controlled/", note: "授权后在审计环境内可见", children: [
        { name: "matrix_peaks.mtx.zst", note: "主计数矩阵，9.8 GB", children: [] },
        { name: "annotations.h5ad", note: "注释与元数据，2.6 GB", children: [] }
      ]},
      { name: "pipeline/", note: "", children: [
        { name: "workflow.wdl", note: "处理流程定义", children: [] },
        { name: "container_manifest.txt", note: "容器镜像摘要", children: [] }
      ]},
      { name: "ETHICS_NOTICE.md", note: "伦理与授权要求说明", children: [] }
    ]
  },
  {
    id: "ATT-2023-0007",
    title: "补充材料：河口盐度梯度野外调查站位表与仪器校准记录",
    type: "supplement",
    size: "6.5 MB（PDF 与工作簿）",
    source: "海洋研究所机构知识库；CC BY 4.0",
    access: "开放获取",
    accessUrl: "https://ocean.example-iri.edu/handle/1182/salinity-2023",
    updatedAt: "2023-09-25",
    authors: "田鹭, J. Bergman",
    venue: "Estuarine, Coastal and Shelf Science, 2023",
    abstract:
      "包含三次航次共 148 个站位的 GPS、潮位与剖面观测安排，CTD 与光学浊度仪的逐批次校准证书与漂移修正系数，以及正文图 2–6 的绘图工作簿。校准记录保留了仪器序列号与实验室温度，可供复核测量不确定度。本材料仅为调查过程记录，不包含高精度航道测量成果。",
    files: [
      { name: "stations.xlsx", note: "站位坐标与观测安排", children: [] },
      { name: "calibration/", note: "", children: [
        { name: "ctd_certificates.pdf", note: "CTD 校准证书合集", children: [] },
        { name: "drift_corrections.csv", note: "漂移修正系数", children: [] }
      ]},
      { name: "figures_workbook.xlsx", note: "正文图表源工作簿", children: [] }
    ]
  },
  {
    id: "ATT-2025-0030",
    title: "MAGPIE：多智能体政策评估模拟框架代码包",
    type: "code",
    size: "源码与文档 22 MB（仿真快照需另行生成）",
    source: "公共政策计算实验室 · GPL-3.0",
    access: "开放获取（代码）；内置默认参数包以 CC0 发布",
    accessUrl: "https://gitlab.example.org/policylab/magpie",
    updatedAt: "2025-07-09",
    authors: "C. Lindqvist, 苏宁望, T. Abe",
    venue: "Journal of Artificial Intelligence Research, 2025",
    abstract:
      "MAGPIE 用于在受控人工社会中评估信息披露政策的群体级效应：提供智能体行为内核、政策规则 DSL、实验编排与结果聚合模块，并以笔记本形式给出论文中三个实验的完整复现路径。仓库不包含任何真实人口微观数据；默认参数均为合成或已公开的聚合统计。注意 GPL-3.0 的衍生作品分发义务，商用接入前请阅读 LICENSE。",
    files: [
      { name: "README.md", note: "安装与五分钟示例", children: [] },
      { name: "magpie/", note: "包源码", children: [
        { name: "agents.py", note: "智能体内核", children: [] },
        { name: "policy_dsl.py", note: "政策规则 DSL", children: [] },
        { name: "orchestrator.py", note: "实验编排", children: [] },
        { name: "aggregate.py", note: "结果聚合", children: [] }
      ]},
      { name: "notebooks/", note: "", children: [
        { name: "exp1_disclosure.ipynb", note: "", children: [] },
        { name: "exp2_nudge.ipynb", note: "", children: [] },
        { name: "exp3_robustness.ipynb", note: "", children: [] }
      ]},
      { name: "params_default/", note: "CC0 默认参数（合成）", children: [
        { name: "agents.yaml", note: "", children: [] },
        { name: "network.yaml", note: "", children: [] }
      ]},
      { name: "pyproject.toml", note: "", children: [] },
      { name: "LICENSE", note: "GPL-3.0", children: [] }
    ]
  },
  {
    id: "ATT-2024-0018",
    title: "补充材料：青铜器锈蚀产物拉曼光谱参考谱图库",
    type: "supplement",
    size: "210 MB（谱图文件与显微照片）",
    source: "科技考古联合实验室 · 发布于机构仓储；CC BY-SA 4.0",
    access: "开放获取，商业使用须遵循相同方式共享",
    accessUrl: "https://arch-science.example.edu/raman-bronze-patina",
    updatedAt: "2024-03-11",
    authors: "贺明琚, L. Fontaine",
    venue: "Journal of Archaeological Science, 2024",
    abstract:
      "针对 64 件经成分分析确认的青铜样品，收录孔雀石、蓝铜矿、氯铜矿等 9 类锈蚀产物在三种激发波长下的拉曼参考谱图，配套金相显微照片与采集参数。谱图以 JCAMP-DX 开放格式存储，并提供去荧光基线处理前后两个版本。库中不含文物高精度三维扫描数据，相关影像须向收藏单位另行申请。",
    files: [
      { name: "spectra/", note: "", children: [
        { name: "raw/", note: "原始谱图 JCAMP-DX", children: [
          { name: "malachite_532nm.jdx", note: "", children: [] },
          { name: "azurite_785nm.jdx", note: "", children: [] }
        ]},
        { name: "baseline_corrected/", note: "基线校正版本", children: [] }
      ]},
      { name: "micrographs/", note: "金相显微照片", children: [
        { name: "sample_001_200x.tif", note: "", children: [] }
      ]},
      { name: "acquisition_params.csv", note: "激光功率、积分时间等", children: [] },
      { name: "CITATION.cff", note: "引用元数据", children: [] }
    ]
  }
];
