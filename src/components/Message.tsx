import type { CSSProperties } from "react";

interface MessageProps {
  msg: string;
}

const Message = ({ msg }: MessageProps) => {
  const styles: CSSProperties = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#dc3545",
  };

  return (
    <div style={styles}>
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;
