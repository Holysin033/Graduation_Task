/**
 * 常量定义文件
 */

// 存储键名前缀
export const STORAGE_PREFIX = 'user_';

// 统一的存储键名定义
export const STORAGE_KEYS = {
  // 用户相关
  USER_INFO: 'userInfo',
  TOKEN: 'token',
  
  // 用户数据相关
  FAVORITE_SONGS: (userId) => `${STORAGE_PREFIX}${userId}_favoriteSongs`,
  PLAY_HISTORY: (userId) => `${STORAGE_PREFIX}${userId}_playHistory`,
  PLAYLISTS: (userId) => `${STORAGE_PREFIX}${userId}_playlists`,
  FAVORITE_PLAYLISTS: (userId) => `${STORAGE_PREFIX}${userId}_favoritePlaylists`,
  SONGS: (userId) => `${STORAGE_PREFIX}${userId}_songs`,
  USER_PROFILE: (userId) => `${STORAGE_PREFIX}${userId}_profile`,
  SYNC_STATUS: (userId) => `${STORAGE_PREFIX}${userId}_syncStatus`,
  
  // 匿名用户数据
  ANONYMOUS_FAVORITE_SONGS: 'favoriteSongs',
  ANONYMOUS_PLAY_HISTORY: 'playHistory',
  ANONYMOUS_PLAYLISTS: 'playlists',
  
  // 设置相关
  SETTINGS: 'settings',
  THEME: 'theme',
  PLAY_MODE: 'playMode',
  
  // 播放状态相关
  CURRENT_SONG: 'currentSong',
  PLAY_LIST: 'playList',
  PLAY_INDEX: 'playIndex',
  PLAY_STATUS: 'playStatus'
};

// API状态码
export const API_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

// 播放模式
export const PLAY_MODE = {
  SEQUENCE: 0, // 顺序播放
  LOOP: 1,     // 循环播放
  RANDOM: 2    // 随机播放
};

// 同步状态
export const SYNC_STATUS = {
  NONE: 'none',       // 从未同步
  SUCCESS: 'success', // 同步成功
  PARTIAL: 'partial', // 部分同步成功
  ERROR: 'error',     // 同步失败
  SYNCING: 'syncing'  // 同步中
};

// 主题模式
export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// 事件名称
export const EVENTS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  SYNC_COMPLETED: 'sync_completed',
  SONG_CHANGE: 'song_change',
  PLAY_STATE_CHANGE: 'play_state_change',
  PLAYLIST_UPDATE: 'playlist_update'
}; 