<template>
    <fixed-fixed-header :threshold="this.threshold" v-on:change="this.onChange">
        <div class="navbar">
            <slot />
        </div>
    </fixed-fixed-header>
</template>

<script>
    import FixedHeader from 'vue-fixed-header';

    const FixedFixedHeader = {
        extends: FixedHeader,
        mounted () {
            this.lastScrollTop = this.getScrollTop();
            this.check = () => {
                const { threshold, hideScrollUp } = this;
                const currentScrollPos = this.getScrollTop();
                const isFixed =
                    currentScrollPos >= this.lastScrollTop
                        ? currentScrollPos > threshold
                        : (hideScrollUp ? false : currentScrollPos > threshold);
                this.lastScrollTop = currentScrollPos;

                this.isFixed = isFixed;
                this.$emit('change', this.isFixed, currentScrollPos, threshold);
            };
            this.registerEvent();
        },
        computed: {
            scrollEventOptions () {
                let passiveSupported = false;

                try {
                    const options = {
                        get passive () {
                            passiveSupported = true;
                            return false;
                        }
                    };
                    window.addEventListener('test', null, options);
                    window.removeEventListener('test', null, options);
                } catch (err) {
                    passiveSupported = false;
                }
                return passiveSupported ? { passive: true } : false;
            }
        },
        methods: {
            registerEvent () {
                window.addEventListener('scroll', this.check, this.scrollEventOptions);
            },
            removeEvent () {
                window.removeEventListener('scroll', this.check, this.scrollEventOptions);
            }
        }
    };

    export default {
        name: 'ModifiedFixedHeader',
        props: {
            threshold: {
                type: [Number],
                default: 56
            }
        },
        components: {
            FixedFixedHeader
        },
        data() {
            return {}
        },
        methods: {
            onChange: function (fixed, currentScrollPos, threshold) {
                this.$emit('change', fixed, currentScrollPos, threshold)
            }
        }
    }
</script>