import type { GetSkillsData } from "#/dataconnect-generated";
import { usePostHog } from "@posthog/react";
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

type SkillCardProps = GetSkillsData["skills"][number];

const SkillCard = ({
	
	createdAt,
	description,
	id,
	installCommand,
	author,
	tags,
	title,
}: SkillCardProps) => {
	const [copySuccess, setCopySuccess] = useState(false);
	const posthog = usePostHog();

	const category = tags[0] ?? "General";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(installCommand);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
			posthog.capture("skill_install_command_copied", {
				skill_id: id,
				skill_title: title,
				skill_category: category,
				install_command: installCommand,
			});
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
			posthog.captureException(error);
		}
	};

	const handleUpvote = () => {
		posthog.capture("skill_upvoted", {
			skill_id: id,
			skill_title: title,
	
			skill_category: category,
		});
	};

	const handleBookmark = () => {
		posthog.capture("skill_bookmarked", {
			skill_id: id,
			skill_title: title,
			skill_category: category,
		});
	};

	const handleOpen = () => {
		posthog.capture("skill_card_opened", {
			skill_id: id,
			skill_title: title,
			skill_category: category,
		});
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
						<img src={author.imageUrl || ""} alt="Author Avatar" className="avatar" />
						<div className="author-copy">
							<p>{author.username}</p>
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
						type="button"
						className="copy"
						onClick={handleCopy}
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
							onClick={handleUpvote}
						>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>{tags.length}</span>
						</button>
						<div className="comments">
							<MessagesSquare size={14} />
							<span>{author.email ? 1 : 0}</span>
						</div>
					</div>
					<div className="actions">
						<Link
							to="/skills"
							className="open"
							title={`Open ${title}`}
							onClick={handleOpen}
						>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>

						<button
							type="button"
							className="save"
							aria-label={`Save ${title}`}
							onClick={handleBookmark}
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
