

const Loading = () => {
  return (
    <div className="loading-container">
    <svg className="loading-spinner" viewBox="0 0 100 100">
        <path
            d="M 50 10 A 40 40 0 1 1 50 90"
            stroke="#2A616B"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
        >
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="1.3s"
                repeatCount="indefinite"
            />
        </path>
        <path
            d="M 50 90 A 40 40 0 1 1 50 10"
            stroke="#4285F4"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
        >
          <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="-360 50 50"
                dur="1.3s"
                repeatCount="indefinite"
            />
        </path>
    </svg>
    <div className="loading-text">Cargando...</div>
</div>
  );
};

export default Loading;
