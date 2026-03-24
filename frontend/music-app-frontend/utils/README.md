# 音乐应用工具类

本目录包含音乐应用的核心工具类和辅助函数。

## 最近更新

### 播放列表缓存管理工具 (playlistCache.js)

新增了专门用于管理播放列表缓存的工具类，确保在录入歌曲时自动添加URL。主要功能包括：

1. **保存播放列表到缓存** - `savePlaylists(playlists, userId)`
   - 确保所有歌曲都有URL
   - 同时更新全局缓存和用户特定缓存

2. **从缓存获取播放列表** - `getPlaylists(userId)`
   - 优先获取用户特定缓存，如果不存在则获取全局缓存
   - 自动处理JSON解析错误

3. **获取指定ID的播放列表** - `getPlaylistById(playlistId, userId)`
   - 快速获取特定播放列表

4. **将歌曲添加到播放列表** - `addSongsToPlaylist(playlistId, songs, userId)`
   - 支持添加单首歌曲或歌曲数组
   - 自动生成歌曲URL

5. **创建新的播放列表** - `createPlaylist(playlistInfo, userId)`
   - 创建新的播放列表并保存到缓存

6. **删除播放列表** - `deletePlaylist(playlistId, userId)`
   - 从缓存中删除指定的播放列表

### 请求处理工具 (request.js)

改进了请求处理函数，增加了更健壮的错误处理和日志记录：

1. 详细的请求和响应日志
2. 超时处理和网络错误处理
3. 友好的错误信息

## 主要工具类

- `apiConfig.js` - API配置管理
- `auth.js` - 认证相关函数
- `musicData.js` - 音乐数据处理
- `playlistCache.js` - 播放列表缓存管理
- `request.js` - HTTP请求处理

## 使用示例

### 添加带URL的歌曲到播放列表

```javascript
const { addSongsToPlaylist } = require('@/utils/playlistCache.js');

// 歌曲数据
const song = {
  id: '123456',
  name: '示例歌曲',
  artist: '示例歌手'
};

// 添加到播放列表，自动生成URL
addSongsToPlaylist('playlist_id', song, 'user_id');
```

### 使用缓存工具获取播放列表

```javascript
const { getPlaylistById } = require('@/utils/playlistCache.js');

// 获取指定播放列表
const playlist = getPlaylistById('playlist_id', 'user_id');
if (playlist) {
  // 播放列表中的所有歌曲都已确保有URL
  console.log(playlist);
}
``` 