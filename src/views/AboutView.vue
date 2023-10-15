<template>
    <div class="about">
        <h1>This is an about page</h1>
    
        <!-- <iframe src="https://player.bilibili.com/player.html?cid=1179393086&aid=530301504&page=1&as_wide=1&high_quality=1&danmaku=0" 
        scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
        <div class="player">
            <videoPlayer
            class="vjs-custom-skin videoPlayer"
            :options="playerOptions"
            ref="videoPlayer"
            :playsinline="true"></videoPlayer>
        </div> -->
        
    </div>
</template>

<script>
// import 'video.js/dist/video-js.css'
// import { VideoPlayer } from 'vue-video-player'

// export default {
// 	name: "about",
// 	components: {
//         VideoPlayer
//     },
//     data() {
//         return {
//             playerOptions: {
//                 height: '300',
//                 sources: [
//                     {
//                         // type: 'video/mp4', // 播放的类型，在这里项目中需要的是rtmp，也可以修改为：‘video/mp4’
//                         src: 'https://vjs.zencdn.net/v/oceans.mp4', 
//                         // 。{（https://v-cdn.zjol.com.cn/280443.mp4）这里是mp4格式的路径} 
//                     },
//                 ],
//                 techOrder: ['flash'],
//                 autoplay: false,
//                 controls: true,
//             },
//         }
//     },
//     computed: {
//         player() {
//             return this.$refs.videoPlayer.player
//         },
//     },
// }
</script>

<style>
.player {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
