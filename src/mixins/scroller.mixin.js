export default {
    methods: {
        jumpToId(id) {
            let top = document.getElementById(id).offsetTop;
            window.scrollTo(0, top);
        }
    }
}