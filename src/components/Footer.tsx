import { FiGithub } from "react-icons/fi";
import { Button } from "@components";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__byline">
        by{" "}
        <a
          href="https://sprioleau.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          San&apos;Quan Prioleau
        </a>
      </p>
      <Button
        icon={<FiGithub />}
        as="a"
        href="https://github.com/sprioleau/teeny.fun"
      >
        Star on GitHub
      </Button>
    </footer>
  );
}
