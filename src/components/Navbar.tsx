import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

const Navbar = () => {
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
                <Link to="/sign-in/$" className="btn-primary">
                    Sign In <LogIn size={16} />{" "}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
