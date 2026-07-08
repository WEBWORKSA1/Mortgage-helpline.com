export default function PulseLine() {
  return (
    <div className="pulse-wrap" aria-hidden="true">
      <svg className="pulse-svg" viewBox="0 0 1080 56" preserveAspectRatio="none">
        <path
          className="pulse-path"
          d="M0,28 L340,28 L368,28 L384,8 L402,48 L420,16 L436,28 L1080,28"
        />
      </svg>
    </div>
  );
}
