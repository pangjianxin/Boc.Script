<template>
    <v-hover v-slot="{ isHovering, props }">
        <div class="max-auto w-100 mb-3">
            <v-card v-bind="props">
                <v-expand-transition>
                    <div v-if="isHovering" class="d-flex transition-fast-in-fast-out bg-secondary v-card--reveal text-h2"
                        style="height: 100%;">
                        <slot name="reveal"></slot>
                    </div>
                </v-expand-transition>
                <template #title>
                    <span class="text-body-1 font-weight-bold">
                        <slot name="title"></slot>
                    </span>
                </template>
                <template #subtitle>
                    <span class="text-caption text-indigo">
                        <slot name="subtitle"></slot>
                    </span>
                </template>
                <template #prepend>
                    <slot name="prepend"></slot>
                </template>
            </v-card>
        </div>
    </v-hover>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
    z-index: 999999;
}
</style>