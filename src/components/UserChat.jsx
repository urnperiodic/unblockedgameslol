export default function UserChat({ onClose }) {
  return (
    <div id="chat-workspace-container" className="relative w-full h-full flex flex-col bg-[#0c0f16] text-[#e2e8f0] overflow-hidden">
      {/* Full width/height Iframe container */}
      <div id="chat-iframe-wrapper" className="flex-1 w-full h-full bg-black">
        <iframe
          id="chat-decoy-iframe"
          src="https://urnperiodic.github.io/chat1/"
          className="w-full h-full border-none"
          title="User Chat"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
