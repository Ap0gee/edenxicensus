export default {
    props: {
        text: {
            type: [String],
            default: ""
        },
        action: {
            type: [Function, String],
            default: (e) => {console.log("Button Clicked!")}
        },
        classes: {
            type: [Array],
            default: () => (["btn"])
        },
        type: {
            type: [String],
            default: "button"
        },
    },
    data: function () {
        return {
            button: {
                action: this.action,
                classes: this.classes,
                type: this.type
            }
        }
    },
    methods: {
        onClick(e) {
            let buttonAction = this.ButtonAction;
            if (typeof(buttonAction) === 'function') {
                return buttonAction(e);
            }
            window.location.replace(buttonAction)
        }
    },
    computed: {
        ButtonAction() {
            return this.button.action;
        },
        ButtonClasses() {
            return this.button.classes;
        },
        ButtonType() {
            return this.button.type;
        },
    }
}