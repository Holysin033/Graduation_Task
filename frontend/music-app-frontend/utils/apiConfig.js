/**
 * API配置文件
 */

// 基础URL
const BASE_URL = 'http://localhost:3002/api';

export default {
  // 歌曲接口
  song: {
    baseUrl: BASE_URL,
    detail: (id) => `/song/detail?id=${id}`,
    url: (id) => `/song/url?id=${id}`,
    lyric: (id) => `/song/lyric?id=${id}`,
  },
  
  // 搜索接口
  search: {
    baseUrl: BASE_URL,
    keywords: (keywords, limit = 30) => `/search?keywords=${encodeURIComponent(keywords)}&limit=${limit}`,
  },
  
  // 用户接口
  user: {
    baseUrl: BASE_URL,
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    detail: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
  },
  
  // 同步接口
  sync: {
    baseUrl: BASE_URL,
    status: (userId) => `/sync/status/${userId}`,
    userData: '/sync/user-data',
    favorites: '/sync/favorites',
    playHistory: '/sync/play-history',
    playlists: '/sync/playlists',
    favoritePlaylists: '/sync/favorite-playlists',
    songs: '/sync/songs',
  },
  
  // 收藏接口
  favorite: {
    baseUrl: BASE_URL,
    list: (userId) => `/favorites/${userId}`,
    add: (userId) => `/favorites/${userId}`,
    remove: (userId, songId) => `/favorites/${userId}/${songId}`,
    check: (userId, songId) => `/favorites/${userId}/check/${songId}`,
  },
  
  // 收藏歌单接口
  favoritePlaylist: {
    baseUrl: BASE_URL,
    list: (userId) => `/sync/favorite-playlists/${userId}`,
    add: '/sync/favorite-playlists',
    remove: (userId, playlistId) => `/sync/favorite-playlists/${userId}/${playlistId}`,
    check: (userId, playlistId) => `/sync/favorite-playlists/check/${userId}/${playlistId}`,
  },
  
  // 历史记录接口
  history: {
    baseUrl: BASE_URL,
    list: (userId) => `/history/${userId}`,
    add: (userId) => `/history/${userId}`,
    clear: (userId) => `/history/${userId}`,
  },
  
  // 歌单接口
  playlist: {
    baseUrl: BASE_URL,
    list: (userId) => `/playlists/${userId}`,
    detail: (id) => `/playlists/${id}`,
    create: (userId) => `/playlists/${userId}`,
    update: (id) => `/playlists/${id}`,
    updateCover: (id) => `/playlists/${id}/cover`,
    delete: (userId, id) => `/playlists/${userId}/${id}`,
    addSong: (id) => `/playlists/${id}/songs`,
    removeSong: (id, songId) => `/playlists/${id}/songs/${songId}`,
  },
}; 