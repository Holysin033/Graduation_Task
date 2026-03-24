import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentMusic: null,
		isPlaying: false,
		currentTime: 0,
		duration: 0,
		playMode: 'loop', // loop, single, random
		playlist: []
	},
	mutations: {
		setCurrentMusic(state, music) {
			state.currentMusic = music
		},
		setPlaying(state, status) {
			state.isPlaying = status
		},
		setCurrentTime(state, time) {
			state.currentTime = time
		},
		setDuration(state, duration) {
			state.duration = duration
		},
		setPlayMode(state, mode) {
			state.playMode = mode
		},
		setPlaylist(state, list) {
			state.playlist = list
		},
		addToPlaylist(state, music) {
			if (!state.playlist.find(item => item.id === music.id)) {
				state.playlist.push(music)
			}
		},
		removeFromPlaylist(state, musicId) {
			state.playlist = state.playlist.filter(item => item.id !== musicId)
		},
		clearPlaylist(state) {
			state.playlist = []
		}
	},
	actions: {
		playMusic({ commit }, music) {
			commit('setCurrentMusic', music)
			commit('setPlaying', true)
			commit('addToPlaylist', music)
		},
		pauseMusic({ commit }) {
			commit('setPlaying', false)
		},
		resumeMusic({ commit }) {
			commit('setPlaying', true)
		},
		updateTime({ commit }, time) {
			commit('setCurrentTime', time)
		},
		updateDuration({ commit }, duration) {
			commit('setDuration', duration)
		},
		changePlayMode({ commit }, mode) {
			commit('setPlayMode', mode)
		}
	},
	getters: {
		currentMusic: state => state.currentMusic,
		isPlaying: state => state.isPlaying,
		currentTime: state => state.currentTime,
		duration: state => state.duration,
		playMode: state => state.playMode,
		playlist: state => state.playlist
	}
}) 