<script setup>
defineProps({
  item: { type: Object, required: true },
  index: { type: Number, default: 0 },
  to: { type: String, default: '' }
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="liquid-glass-card item-card"
    :style="{ animationDelay: `${index * 0.1}s` }"
  >
    <div v-if="item.image" class="item-card-image">
      <img :src="item.image" :alt="item.title" />
    </div>
    <div class="item-card-content">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </NuxtLink>
  <div
    v-else
    class="liquid-glass-card item-card"
    :style="{ animationDelay: `${index * 0.1}s` }"
  >
    <div v-if="item.image" class="item-card-image">
      <img :src="item.image" :alt="item.title" />
    </div>
    <div class="item-card-content">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  animation: fadeSlideUp 0.5s ease both;
}

.item-card-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}

.item-card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}

.item-card:hover .item-card-image img {
  transform: scale(1.05);
}

.item-card-content {
  padding: 16px 20px 20px;
}

.item-card-content h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--font-color);
  margin: 0;
}

.item-card-content p {
  font-size: 0.85rem;
  color: var(--font-color);
  opacity: 0.7;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .item-card-image {
    height: 130px;
  }
}
</style>
