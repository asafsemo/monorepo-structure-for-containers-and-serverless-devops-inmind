import { createApp } from 'vue';
import './index.css';
import App from './App.vue';

const app = createApp(App);

// Dynamically import all default exports from plugins folder and call them with app
const plugins = import.meta.glob('./plugins/*.ts', { eager: true });

Object.values(plugins).forEach((mod: any) => {
	if (typeof mod.default === 'function') {
		mod.default(app);
	}
});

// app.mount('#app');
