import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div>
        
      <nav className="p-5 border-b-2 flex flex-row">
        <div>
          <div
            style={{
              alignItems: "center",
              color: "white",
              display: "flex",
              height: "50px",
              justifyContent: "right",
              width: "100%",
            }}
          >
            <ConnectButton moralisAuth={false} />
          </div>
        </div>
      </nav>
    </div>
  );
}
