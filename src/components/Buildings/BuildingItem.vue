<template>
    <div class="building-item">
        <div class="video-container">
            <video
        width="200" 
        height="auto" 
        controls 
        muted loop preload="auto" 
        
            >
                <source :src="videoUrl(video.video[0])" 
                :poster="video.thumbnail" class="building-video" 
                />
            </video>
            <div class="building-icons">
                <span><i class="far fa-eye"></i> {{ video.viewsCount }}</span>
                <span><i class="far fa-thumbs-up"></i> {{ video.likes }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
   props: {
        video: {
            type: Object,
            required: true,
        },
    },
    methods: {

         likeBuilding () {
            // Обработка нажатия на "Like"
        },

        commentBuilding () {
            // Обработка нажатия на "Comment"
        },

        videoUrl (path)  {
            console.log('Video path:', path);
            return path.startsWith('/video/') ? `http://localhost:3000${path}` : path;
            },
    },
});
</script>

<style scoped>
.building-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    gap: 1px;
}

.video-container {
    position: relative;
    width: 200px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
}

.building-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
}

.building-icons {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    display: flex;
    justify-content: center;
    gap: 20px;
    color: #ddd;
}

.building-details {
    width: 80%;
    /* Adjust the width as needed */
    margin: 0 auto;
}

.building-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.building-details button {
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 5px;
}

.building-details button i {
    margin-right: 5px;
}

.building-author,
.building-published-time {
    font-size: 10px;
    /* Adjust the font size as needed */
}</style>
