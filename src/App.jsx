import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const [task, setTask] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(25 * 60);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg items-center justify-center">

        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <span className="text-2xl">⏱️</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Focus Timer
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Focus on one task at a time.
            </p>
          </div>

          {/* Task Input */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Your task
            </label>

            <input
              ref={inputRef}
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What are you working on?"
              className="
                w-full rounded-xl border border-slate-700
                bg-slate-800 px-4 py-3
                text-white placeholder-slate-500
                outline-none transition
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20
              "
            />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center sm:p-8">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              {isRunning ? "Focus Session" : "Ready"}
            </p>

            <div className="text-7xl font-bold tracking-tight text-white sm:text-8xl">
              {formatTime()}
            </div>

            <p className="mt-4 min-h-6 truncate text-sm text-slate-400">
              {task || "Enter a task to get started"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="
                  rounded-xl bg-blue-600 px-5 py-3
                  font-semibold text-white
                  shadow-lg shadow-blue-600/20
                  transition-all duration-200
                  hover:bg-blue-500
                  active:scale-[0.98]
                "
              >
                ▶ Start
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="
                  rounded-xl bg-amber-500 px-5 py-3
                  font-semibold text-slate-950
                  transition-all duration-200
                  hover:bg-amber-400
                  active:scale-[0.98]
                "
              >
                ⏸ Pause
              </button>
            )}

            <button
              onClick={resetTimer}
              className="
                rounded-xl border border-slate-700
                bg-slate-800 px-5 py-3
                font-semibold text-slate-200
                transition-all duration-200
                hover:border-slate-600
                hover:bg-slate-700
                active:scale-[0.98]
              "
            >
              ↻ Reset
            </button>
          </div>

          {/* Status */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span
              className={`h-2 w-2 rounded-full ${
                isRunning ? "animate-pulse bg-green-500" : "bg-slate-600"
              }`}
            />

            {isRunning ? "Timer is running" : "Timer is paused"}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;