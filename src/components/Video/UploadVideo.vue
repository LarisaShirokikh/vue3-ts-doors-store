<template>
    <div class="con">
        <h2 class="heading">Добавить видео</h2>
            <form @submit.prevent="uploadVideo" class="form">

        <label for="videoInput" class="upload-container">Загрузить видео</label>
            <input 
            type="file" 
            id="videoInput" 
            @change="handleFileChange" 
            accept="video/*, .webm, .mp4, .mov, .avi, " 
            class="file-input" />

        <video v-if="videoPreview" 
        class="video-preview" 
        :src="videoPreview" 
        alt="video-preview"
        autoplay
        width="auto"
        height="auto"
        loop
        controls
        />
        

        <button 
        v-if="videoPreview" 
        @click="uploadVideo" 
        type="button" 
        class="fas fa-cloud-upload-alt upload-button">
        Отправить видео
        </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { addVideo } from '../../server/video';

export default defineComponent({
    setup() {
        const selectedVideo = ref<File | null>(null);
        const videoPreview = ref<string | null>(null);
        const videoInput = ref<HTMLInputElement | null>(null);
        const video = ref<File | null>(null);
        const videoName = ref<string | null>(null);

        const handleFileChange = (event: Event) => {
            const fileInput = event.target as HTMLInputElement;
            const file = fileInput.files?.[0];

    console.log('file = fileInput.files?.[0];', file);

            if (file) {
                video.value = file;

                const reader = new FileReader();
                reader.onload = (e) => {
                    videoPreview.value = e.target?.result as string;
                };
                reader.readAsDataURL(file);
                videoName.value = file.name;

                console.log('Selected video:', file);
                console.log('Video name:', videoName.value);
            }
        };


        const uploadVideo = async () => {
            if (!video.value) {
                console.error('No video selected.');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('video', video.value);
                if (videoName.value !== null) {
                    formData.append('name', videoName.value);
                }

                console.log('FormData:', formData);
                
                const response = await addVideo(formData);

                if (response && response.data) {
                    toast.success('Успешное добавление видео', { theme: 'colored' });
                    if (videoInput.value) {
                        videoInput.value.value = '';
                        videoPreview.value = null;
                    }
                } else {
                    console.error('No response or data from server.');
                }

                console.log('Server Response:', response.data);
            } catch (error) {
                console.error('Error uploading video:', error);
                toast.error(`Ошибка при загрузке видео: ${onmessage}`, { theme: 'colored' });
            }
        };

        return {
            selectedVideo,
            videoInput,
            handleFileChange,
            uploadVideo,
            videoPreview
        };
    },
});
</script>

<style scoped>
.con {
    padding: 50px;
}

.upload-container {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.file-input {
    display: none;
}

.drag-text {
    margin-bottom: 10px;
}

.video-preview {
    margin-top: 20px;
    text-decoration: none;
}

.upload-button {
    cursor: pointer;
    border: 2px solid #d91111;
    background-color: #fff;
    padding: 10px 20px;
    font-size: 1rem;
    color: #d91111;
    border-radius: 5px;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    display: inline-block;
    margin-top: 20px;
}

.upload-button:hover {
    background-color: #d91111;
    color: #fff;
}
</style>