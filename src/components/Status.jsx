export function Loading({ text = 'Loading…' }) {
  return (
    <div className="status" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export function ErrorBox({ message, onRetry }) {
  return (
    <div className="status error" role="alert">
      <p>⚠ {message}</p>
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function Empty({ text }) {
  return <div className="status">{text}</div>;
}
