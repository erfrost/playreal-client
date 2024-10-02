import ImageNotDraggable from "@/components/ui/ImageNotDraggable";
import styles from "./index.module.css";
import icon from "/public/icons/voice.svg";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import uploadAudio from "@/api/files/uploadAudio";
import { Socket, io } from "socket.io-client";
import getUserId from "@/api/users/getUserId";
import { toastError } from "@/lib/toastifyActions";

const VoiceInput = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: true,
  });
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    (async () => {
      const userId: string = await getUserId();

      setSocket(
        io(`${process.env.BASE_SOCKET_URL}/chat?userId=${userId || ""}`)
      );
    })();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => console.log("connect"));
    socket.on("disconnect", () => console.log("disconnect"));

    return () => {
      socket.off("connect", () => console.log("connect"));
      socket.off("disconnect", () => console.log("disconnect"));
    };
  }, [socket]);

  useEffect(() => {
    if (!navigator.mediaDevices) {
      toastError("Какая-то ошибка getUserMedia");
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newMediaRecorder: MediaRecorder | null = new MediaRecorder(stream);

      setMediaRecorder(newMediaRecorder);
    });
  }, []);

  useEffect(() => {
    if (!mediaRecorder) return;
    mediaRecorder.addEventListener("dataavailable", async (e: BlobEvent) => {
      const newAudio: string = await uploadAudio(e.data);

      if (!socket) return;
      socket.emit("message", { text: null, images: null, audio: newAudio });
    });
  }, [mediaRecorder]);

  const onStart = (timer: HTMLDivElement) => {
    if (!mediaRecorder) return;
    mediaRecorder.start();
    start();
    timer.style.display = "block";

    setTimeout(() => (timer.style.opacity = "1"), 0);

    document.addEventListener("mouseup", () => onStop(timer));
  };

  const onStop = (timer: HTMLDivElement) => {
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    timer.style.opacity = "0";

    setTimeout(() => {
      timer.style.display = "none";
      reset();
    }, 300);

    document.removeEventListener("mouseup", () => onStop(timer));
  };

  useEffect(() => {
    const timer: HTMLDivElement | null = document.getElementById(
      "timer"
    ) as HTMLDivElement | null;
    if (!timer) return;

    if (isStarted) onStart(timer);
  }, [isStarted]);

  return (
    <div
      className={styles.container}
      onMouseDown={() => setIsStarted(true)}
      onMouseUp={() => setIsStarted(false)}
    >
      <div className={styles.timerContainer} id="timer">
        <span className={styles.timerContent}>
          <div className={styles.circle}></div>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      </div>
      <ImageNotDraggable src={icon} alt="voiceIcon" className={styles.icon} />
    </div>
  );
};

export default VoiceInput;
