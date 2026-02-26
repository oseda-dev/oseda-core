export interface AuthorData {
    id: number;
    name: string;
    avatar: string;
    title: string;
    bio: string;
}


export const CORE_MAINTAINERS: AuthorData[] = [
    {
        id: 0,
        name: "Reese Hatfield",
        avatar: "https://avatars.githubusercontent.com/u/89809693?v=4",
        title: "Project Lead",
        bio: `Computer Science educator and open-source advocate currently teaching
at Wright State University.

I build and maintain tools that prioritize accessibility and maintainability.
I help students hone their development skills and understand the systems they
rely on rather than treating them as black boxes.

Passionate about empowering students to learn by doing via the power of
open-source software to build a better future for education.`,
    },
    {
        id: 1,
        name: "Rose Taylor",
        avatar: "https://avatars.githubusercontent.com/u/150863936?v=4",
        title: "Co-Lead Frontend Dev",
        bio: `Computer Science student and Lab Lead at Wright State University currently helping new computer science students understand java and programming as a whole. When I'm not working on my school assignments, I am working on my current projects such as Literoot; a markdown editor similar to Obsidian made in rust and more rust (Dioxus)! I am an advocate for having various cannon arch moments.`,
    },
    {
        id: 2,
        name: "Blake Payne",
        avatar: "https://avatars.githubusercontent.com/u/56892670?v=4",
        title: "Title",

        bio: `Bio for Blakers`,
    },
    {
        id: 3,
        name: "Jon Wasky",
        avatar: "https://avatars.githubusercontent.com/u/111833121?v=4",
        title: "Co-Lead Frontend Dev",
        bio: `Computer Science student and Scientific Programmer at Wright State University working to assist researchers move from R&D tools to usable software.
When I’m not in the lab or TA-ing for CS-1181, I’m building anything from indie games in Unity3D to my current project, AVITOS: a dedicated VOIP/Messaging app. I’m a huge believer in the React ecosystem and love turning complicated problems into code.`,
    },
    {
        id: 4,
        name: "Emily Miller",
        avatar: "https://avatars.githubusercontent.com/u/132691956?v=4",
        title: "Title",
        bio: `Bio for Emily`,
    },
];
