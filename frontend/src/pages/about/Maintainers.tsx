export interface AuthorData {
    id: number;
    name: string;
    avatar: string;
    bio: string;
}


export const CORE_MAINTAINERS: AuthorData[] = [
    {
        id: 0,
        name: "Reese Hatfield",
        avatar: "https://avatars.githubusercontent.com/u/89809693?v=4",
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
        bio: `Bio for Rose`,
    },
    {
        id: 2,
        name: "Blake Payne",
        avatar: "https://avatars.githubusercontent.com/u/56892670?v=4",
        bio: `Bio for Blakers`,
    },
    {
        id: 3,
        name: "Jon Wasky",
        avatar: "https://avatars.githubusercontent.com/u/111833121?v=4",
        bio: `Bio for Wamski`,
    },
    {
        id: 4,
        name: "Emily Miller",
        avatar: "https://avatars.githubusercontent.com/u/132691956?v=4",
        bio: `Bio for Emily`,
    },
];
