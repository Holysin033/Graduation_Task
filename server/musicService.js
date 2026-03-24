const express = require('express')
const cors = require('cors')
const axios = require('axios')
const router = express.Router()

const app = express()
const port = 3001  // 使用不同的端口，避免与NeteaseCloudMusicApi冲突

// 启用CORS
app.use(cors())

// 网易云音乐API基础URL
const BASE_URL = 'http://localhost:3000'

// 获取音乐URL
app.get('/song/url', async (req, res) => {
  try {
    const { id } = req.query
    console.log('正在获取音乐URL，ID：', id)
    
    // 检查ID是否存在
    if (!id) {
      throw new Error('缺少音乐ID参数')
    }
    
    // 检查网易云音乐API是否可用
    try {
      await axios.get(`${BASE_URL}/top/list`)
    } catch (error) {
      console.error('网易云音乐API不可用：', error.message)
      throw new Error('网易云音乐API服务不可用')
    }
    
    // 尝试获取音乐URL
    const response = await axios.get(`${BASE_URL}/song/url`, {
      params: {
        id: id
      }
    })
    console.log('音乐URL获取成功，响应数据：', JSON.stringify(response.data, null, 2))
    
    if (!response.data.data || !response.data.data[0]) {
      throw new Error('获取音乐URL失败：响应数据格式不正确')
    }
    
    const songData = response.data.data[0]
    
    // 如果无法获取直接播放链接，尝试使用备用链接
    if (!songData.url) {
      console.log('无法获取直接播放链接，使用备用链接')
      songData.url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    }
    
    // 检查音乐是否可播放
    try {
      const checkResponse = await axios.head(songData.url)
      if (checkResponse.status !== 200) {
        throw new Error('音乐可能因版权问题无法播放')
      }
    } catch (error) {
      console.error('音乐链接检查失败：', error.message)
      throw new Error('音乐可能因版权问题无法播放')
    }

    res.json({ data: [songData] })
  } catch (error) {
    console.error('获取音乐URL失败：', error.message)
    if (error.response) {
      console.error('错误响应状态码：', error.response.status)
      console.error('错误响应数据：', JSON.stringify(error.response.data, null, 2))
    }
    res.status(500).json({
      code: 500,
      message: error.message || '获取音乐URL失败',
      details: error.response?.data || {}
    })
  }
})

// 获取音乐详情
app.get('/song/detail', async (req, res) => {
  try {
    const { ids } = req.query
    console.log('正在获取音乐详情，ID：', ids)
    const response = await axios.get(`${BASE_URL}/song/detail`, {
      params: {
        ids: ids
      }
    })
    console.log('音乐详情获取成功，响应数据：', JSON.stringify(response.data, null, 2))
    
    if (!response.data.songs || !response.data.songs[0]) {
      throw new Error('获取音乐详情失败：响应数据格式不正确')
    }

    res.json(response.data)
  } catch (error) {
    console.error('获取音乐详情失败：', error.message)
    if (error.response) {
      console.error('错误响应状态码：', error.response.status)
      console.error('错误响应数据：', JSON.stringify(error.response.data, null, 2))
    }
    res.status(500).json({
      code: 500,
      message: error.message || '获取音乐详情失败',
      details: error.response?.data || {}
    })
  }
})

// 获取热门歌曲
app.get('/top/list', async (req, res) => {
  try {
    console.log('正在获取热门歌曲...')
    const response = await axios.get(`${BASE_URL}/playlist/detail?id=3778678`)
    console.log('热门歌曲获取成功')
    
    if (!response.data.playlist || !response.data.playlist.tracks) {
      throw new Error('获取热门歌曲失败')
    }

    const songs = response.data.playlist.tracks.map(song => ({
      id: song.id,
      name: song.name,
      artist: song.ar[0].name,
      cover: song.al.picUrl,
      duration: song.dt / 1000
    }))

    res.json({ playlist: { tracks: songs } })
  } catch (error) {
    console.error('获取热门歌曲失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取热门歌曲失败'
    })
  }
})

// 获取推荐歌单
app.get('/recommend/playlist', async (req, res) => {
  try {
    console.log('正在获取推荐歌单...')
    const response = await axios.get(`${BASE_URL}/personalized`)
    console.log('推荐歌单获取成功')
    
    if (!response.data.result) {
      throw new Error('获取推荐歌单失败')
    }

    const playlists = response.data.result.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      cover: playlist.picUrl,
      playCount: playlist.playCount
    }))

    res.json({ result: playlists })
  } catch (error) {
    console.error('获取推荐歌单失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取推荐歌单失败'
    })
  }
})

// 获取歌单详情
app.get('/playlist/detail', async (req, res) => {
  try {
    const { id } = req.query
    console.log('正在获取歌单详情，ID：', id)
    const response = await axios.get(`${BASE_URL}/playlist/detail?id=${id}`)
    console.log('歌单详情获取成功')
    
    if (!response.data.playlist) {
      throw new Error('获取歌单详情失败')
    }

    const playlist = {
      id: response.data.playlist.id,
      name: response.data.playlist.name,
      cover: response.data.playlist.coverImgUrl,
      description: response.data.playlist.description,
      tracks: response.data.playlist.tracks.map(song => ({
        id: song.id,
        name: song.name,
        artist: song.ar[0].name,
        cover: song.al.picUrl,
        duration: song.dt / 1000
      }))
    }

    res.json({ playlist })
  } catch (error) {
    console.error('获取歌单详情失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取歌单详情失败'
    })
  }
})

