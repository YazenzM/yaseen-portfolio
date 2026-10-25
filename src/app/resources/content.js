import { InlineCode } from "@/once-ui/components";
// Education, skills, experience, projects and additional info come from data/portfolio_resume.json.
// Project pages use the full bullet lists in data/master_profile.json.
// Edit those files to update the site; the components don't need to change.
import resume from './data/portfolio_resume.json';
import profile from './data/master_profile.json';

const person = {
    firstName: 'Yaseen',
    lastName:  'Mohammed',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      resume.basics.title,
    avatar:    '/images/avtarrr.jpeg',
    location:  'America/Chicago',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    city:      resume.basics.location,   // Shown next to the globe icon on the About page
    languages: ['English']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/YazenzM',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/yaseenam',
    },
    {
        name: 'X',
        icon: 'x',
        link: '',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:Yaseenam3@gmail.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Data Scientist</>,
    subline: <>I&apos;m Yaseen, a Data Science Engineer at <InlineCode>Zinzu</InlineCode>, Currently pursuing Masters in Business Analytics and Artificial Intelligence at The University of Texas at Dallas, I’m passionate about exploring the vast world of data, from machine learning models to SQL databases and data analytics dashboards.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.city}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: false,
        link: 'https://cal.com'
    },
    resume: {
        display: true,
        label: 'Download resume (PDF)',
        file: '/Yaseen_Mohammed_Resume.pdf' // Put the PDF in /public. The button stays hidden until the file exists.
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>Yaseen Mohammed is a driven and versatile data scientist and software engineer with expertise in cloud infrastructure and machine learning. Currently pursuing a Masters in Business Analytics and Artificial Intelligence at The University of Texas at Dallas. He excels in delivering innovative solutions through collaborative teamwork, automation, and advanced data-driven technologies.</>
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Education',
        institutions: resume.education.map((item) => ({
            name: item.degree,
            timeframe: item.date,
            description: item.school,
        }))
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Skills',
        skills: resume.skills.map((skill) => ({
            title: skill.category,
            description: skill.details,
            images: []
        }))
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Experience',
        experiences: resume.experience.map((job) => ({
            company: job.company,
            timeframe: job.date,
            role: job.title,
            achievements: job.bullets,
            images: []
        }))
    },
    projects: {
        display: true, // set to false to hide this section
        title: 'Projects',
        items: resume.projects.map((project) => ({
            title: project.title,
            timeframe: project.date,
            stack: project.subtitle,
            bullets: project.bullets
        }))
    },
    additional: {
        display: true, // set to false to hide this section
        title: 'Additional Information',
        description: resume.additional_info
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about design and tech...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

// Looks up a project in data/master_profile.json by its exact title and adds the site-only settings
const toProject = ({ title, slug = '', summary = '', github = '', demoUrl = '', featured = false, badge = '' }) => {
    const project = profile.projects.find((item) => item.title === title);
    if (!project) {
        throw new Error(`"${title}" is listed in content.js but not found in data/master_profile.json`);
    }
    return {
        slug,
        title: project.title,
        date: project.date,
        // Some projects keep their GitHub link in `subtitle`; only show it as the stack when it isn't a link
        stack: /github\.com\//.test(project.subtitle) ? '' : project.subtitle,
        summary,
        bullets: project.bullets,
        github,
        demoUrl,
        featured,
        badge
    };
};

const work = {
    label: 'Projects',
    title: 'Projects',
    description: `Data science and machine learning projects by ${person.name}`,
    // Listed in this order. `title` must match the title in data/master_profile.json exactly,
    // `slug` sets the page URL (/work/<slug>), and `summary` is the one-line description on the card.
    projects: [
        {
            title: 'ValAtlas: VALORANT Analytics & Win Prediction',
            slug: 'valatlas',
            featured: true,
            demoUrl: '', // The "Live demo" button appears once this is set (waiting on Riot approval)
            summary: 'A win-probability model that predicts VALORANT round outcomes every 5 seconds from players alive, spike state, team economy and engineered map-control features.'
        },
        {
            title: 'StockBot: Quantitative Trading Research Platform',
            slug: 'stockbot',
            summary: 'About 140 pre-registered trading strategy tests across currencies, US equities, emerging markets and crypto, each with walk-forward training, realistic trading costs and an untouched holdout period.'
        },
        {
            title: 'AI Resume Tailoring Application',
            slug: 'resume-tailor',
            github: 'https://github.com/YazenzM/resume-tailor',
            summary: 'A Python and Streamlit app that rewrites resume bullet points against a pasted job description, with interchangeable Anthropic Claude and Google Gemini backends.'
        },
        {
            title: 'Fantasy Basketball Roster Assistant',
            slug: 'fantasy-basketball',
            github: 'https://github.com/YazenzM/fantasy-bball-gm',
            summary: 'A fantasy basketball assistant that grounds roster advice in current reporting rather than static rankings, using a RAG pipeline over social media coverage of players.'
        },
        {
            title: 'Brain Tumor MRI Classification',
            slug: 'brain-tumor-mri',
            github: 'https://github.com/YazenzM/Tumor-Image-classification-with-ML-Neural-Net',
            summary: 'Two convolutional neural networks built and compared in TensorFlow/Keras for four-class brain tumor classification over 2,870 labelled MRI images.'
        },
    ].map(toProject),
    competitions: {
        display: true, // set to false to hide this section
        title: 'Competitions',
        items: [
            { title: 'ASA DataFest 2023, SMU', badge: '3rd place' },
            { title: 'Rice Health Policy Hackathon, Houston, TX' },
        ].map(toProject)
    }
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-03.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-04.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-05.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-06.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-07.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-08.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-09.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-10.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-11.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-12.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-13.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-14.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };
