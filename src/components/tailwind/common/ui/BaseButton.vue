<template>
    <button @click.prevent="this.onClick" type="this.ButtonType" :class="[this.ButtonClasses]">
        <slot />
    </button>
</template>

<script>
    import BaseButtonMixin from '@/mixins/base-button.mixin';

    export default {
        name: "BaseButton",
        mixins: [
            BaseButtonMixin
        ]
    }
</script>