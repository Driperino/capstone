export default function LoginButton() {
  //put api fet here?
  return (
    <button
      onClick={() => {
        // Assuming you have a state management solution to set loggedIn
        // For example, using React's useState:
        // setLoggedIn(true);
        console.log("Log in button clicked");
      }}
    >
      Log In
    </button>
  );
}
