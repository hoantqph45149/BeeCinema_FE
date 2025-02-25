import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;
console.log(import.meta.env.VITE_PUSHER_KEY);
console.log(import.meta.env.VITE_PUSHER_CLUSTER);
const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
});

export default echo;
