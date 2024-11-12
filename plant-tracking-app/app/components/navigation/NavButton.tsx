interface NavButtonProps {
  target: string;
  text: string;
}

export default function NavButton(props: NavButtonProps) {
  return (
    <button
      className="nav-button"
      onClick={() => {
        window.location.href = props.target;
      }}
    >
      {props.text}
    </button>
  );
}
