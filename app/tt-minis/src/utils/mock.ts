// 开发期模拟数据：后端接口就绪前，前端先跑通完整产品体验
// 日本市场漫剧：题材与文案以日语为主（正式版接入媒资与 CMS 后替换）

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
    title: `第${i + 1}話`,
    duration: `${1 + (i % 2)}:${String(10 + ((i * 7) % 50)).padStart(2, '0')}`,
    isFree: i < free,
    thumb: `https://picsum.photos/seed/ep${dramaId}x${i}/240/135`,
  }))

export const dramas: Drama[] = [
  {
    id: 1,
    title: '復讐の令嬢〜やり直しの人生〜',
    category: '恋愛',
    cover: covers[0],
    desc: '婚約者に裏切られ命を落とした令嬢が、婚約発表の前夜にタイムリープ。今度こそ仇を全員、地獄に突き落とす。',
    totalEpisodes: 80,
    freeEpisodes: 10,
    playCount: '1280万回',
    rating: 9.2,
    tags: ['タイムリープ', '復讐', '女主人公'],
    episodes: makeEpisodes(1, 80, 10),
  },
  {
    id: 2,
    title: '社長の契約花嫁',
    category: '恋愛',
    cover: covers[1],
    desc: '姉の身代わりで冷酷な社長と契約結婚した私。ビジネスの関係のはずが、彼は5年前から私に恋をしていた。',
    totalEpisodes: 72,
    freeEpisodes: 8,
    playCount: '960万回',
    rating: 8.9,
    tags: ['契約結婚', '溺愛', 'シンデレラ'],
    episodes: makeEpisodes(2, 72, 8),
  },
  {
    id: 3,
    title: '追放された勇者の逆襲',
    category: '逆転',
    cover: covers[2],
    desc: 'パーティーを追放された最弱の勇者。実は隠された真の力に覚醒し、かつての仲間たちを見返していく。',
    totalEpisodes: 90,
    freeEpisodes: 10,
    playCount: '1560万回',
    rating: 9.5,
    tags: ['追放', '逆転', '成り上がり'],
    episodes: makeEpisodes(3, 90, 10),
  },
  {
    id: 4,
    title: 'ゾンビアポカリプス：生存者たち',
    category: 'ホラー',
    cover: covers[3],
    desc: '突然のウイルス感染で街はゾンビの群れに。生き残った者たちの極限サバイバルが始まる。',
    totalEpisodes: 60,
    freeEpisodes: 6,
    playCount: '890万回',
    rating: 8.7,
    tags: ['ゾンビ', 'サバイバル', 'パニック'],
    episodes: makeEpisodes(4, 60, 6),
  },
  {
    id: 5,
    title: '異世界転生したら最強魔法使い',
    category: 'ファンタジー',
    cover: covers[4],
    desc: '事故死したサラリーマンが異世界に転生。与えられたスキルは「全属性魔法」だけ。最強への道が開かれる。',
    totalEpisodes: 66,
    freeEpisodes: 8,
    playCount: '730万回',
    rating: 8.5,
    tags: ['異世界', '転生', '魔法'],
    episodes: makeEpisodes(5, 66, 8),
  },
  {
    id: 6,
    title: '消えた未解決事件の真実',
    category: 'サスペンス',
    cover: covers[5],
    desc: '10年前に消えた連続殺人事件。新人刑事が旧資料の中に見つけたのは、犯人が残した暗号だった。',
    totalEpisodes: 85,
    freeEpisodes: 9,
    playCount: '1020万回',
    rating: 9.0,
    tags: ['ミステリー', '刑事', '伏線'],
    episodes: makeEpisodes(6, 85, 9),
  },
  {
    id: 7,
    title: '今日から始める無限ループ',
    category: 'サスペンス',
    cover: covers[6],
    desc: '目が覚めるたびに同じ日が繰り返される。ループから抜け出す鍵は、あの日の事故に隠されていた。',
    totalEpisodes: 78,
    freeEpisodes: 10,
    playCount: '1340万回',
    rating: 8.8,
    tags: ['ループ', '謎解き', 'タイムリープ'],
    episodes: makeEpisodes(7, 78, 10),
  },
  {
    id: 8,
    title: '九尾の狐と契約恋愛',
    category: 'ファンタジー',
    cover: covers[7],
    desc: '山で助けた狐は、実は千年生きる九尾の狐だった。契約を結んだはずが、いつの間にか同居生活に発展。',
    totalEpisodes: 70,
    freeEpisodes: 8,
    playCount: '680万回',
    rating: 8.4,
    tags: ['狐', 'ファンタジー', '同居'],
    episodes: makeEpisodes(8, 70, 8),
  },
]

export const categories = [
  { id: 'all', name: 'すべて' },
  { id: '恋愛', name: '恋愛' },
  { id: '逆転', name: '逆転' },
  { id: 'ファンタジー', name: 'ファンタジー' },
  { id: 'サスペンス', name: 'サスペンス' },
  { id: 'ホラー', name: 'ホラー' },
]

export const getDrama = (id: number) => dramas.find((d) => d.id === id)
export const getEpisode = (dramaId: number, epId: number) =>
  getDrama(dramaId)?.episodes.find((e) => e.id === epId)
