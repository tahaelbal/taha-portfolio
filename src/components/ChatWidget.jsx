import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const initialMessages = [
  {
    role: "assistant",
    content: "Hi! I can answer questions about Taha's work, skills, and availability.",
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage = { role: "user", content: input.trim() };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsLoading(true);

    const assistantMessage = { role: "assistant", content: "" };
    setMessages([...history, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Unable to reach chat service.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let hasStreamedContent = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const trimmed = part.trim();
          if (!trimmed.startsWith("data:")) {
            continue;
          }

          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(payload);
            if (parsed.delta) {
              hasStreamedContent = true;
              assistantMessage.content += parsed.delta;
              setMessages([...history, { ...assistantMessage }]);
            } else if (parsed.error) {
              assistantMessage.content = `Chat error: ${String(parsed.error).slice(0, 220)}`;
              setMessages([...history, { ...assistantMessage }]);
              break;
            }
          } catch {
            // Ignore malformed events.
          }
        }
      }

      if (!hasStreamedContent && !assistantMessage.content.trim()) {
        assistantMessage.content = "No response received from chat service.";
        setMessages([...history, { ...assistantMessage }]);
      }
    } catch (error) {
      assistantMessage.content = error.message || "Something went wrong.";
      setMessages([...history, { ...assistantMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-3 right-3 z-50 sm:bottom-5 sm:left-auto sm:right-5">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Ask Taha"
          className="group ml-auto flex h-13 w-13 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-[0_12px_30px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-[1.03] hover:from-cyan-300 hover:to-blue-400 sm:h-auto sm:w-auto sm:gap-3 sm:px-5 sm:py-3 sm:text-sm sm:font-semibold sm:uppercase sm:tracking-[0.22em]"
        >
          <MessageCircle size={18} className="transition group-hover:rotate-6" />
          <span className="hidden sm:inline">Ask Taha</span>
        </button>
      ) : (
        <div className="ml-auto w-full max-w-[360px] overflow-hidden rounded-3xl border border-cyan-200/15 bg-[linear-gradient(170deg,rgba(11,21,52,0.98)_0%,rgba(8,12,30,0.97)_48%,rgba(6,10,26,0.96)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-cyan-100/10 px-4 py-3.5">
            <div>
              <p className="text-sm font-semibold tracking-wide text-cyan-50">Ask Taha</p>
              <p className="text-xs text-cyan-100/65">AI-powered portfolio assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-cyan-100/60 transition hover:bg-cyan-100/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex h-[360px] max-h-[62vh] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => {
              if (!message.content?.trim()) {
                return null;
              }

              const isUser = message.role === "user";

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 shadow-sm ${
                    isUser
                      ? "ml-auto rounded-br-md border border-cyan-200/20 bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
                      : "rounded-bl-md border border-slate-600/35 bg-slate-700/45 text-slate-100"
                  }`}
                >
                  {message.content}
                </div>
              );
            })}
            {isLoading ? (
              <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-slate-600/35 bg-slate-700/45 px-3.5 py-2.5 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200/70" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200/70 [animation-delay:0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200/70 [animation-delay:0.3s]" />
                </span>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-cyan-100/10 bg-slate-900/35 p-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/70 px-3 py-2 backdrop-blur">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about my work..."
                className="flex-1 bg-transparent px-2 py-1 text-sm text-white outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-2 text-white shadow-[0_10px_18px_rgba(56,189,248,0.4)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
