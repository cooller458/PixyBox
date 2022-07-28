const Loading = () => {
    return (
      <div
        className=" absolute w-96 h-96 text-center loading"
        style={{
          background: "#0008",
          color: "white",
          top: 0,
          width: "100%",
          height: "600px",
          left: 0,
          position: "absolute",
          zIndex: 9,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 40 50">
          <polygon
            strokeWidth="1"
            stroke="#fff"
            fill="none"
            points="20,1 40,40 1,40"
          ></polygon>
          <text fill="#fff" x="5" y="47">
            Loading
          </text>
        </svg>
      </div>
    );
  };
  
  export default Loading;