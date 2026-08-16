export default function ChatWorkspace({ onClose }) {
  return (
    <div id="chat-workspace-container" className="relative w-full h-full flex flex-col bg-[#0c0f16] text-[#e2e8f0] overflow-hidden">
      {/* Full width/height Iframe container */}
      <div id="chat-iframe-wrapper" className="flex-1 w-full h-full bg-black">
        <iframe
          id="chat-decoy-iframe"
          src="https://grandplat2.vercel.app/"
          className="w-full h-full border-none"
          title="Extra Stuff Workspace"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
