<template>
    <popper
        :append-to-body="appendToBody"
        :class="currentClass"
        :delay-on-mouse-out="delayOnMouseOut"
        :delay-on-mouse-over="delayOnMouseOver"
        :disabled="disabled"
        :enter-active-class="enterActiveClass"
        :force-show="forceShow"
        :key="rerenderKey"
        :leave-active-class="leaveActiveClass"
        :options="allOptions"
        :prevent-default="preventDefault"
        :stop-propagation="stopPropagation"
        :tag-name="tagName"
        :transition="transition"
        :trigger="trigger"
        :visible-arrow="false"
        @created="$emit('created', $event)"
        @document-click="$emit('document-click', $event)"
        @hide="onHide($event)"
        @show="onShow($event)"
        ref="popper"
    >
        <div
            :class="dropdownClass"
            @click="dropdownClick"
            ref="dropdown"
        >
            <slot/>
        </div>

        <t-button
            :active="shown"
            :disabled="disabled"
            :size="size"
            :tag-name="buttonTagName"
            :variant="variant"
            @blur="$emit('blur', $event)"
            @click="$emit('click', $event)"
            @focus="$emit('focus', $event)"
            ref="button"
            slot="reference"
            v-bind="buttonProps"
        >
            <slot
                :shown="shown"
                name="button-content"
            >
                <font-awesome-icon icon="caret-down" />
            </slot>

        </t-button>
    </popper>
</template>

<script>
    import selfInstall from 'vue-tailwind/src/utils/selfInstall.js'
    import Popper from 'vue-popperjs';
    import TDropdownTheme from 'vue-tailwind/src/themes/default/TDropdown'
    import Theme from '../../../../../vue-tailwind-theme';

    const {
        baseClass,
        dropdownClass,
        disabledClass,
    } = Theme.TDropdown;

    export default {
        name: 'TDropdownCustom',

        install(Vue, theme) {
            selfInstall(Vue, theme, this)
        },

        components: {
            Popper,
        },

        props: {
            tagName: {
                type: String,
                default: 'div'
            },
            buttonTagName: {
                type: String,
                default: 'button'
            },
            variant: {
                type: String,
                default: null,
                validator: function (value) {
                    return value === null || ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'].indexOf(value) !== -1
                }
            },
            size: {
                type: String,
                default: null,
                validator: function (value) {
                    return value === null || ['lg', 'sm'].indexOf(value) !== -1
                }
            },
            text: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            delayOnMouseOver: {
                type: Number,
                default: 10
            },
            delayOnMouseOut: {
                type: Number,
                default: 10
            },
            appendToBody: {
                type: Boolean,
                default: false
            },
            placement: {
                type: String,
                default: 'auto'
            },
            options: {
                type: Object,
                default: () => {
                }
            },
            trigger: {
                type: String,
                default: 'click'
            },
            visibleArrow: {
                type: Boolean,
                default: true
            },
            forceShow: {
                type: Boolean,
                default: false
            },
            enterActiveClass: {
                type: String,
                default: null
            },
            leaveActiveClass: {
                type: String,
                default: null
            },
            transition: {
                type: String,
                default: ''
            },
            stopPropagation: {
                type: Boolean,
                default: false
            },
            preventDefault: {
                type: Boolean,
                default: false
            },
            closeOnDropdownClick: {
                type: Boolean,
                default: true
            },
            baseClass: {
                type: [String, Object, Array],
                default: baseClass
            },
            dropdownClass: {
                type: [String, Object, Array],
                default: dropdownClass
            },
            disabledClass: {
                type: [String, Object, Array],
                default: disabledClass
            },
            buttonProps: {
                type: Object,
                default: () => {
                }
            },
        },

        data() {
            return {
                rerenderKey: 1,
                shown: false
            }
        },

        computed: {
            allOptions() {
                return {
                    ...this.options,
                    ...{
                        placement: this.placement
                    }
                }
            },
            /**
             * The default classes for the button
             *
             * @return {Array}
             */
            currentClass() {
                let classes = [
                    `${this.$options._componentTag}`,
                    `${this.$options._componentTag}-size-${ this.size || 'default' }`,
                ]

                if (this.baseClass) {
                    classes.push(this.baseClass)
                }

                if (this.disabled) {
                    classes.push(`${this.$options._componentTag}-disabled`)
                    if (this.disabledClass) {
                        classes.push(this.disabledClass)
                    }
                }

                return classes
            }
        },

        watch: {
            allOptions: {
                handler() {
                    this.resetPopper();
                },
                deep: true
            },
        },

        methods: {
            dropdownClick(e) {
                this.$emit('dropdown-click', e)

                if (this.closeOnDropdownClick && this.$refs.popper) {
                    this.$refs.popper.doClose()
                }
            },

            onShow(e) {
                this.shown = true
                this.$emit('show', e)
            },

            onHide(e) {
                this.shown = false
                this.$emit('show', e)
            },
            /**
             * Change the key forces to the component to re-render
             * @TODO Make a PR in the vue-popper package for reset the values
             */
            async resetPopper() {
                this.rerenderKey++
            }
        }
    }
</script>
