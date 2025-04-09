import "./Button.css";

// buttons should have a consistent styling in theory lol, so component here.
// also good example for like. How to do this stuff in general
interface ButtonProps {
  text: String;
  // also should pass like handler func here, but this is fine for template
}

const Button = ({ text }: ButtonProps) => {
  return (
    <>
      <button>{text}</button>
    </>
  );
};

export default Button;
