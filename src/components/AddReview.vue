<template>
    <el-form ref="form" :model="ruleForm" label-width="120px">
        <el-form-item label="Рейтинг" prop="rating">
            <el-rate v-model="ruleForm.rating" show-score></el-rate>
        </el-form-item>
        <el-form-item label="Заголовок" prop="titleReview">
                <el-input type="textarea" v-model="ruleForm.titleReview" 
                placeholder="Что Вам понравилось или не понравилось"></el-input>
            </el-form-item>
        <el-form-item label="Расскажите подробнее" prop="briefReview">
            <el-input type="textarea" v-model="ruleForm.briefReview" 
            placeholder="Напишите подробный отзыв"></el-input>
        </el-form-item>
        <el-form-item label="Фото отзыва" prop="photos">
            <el-upload v-model:file-list="fileList" 
                action="http://localhost:3000/api/review/upload"
                list-type="picture-card" 
                :on-preview="handlePictureCardPreview" 
                :on-remove="handleRemove"
                name="photo"
                >
                <i class="fa-icon-plus"></i>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
            </el-dialog>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" 
            @click="submitForm" style="background-color: #f90; border-color: #f90;">Добавить
                отзыв</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {   ref } from 'vue';
import { sendReview } from '@/server/review';
import { toast } from 'vue3-toastify';


  const ruleForm = ref({
        rating: 0,
        titleReview: '',
        briefReview: '',
    })
            
const fileList = ref([]); 
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
    
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
};

const handleRemove = () => {
};

       const submitForm = async () => {
       try {
        const validFiles = fileList.value.filter(file => file.response);
        if (validFiles.length === 0) {
            throw new Error('Не удалось найти загруженные фото.');
        }
        const firstValidFile = validFiles[0];
        const photoFileName = firstValidFile.response.data.filename;
        const requestData = {
            rating: ruleForm.value.rating,
            title: ruleForm.value.titleReview,
            briefReview: ruleForm.value.briefReview,
            photos: [`/uploads/${photoFileName}`],
        };
        const response = await sendReview(requestData);

        console.log('Server Response:', response);
        if (response) {
            toast.success('Успешное добавление отзыва', { theme: 'colored' });
            resetForm();
        } else {
            toast.error('Ошибка при добавлении отзыва', { theme: 'colored' });
        }
    } catch (error) {
        console.error('Ошибка при отправке отзыва:', error);
    }
};

 const resetForm = () => {
    // reviewForm.resetFields();
    ruleForm.value.rating = 0;
    ruleForm.value.titleReview = '';
    ruleForm.value.briefReview = '';
    ruleForm.value.photos = [];
    fileList.value = []; // Reset the file list
    dialogImageUrl.value = '';
    dialogVisible.value = false;
};
   
</script>


<style scoped>
.avatar-uploader {
    display: inline-block;
    text-align: center;
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
}
</style>
