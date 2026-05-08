interface SkillRecord {
    id: string;
    title: string;
    description: string;
    slug: string;
    category: string;
    tags: string[];
    installCommand: string;
    createdAt: string | null;
    authorClerkId: string | null;
    authorEmail: string | null;
}
