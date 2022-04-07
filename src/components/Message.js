const Message = ({ msg, bgColor }) => {
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#dc3545",
  };

  return (
    
    <div style={styles}>
      {/* <p>{msg}</p> */}
      {/* insert HTML with the help of dangerouslySetInnerHTML */}
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;
