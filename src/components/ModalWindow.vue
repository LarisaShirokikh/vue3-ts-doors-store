<template>
  <a-form
    :model="formState"
    class="form"
    :validate-messages="validateMessages"
    
  >
    <a-form-item
      :name="['user', 'name']"
      label="Ваше имя"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.user.name" />
    </a-form-item>
    <a-form-item
      :name="['user', 'adress']"
      label="Ваш адрес"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.user.adress" />
    </a-form-item>
    <a-form-item
      :name="['user', 'phone']"
      label="Ваш телефон"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.user.phone" />
    </a-form-item>
    <a-form-item :name="['user', 'desc']" label="Описание">
      <a-textarea v-model:value="formState.user.desc" />
    </a-form-item>
    
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button danger html-type="submit">Отправить заявку</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  user: {
    name: '',
    adress: '',
    phone: '',
    desc: '',
  },
});

</script>
