
import uviewPlus from 'uview-plus'
import { createSSRApp } from "vue";
import App from "./App.vue";
import dayjs from "dayjs"
import 'default-passive-events'
export function createApp() {
    const app = createSSRApp(App);
    app.use(dayjs)
    app.use(uviewPlus)
    return {
        app,
    };
}