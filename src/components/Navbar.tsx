import { Show, UserButton } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

const Navbar = () => {
	const posthog = usePostHog();

	return (
		<nav className="navbar">
			<div className="brand">
				<div className="mark">
					<div className="glyph" />
				</div>
				<Link to="/">
					<span>Skillex</span>
				</Link>
			</div>
			<div className="actions">
				<Show when="signed-in">
					<UserButton />
				</Show>
				<Show when="signed-out">
					<Link
						to="/sign-in/$"
						className="btn-primary"
						onClick={() => posthog.capture("navbar_sign_in_clicked")}
					>
						Sign In <LogIn size={16} />{" "}
					</Link>
				</Show>
			</div>
		</nav>
	);
};

export default Navbar;
