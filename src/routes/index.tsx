import SkillCard from "#/components/SkillCard";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { dummySkills } from "#/lib/dummy-skills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
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
                    <Link to="/skills" className="btn-primary">
                        <Terminal size={18} />
                        <span>Explore Skills</span>
                    </Link>
                    <Link to="/skills/new" className="btn-secondary">
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
                    {dummySkills.length === 0 ? (
                        <p>No skills published yet.</p>
                    ) : (
                        <div className="skills-grid">
                            {dummySkills.map((skill) => (
                                <SkillCard key={skill.id} {...skill} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
