// 开发期模拟数据：后端接口就绪前，前端先跑通完整产品体验
// 剧集封面用公开的竖版海报占位（picsum 稳定图源）

export interface Episode {
  id: number
  title: string
  duration: string
  isFree: boolean
  thumb: string
}

export interface Drama {
  id: number
  title: string
  category: string
  cover: string
  desc: string
  totalEpisodes: number
  freeEpisodes: number
  playCount: string
  rating: number
  tags: string[]
  episodes: Episode[]
}

const covers = [
  'https://picsum.photos/seed/drama1/480/640',
  'https://picsum.photos/seed/drama2/480/640',
  'https://picsum.photos/seed/drama3/480/640',
  'https://picsum.photos/seed/drama4/480/640',
  'https://picsum.photos/seed/drama5/480/640',
  'https://picsum.photos/seed/drama6/480/640',
  'https://picsum.photos/seed/drama7/480/640',
  'https://picsum.photos/seed/drama8/480/640',
]

const makeEpisodes = (dramaId: number, total: number, free: number): Episode[] =>
  Array.from({ length: total }, (_, i) => ({
    id: dramaId * 100 + i + 1,
    title: `第 ${i + 1} 集`,
    duration: `${1 + (i % 2)}:${String(10 + ((i * 7) % 50)).padStart(2, '0')}`,
    isFree: i < free,
    thumb: `https://picsum.photos/seed/ep${dramaId}x${i}/240/135`,
  }))

export const dramas: Drama[] = [
  {
    id: 1,
    title: '都市仙尊归来',
    category: '玄幻',
    cover: covers[0],
    desc: '隐世仙尊重返都市，却发现妻女受尽欺辱。这一世，他不再隐藏实力，要让所有亏欠之人百倍偿还！',
    totalEpisodes: 80,
    freeEpisodes: 10,
    playCount: '1280万',
    rating: 9.2,
    tags: ['玄幻', '逆袭', '爽文'],
    episodes: makeEpisodes(1, 80, 10),
  },
  {
    id: 2,
    title: '龙王殿之潜龙出渊',
    category: '热血',
    cover: covers[1],
    desc: '五年前他被逐出家门，五年后他以龙王殿主身份归来。当年看不起他的人，如今都要仰望。',
    totalEpisodes: 72,
    freeEpisodes: 8,
    playCount: '960万',
    rating: 8.9,
    tags: ['热血', '龙王', '复仇'],
    episodes: makeEpisodes(2, 72, 8),
  },
  {
    id: 3,
    title: '恶毒千金重生了',
    category: '言情',
    cover: covers[2],
    desc: '前世被渣男贱女联手害死，重生回订婚前夜。这一次，她要改写命运，把仇人一个个踩在脚下。',
    totalEpisodes: 90,
    freeEpisodes: 10,
    playCount: '1560万',
    rating: 9.5,
    tags: ['重生', '复仇', '女强'],
    episodes: makeEpisodes(3, 90, 10),
  },
  {
    id: 4,
    title: '脑洞大爆炸',
    category: '脑洞',
    cover: covers[3],
    desc: '被雷劈后获得系统，任务竟是让全世界都震惊！从此，离谱又上头的故事一个接一个。',
    totalEpisodes: 60,
    freeEpisodes: 6,
    playCount: '890万',
    rating: 8.7,
    tags: ['脑洞', '系统', '搞笑'],
    episodes: makeEpisodes(4, 60, 6),
  },
  {
    id: 5,
    title: '星际殖民计划',
    category: '科幻',
    cover: covers[4],
    desc: '地球资源枯竭，人类启动星际殖民计划。他是第一批拓荒者，也是第一个发现阴谋的人。',
    totalEpisodes: 66,
    freeEpisodes: 8,
    playCount: '730万',
    rating: 8.5,
    tags: ['科幻', '悬疑', '末世'],
    episodes: makeEpisodes(5, 66, 8),
  },
  {
    id: 6,
    title: '系统流：开局一把刀',
    category: '热血',
    cover: covers[5],
    desc: '穿越到异界，开局只有一把破刀。靠着一刀一个小朋友的系统奖励，他杀出一条成神之路。',
    totalEpisodes: 85,
    freeEpisodes: 9,
    playCount: '1020万',
    rating: 9.0,
    tags: ['系统', '热血', '穿越'],
    episodes: makeEpisodes(6, 85, 9),
  },
  {
    id: 7,
    title: '霸总的替身新娘',
    category: '言情',
    cover: covers[6],
    desc: '姐姐逃婚，她被迫顶替嫁给冷酷霸总。原以为是一场交易，却不知霸总早已暗恋她多年。',
    totalEpisodes: 78,
    freeEpisodes: 10,
    playCount: '1340万',
    rating: 8.8,
    tags: ['霸总', '甜宠', '替身'],
    episodes: makeEpisodes(7, 78, 10),
  },
  {
    id: 8,
    title: '我在修仙界搞基建',
    category: '脑洞',
    cover: covers[7],
    desc: '别人修仙靠打坐，他修仙靠搞基建。修路造桥建城池，凡人的香火就是他的修为！',
    totalEpisodes: 70,
    freeEpisodes: 8,
    playCount: '680万',
    rating: 8.4,
    tags: ['修仙', '基建', '脑洞'],
    episodes: makeEpisodes(8, 70, 8),
  },
]

export const categories = [
  { id: 'all', name: '全部' },
  { id: '玄幻', name: '玄幻' },
  { id: '热血', name: '热血' },
  { id: '言情', name: '言情' },
  { id: '脑洞', name: '脑洞' },
  { id: '科幻', name: '科幻' },
]

export const getDrama = (id: number) => dramas.find((d) => d.id === id)
export const getEpisode = (dramaId: number, epId: number) =>
  getDrama(dramaId)?.episodes.find((e) => e.id === epId)
