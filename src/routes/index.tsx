import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { createServerFn } from "@tanstack/react-start";
import { getSkills } from "#/dataconnect-generated";
import { dataConnect } from "#/lib/firebase";



const getSkillsFn = createServerFn({ method: "GET" }).handler(async () => {
    try {
        const { data } = await getSkills(dataConnect, {
            searchTerm: "",
            limit: 10,
        });

        return data.skills;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export const Route = createFileRoute("/")({ component: Home, loader:() => getSkillsFn() });



function Home() {
    const posthog = usePostHog();

	const skills = Route.useLoaderData();

    return (
        <main id="home">
            <section className="hero">
                <div className="copy">
                    <h1>
                        Registry For <br />
                        <span className="text-gradient">
                            Agentic Intelligence
                        </span>
                    </h1>

                    <p>
                        A high performance platform that connects skilled
                        individuals with those seeking to learn. Share your
                        expertise, discover new skills, and grow together in our
                        vibrant community.
                    </p>
                </div>

                <div className="actions">
                    <Link
                        to="/skills"
                        className="btn-primary"
                        onClick={() =>
                            posthog.capture("explore_skills_clicked")
                        }
                    >
                        <Terminal size={18} />
                        <span>Explore Skills</span>
                    </Link>
                    <Link
                        to="/skills/new"
                        className="btn-secondary"
                        onClick={() => posthog.capture("publish_skill_clicked")}
                    >
                        <Terminal size={18} />
                        <span>Publish Skill</span>
                    </Link>
                </div>
            </section>

            <section className="latest">
                <div className="space-y-2">
                    <h2>
                        Recently Published{" "}
                        <span className="text-gradient">Skills</span>
                    </h2>
                    <p>Latest Skills</p>
                </div>

                <div>
                    {skills.length === 0 ? (
                        <p>No skills published yet.</p>
                    ) : (
                        <div className="skills-grid">
                            {skills.map((skill) => (
                                <SkillCard key={skill.id} {...skill} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
