import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  wsHost: import.meta.env.VITE_PUSHER_HOST || "127.0.0.1",
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || "mt1",
  wsPort: 6001,
  forceTLS: false, // Tắt TLS khi chạy local
  disableStats: true,
  enabledTransports: ["ws", "wss"], // Cho phép cả ws và wss
});

export default echo;
