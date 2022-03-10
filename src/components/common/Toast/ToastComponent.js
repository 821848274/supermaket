import Toast from "@/components/common/Toast/Toast";

const toastComponent = {}

toastComponent.install = function (Vue) {

    const toastConstrustor = Vue.extend(Toast)

    const toast = new toastConstrustor()

    toast.$mount(document.createElement('div'))

    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default toastComponent
