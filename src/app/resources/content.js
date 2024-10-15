import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Yaseen',
    lastName:  'Mohammed',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Data Science Engineer',
    avatar:    '/images/avtarrr.jpeg',
    location:  'America/Chicago',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
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
    subline: <>I'm Yaseen, a Data Science Engineer at <InlineCode>Zinzu</InlineCode>, Currently pursuing Masters in Business Analytics and Artificial Intelligence at The University of Texas at Dallas, I’m passionate about exploring the vast world of data, from machine learning models to SQL databases and data analytics dashboards.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
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
    intro: {
        display: true,
        title: 'Introduction',
        description: <>Yaseen Mohammed is a driven and versatile data scientist and software engineer with expertise in cloud infrastructure and machine learning. Currently pursuing a Masters in Business Analytics and Artificial Intelligence at The University of Texas at Dallas. He excels in delivering innovative solutions through collaborative teamwork, automation, and advanced data-driven technologies.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'Zinzu',
                timeframe: 'March 2024 - Present',
                role: 'Data Science Engineer',
                achievements: [
                    <>Created data infrastructure used by 70% of operational data utilizing Azure services in both SQL and NoSQL.</>,
                    <>Compiled research paper on geospatial analytic tooling to be developed on our SaaS data platform.</>,
                    <>Automated frontend/backend server maintenance, increasing operational efficiency by 60%</>,
                    <>Implemented gpt api into data analytic platform to allow for custom analytics based on users prompt.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images                    {                        src: '/images/projects/project-01/cover-01.jpg',                        alt: 'Once UI Project',                        width: 16,                        height: 9                    }                
                    ]            },
            {
                company: 'Autix Automotive',
                timeframe: 'August 2023 - December 2023',
                role: 'Data Scientist Intern',
                achievements: [
                    <>Developed predictive ML model to give estimates of modified cars with an accuracy of 96%. </>,
                    <>Applied natural language processing (NLP) with cost effective use of GPT API based token models to increase the dataset's predictive power by 30%, saving $80k in external software costs.</>
                ],
                images: [ ]
            },
            {
                company: 'Vital Synapses',
                timeframe: 'May 2023 – August 2023',
                role: 'Data Science Intern',
                achievements: [
                    <>Engineered a data pipeline to analyze healthcare insurance claims, building 10+ dashboards.</>,
                    <>Diagnosed lead times for 70% of insurance claims by using several statistical methods.</>
                ],
                images: [ ]
            },
            {
                company: 'Pricesenz',
                timeframe: 'May 2022 – August 2022',
                role: 'Research Analyst',
                achievements: [
                    <>Coordinated a team of 3 interns, researching $10k+ worth of BI tools providing KPI analysis.</>,
                    <>Created multiple KPI dashboards with PowerBI using 40 data points, allowing for accessible actionable insights.</>
                ],
                images: [ ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'M.S, Business Analytics & AI',
                timeframe: 'August 2024 - Present',
                description: <>The University of Texas at Dallas</>,
            },
            {
                name: 'B.S, Data Science',
                timeframe: 'August 2021 - December 2023',
                description: <>The University of Texas at Dallas</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Skills',
        skills: [
            {
                title: 'Certifications',
                description: <> AWS Certified Machine Learning | Microsoft Azure Data Scientist Associate</>,
                images: [   
                    //                 {                        src: '/images/projects/project-01/cover-02.jpg',                        alt: 'Project image',                        width: 16,                        height: 9                    },                    {                        src: '/images/projects/project-01/cover-03.jpg',                        alt: 'Project image',                        width: 16,                        height: 9                    },                
                    ]
            },
            {
                title: 'Analysis Tools',
                description: <>PowerBI | Tableau | MS Excel | RStudio | Scikit-learn</>,
                images: 
                [            
                    //        {                        src: '/images/projects/project-01/cover-04.jpg',                        alt: 'Project image',                        width: 16,                        height: 9                    },
                ]
            },
            {
                title: 'Data Tools',
                description: <>Spark | Hadoop | MySQL | AWS infrastructure | MongoDB | Azure infrastructure</>,
                images: [  ]
            },
            {
                title: 'Programming',
                description: <>SQL | Python | R | Scala | Java | C++ | HTML/CSS | JavaScript</>,
                images: [  ]
            },
            {
                title: 'Data Science',
                description: <>Machine Learning | Data Exploration | Feature Engineering | Data Transformation & Visualization | Recommender Systems | Natural Language Processing</>,
                images: [  ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about design and tech...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
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