import { Link } from "@tanstack/react-router";
import {
    ArrowBigUp,
    ArrowUpRight,
    Bookmark,
    Check,
    Copy,
    MessagesSquare,
} from "lucide-react";
import { useState } from "react";

const SkillCard = ({
    authorEmail,
    authorClerkId,
    category,
    createdAt,
    description,
    id,
    installCommand,
    slug,
    tags,
    title,
}: SkillRecord) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(installCommand);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
            // Optionally show user feedback for the error
        }
    };

    return (
        <article className="skill-card">
            <Link
                to="/skills"
                tabIndex={-1}
                aria-label={`Open ${title}`}
                className="overlay"
            />
            <div className="chrome">
                <div className="chrome-bar">
                    <div className="lights">
                        <div className="light red" />
                        <div className="light amber" />
                        <div className="light green" />
                    </div>

                    <div className="host">registry.sh</div>
                </div>
            </div>

            <div className="body">
                <div className="meta">
                    <div className="author">
                        <img
                            src={`/logo512.png`}
                            alt="Author Avatar"
                            className="avatar"
                        />
                        <div className="author-copy">
                            <p>{authorClerkId}</p>
                            <p>
                                {createdAt
                                    ? new Date(createdAt).toLocaleDateString()
                                    : "Date unknown"}
                            </p>
                        </div>
                    </div>
                    <p className="category">{category}</p>
                </div>

                <div className="summary">
                    <Link to="/skills" className="title-link">
                        <h3>{title}</h3>
                    </Link>

                    <p>{description}</p>
                </div>
                <div className="command">
                    <div className="command-copy">
                        <span>{">_"}</span>
                        <p>{installCommand}</p>
                    </div>
                    <button
                        className="copy"
                        onClick={handleCopy}
                        type="button"
                        aria-label={`Copy install command for ${title}`}
                    >
                        {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>

                <div className="footer">
                    <div className="stats">
                        <button
                            type="button"
                            className="upvote"
                            aria-label={`Upvote ${title}`}
                        >
                            <ArrowBigUp size={16} fill="currentColor" />
                            <span>{tags.length}</span>
                        </button>
                        <div className="comments">
                            <MessagesSquare size={14} />
                            <span>{authorEmail ? 1 : 0}</span>
                        </div>
                    </div>
                    <div className="actions">
                        <Link
                            to="/skills"
                            className="open"
                            title={`Open ${title}`}
                        >
                            <span>Open</span>
                            <ArrowUpRight size={14} />
                        </Link>

                        <button
                            type="button"
                            className="save"
                            aria-label={`Save ${title}`}
                        >
                            <Bookmark size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SkillCard;