// 获取歌手热门歌曲
app.get('/artist/hot', async (req, res) => {
  try {
    const { id } = req.query
    console.log('正在获取歌手热门歌曲，ID：', id)
    const response = await axios.get(`${BASE_URL}/artist/hot?id=${id}`)
    console.log('歌手热门歌曲获取成功')
    
    if (!response.data.hotSongs) {
      throw new Error('获取歌手热门歌曲失败')
    }

    const songs = response.data.hotSongs.map(song => ({
      id: song.id,
      name: song.name,
      artist: song.ar[0].name,
      cover: song.al.picUrl,
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      duration: song.dt / 1000
    }))

    res.json({ songs })
  } catch (error) {
    console.error('获取歌手热门歌曲失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取歌手热门歌曲失败'
    })
  }
})

// 搜索音乐
app.get('/search', async (req, res) => {
  try {
    const { keywords } = req.query
    console.log('正在搜索音乐，关键词：', keywords)
    
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        keywords: keywords,
        type: 1,
        limit: 30
      }
    })
    console.log('搜索成功')
    
    if (!response.data.result || !response.data.result.songs) {
      throw new Error('搜索结果为空')
    }

    const songs = response.data.result.songs.map(song => ({
      id: song.id,
      name: song.name,
      artist: song.ar[0].name,
      cover: song.al.picUrl,
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      duration: song.dt / 1000
    }))

    res.json({ result: { songs } })
  } catch (error) {
    console.error('搜索音乐失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '搜索音乐失败'
    })
  }
})

// 获取歌词
app.get('/lyric', async (req, res) => {
  try {
    const { id } = req.query
    console.log('正在获取歌词，歌曲ID：', id)
    
    const response = await axios.get(`${BASE_URL}/lyric`, {
      params: {
        id: id
      }
    })
    console.log('歌词获取成功')
    
    if (!response.data.lrc || !response.data.lrc.lyric) {
      throw new Error('获取歌词失败')
    }

    res.json({ lrc: { lyric: response.data.lrc.lyric } })
  } catch (error) {
    console.error('获取歌词失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取歌词失败'
    })
  }
})

// 获取歌手列表
app.get('/artist/list', async (req, res) => {
  try {
    const { type, area, initial } = req.query
    console.log('正在获取歌手列表...')
    const response = await axios.get(`${BASE_URL}/artist/list`, {
      params: {
        type: type || -1,
        area: area || -1,
        initial: initial || -1
      }
    })
    console.log('歌手列表获取成功')
    
    if (!response.data.artists) {
      throw new Error('获取歌手列表失败')
    }

    const artists = response.data.artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      cover: artist.picUrl,
      alias: artist.alias
    }))

    res.json({ artists })
  } catch (error) {
    console.error('获取歌手列表失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取歌手列表失败'
    })
  }
})

// 获取新歌
app.get('/new/songs', async (req, res) => {
  try {
    console.log('正在获取新歌...')
    const response = await axios.get(`${BASE_URL}/personalized/newsong`)
    console.log('新歌获取成功')
    
    if (!response.data.result) {
      throw new Error('获取新歌失败')
    }

    const songs = response.data.result.map(song => ({
      id: song.id,
      name: song.name,
      artist: song.song.artists[0].name,
      cover: song.picUrl,
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      duration: song.song.duration / 1000
    }))

    res.json({ songs })
  } catch (error) {
    console.error('获取新歌失败：', error.message)
    if (error.response) {
      console.error('错误响应：', error.response.data)
    }
    res.status(500).json({
      code: 500,
      message: '获取新歌失败'
    })
  }
})

// 检查 API 状态
router.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/top/list`)
        res.json({ code: 200, message: 'API 正常' })
    } catch (error) {
        res.status(500).json({ code: 500, message: 'API 异常' })
    }
})

// 获取推荐歌单
router.get('/api/recommend/playlists', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/personalized`)
        if (response.data.code === 200) {
            res.json({
                code: 200,
                result: response.data.result
            })
        } else {
            res.status(500).json({
                code: 500,
                message: response.data.message || '获取推荐歌单失败'
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '获取推荐歌单失败'
        })
    }
})

// 获取分类歌单
router.get('/api/playlists/category', async (req, res) => {
    try {
        const { cat, limit = 30 } = req.query
        const response = await axios.get(`${BASE_URL}/top/playlist`, {
            params: {
                cat,
                limit
            }
        })
        if (response.data.code === 200) {
            res.json({
                code: 200,
                playlists: response.data.playlists
            })
        } else {
            res.status(500).json({
                code: 500,
                message: response.data.message || '获取分类歌单失败'
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '获取分类歌单失败'
        })
    }
})

// 启动服务器
app.listen(port, () => {
  console.log(`音乐服务已启动，监听端口：${port}`)
})

module.exports = router 