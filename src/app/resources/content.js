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
const toProject = ({ title, slug = '', summary = '', github = '', demoUrl = '', featured = false, badge = '', images = [] }) => {
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
        badge,
        images
    };
};

const work = {
    label: 'Projects',
    title: 'Projects',
    description: `Data science and machine learning projects by ${person.name}`,
    // How many cards show below the featured project before the "Show more" button;
    // the rest appear blurred behind it. Remove this line to show every project.
    visibleProjects: 4,
    // Listed in this order. `title` must match the title in data/master_profile.json exactly,
    // `slug` sets the page URL (/work/<slug>), and `summary` is the one-line description on the card.
    projects: [
        {
            title: 'ValAtlas: VALORANT Analytics & Win Prediction',
            slug: 'valatlas',
            featured: true,
            demoUrl: 'https://val-atlas.vercel.app/dashboard/demo',
            summary: 'A win-probability model that predicts VALORANT round outcomes every 5 seconds from players alive, spike state, team economy and engineered map-control features.',
            // Screenshots of the public demo, which shows one player under the stand-in name "ValorantGuy".
            // Match pages are left out on purpose: they show the other nine players' real names.
            images: [
                {
                    src: '/images/projects/valatlas/demo-overview.jpg',
                    width: 2160, height: 1350,
                    caption: 'Live demo: player profile and replay insights',
                    alt: 'Val-Atlas demo profile: rating, K/D, win rate, headshot and KAST figures, and replay insights such as crosshair placement and reaction time compared with the library average'
                },
                {
                    src: '/images/projects/valatlas/demo-round-win-probability.jpg',
                    width: 1848, height: 1155,
                    caption: 'Live demo: round win probability through a round',
                    alt: 'Val-Atlas round win probability chart: one team\'s chance of winning through a round, with kills, the spike plant and the defuse marked, and the share of the map each team holds underneath'
                },
                {
                    src: '/images/projects/valatlas/demo-valuable-space.jpg',
                    width: 2160, height: 1350,
                    caption: 'Live demo: valuable space on Sunset',
                    alt: 'Val-Atlas valuable space on Sunset: the change in round-win chance from holding each callout before the plant, with 95% intervals; B Site adds about 16 points'
                },
                {
                    src: '/images/projects/valatlas/demo-shooting.jpg',
                    width: 2160, height: 1350,
                    caption: 'Live demo: shooting, spray control and recoil',
                    alt: 'Val-Atlas shooting panel: true accuracy, first-bullet accuracy, accuracy by fire mode and range, spray control by bullet, and the Phantom\'s recoil against the player\'s pull'
                },
                {
                    src: '/images/projects/valatlas/demo-heatmap.jpg',
                    width: 2160, height: 1350,
                    caption: 'Live demo: map heatmap on Sunset',
                    alt: 'Val-Atlas heatmap of the player\'s time on Sunset, with time, kills, deaths and K/D by callout'
                },
            ]
        },
        {
            title: 'DefaultWatch: Mortgage Default Model with Reason Codes and Monitoring',
            slug: 'defaultwatch',
            github: 'https://github.com/YazenzM/DefaultWatch',
            demoUrl: 'https://default-tracker.streamlit.app/',
            summary: 'A mortgage default model on Freddie Mac loan-level data, with plain-language reasons for every decline and drift monitoring for each new vintage.',
            images: [
                {
                    src: '/images/projects/defaultwatch/dashboard-overview.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Overview',
                    alt: 'DefaultWatch Streamlit dashboard, Overview tab: out-of-time AUC, calibration error, PSI and approval rate, and a scorecard vs. gradient boosting comparison table'
                },
                {
                    src: '/images/projects/defaultwatch/dashboard-stress-test.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: 2019 stress test, relief vs. real default',
                    alt: 'DefaultWatch Streamlit dashboard, Stress test tab: predicted default against observed 90+ days late, with and without COVID relief, for 2017 and 2019'
                },
                {
                    src: '/images/projects/defaultwatch/dashboard-monitoring.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Monitoring, PSI by vintage',
                    alt: 'DefaultWatch Streamlit dashboard, Monitoring tab: score PSI by vintage and a heatmap of feature PSI by vintage, with debt-to-income alerts'
                },
                {
                    src: '/images/projects/defaultwatch/dashboard-reason-codes.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Reason codes',
                    alt: 'DefaultWatch Streamlit dashboard, Reason codes tab: how often each factor is cited for out-of-time declines and the faithfulness of the top reason'
                },
            ]
        },
        {
            title: 'LiftLab: Email Campaign A/B Test & Uplift Targeting',
            slug: 'liftlab',
            github: 'https://github.com/YazenzM/LiftLab',
            demoUrl: 'https://email-lab.streamlit.app/',
            summary: 'An email A/B test taken from readout to a cost-aware send rule, with pre-registered segment tests, cross-fitted uplift models and a rerun on 14 million Criteo users.',
            // Shown on the project page; files live in public/images/projects/<slug>/.
            // width and height are the file's pixel size, used to keep its shape while it loads.
            images: [
                {
                    src: '/images/projects/liftlab/dashboard-readout.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Readout tab',
                    alt: 'LiftLab Streamlit dashboard, Readout tab: headline lifts for the Mens email, the best policy at current costs, and visit, conversion and spend lift by email with confidence intervals'
                },
                {
                    src: '/images/projects/liftlab/dashboard-send-rule.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Send-rule simulator',
                    alt: 'LiftLab Streamlit dashboard, Send-rule simulator tab: sliders for cost per email and margin, the best policy with its contribution per 1,000 customers, and contribution by email cost for each policy'
                },
                {
                    src: '/images/projects/liftlab/results-summary.png',
                    width: 2070, height: 1624,
                    caption: 'One-page results summary',
                    alt: 'LiftLab results summary: lift by email with confidence intervals, contribution per 1,000 customers by cost per email, Qini curves for the Womens email, and Criteo uplift by predicted decile'
                },
                {
                    src: '/images/projects/liftlab/qini-curves.png',
                    width: 1644, height: 607,
                    caption: 'Qini curves: Mens and Womens email vs. no email',
                    alt: 'Qini curves for the Mens and Womens emails: T-learner, X-learner, visit-proxy X-learner and response model against random targeting'
                },
                {
                    src: '/images/projects/liftlab/cost-sweep.png',
                    width: 1661, height: 576,
                    caption: 'Contribution by cost per email, and the share the model rule emails',
                    alt: 'Contribution per 1,000 customers for each send policy as the cost per email rises from $0.01 to $0.30, and the share of customers the model rule emails'
                },
                {
                    src: '/images/projects/liftlab/criteo-qini.png',
                    width: 812, height: 607,
                    caption: 'Criteo Qini curves (test set, 4.2M users)',
                    alt: 'Qini curves on the Criteo test set of 4.2 million users: response model, X-learner, visit-proxy X-learner and T-learner against random targeting'
                },
            ]
        },
        {
            title: 'ShelfWise: Demand Forecasting & Inventory Optimization',
            slug: 'shelfwise',
            github: 'https://github.com/YazenzM/shelfwise',
            demoUrl: 'https://shelf-wise.streamlit.app/',
            summary: 'Walmart M5 sales forecasts turned into daily order quantities for 5,748 item-store series, with a linear program deciding what ships when truck space runs short.',
            images: [
                {
                    src: '/images/projects/shelfwise/dashboard-overview.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Overview',
                    alt: 'ShelfWise Streamlit dashboard, Overview page: forecast error, cost per day at a 90% target, cost of a 90% truck and the shadow price of truck space, with the four pipeline steps and results by service target'
                },
                {
                    src: '/images/projects/shelfwise/dashboard-forecasts.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Forecasts',
                    alt: 'ShelfWise Streamlit dashboard, Forecasts page: 28-day forecast error for LightGBM and three baselines, error by backtest window, and quantile calibration and pinball loss'
                },
                {
                    src: '/images/projects/shelfwise/dashboard-ordering-policy.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Ordering policy',
                    alt: 'ShelfWise Streamlit dashboard, Ordering policy page: cost per day, fill rate, units ordered and leftover cost for the quantile newsvendor against the simple reorder rule at a 90% service target'
                },
                {
                    src: '/images/projects/shelfwise/dashboard-truck-capacity.png',
                    width: 2160, height: 1350,
                    caption: 'Live dashboard: Truck capacity',
                    alt: 'ShelfWise Streamlit dashboard, Truck capacity page: what the capacity limit costs by truck size for three allocation methods, and the shadow price of truck space by weekday'
                },
            ]
        },
        {
            title: 'HCareLedger: Medicare Claims Data Mart & Cost Reporting',
            slug: 'hcareledger',
            github: 'https://github.com/YazenzM/HCareLedger',
            summary: 'A tested star schema over CMS\'s synthetic Medicare claims that reports PMPM, admissions per 1,000 and 30-day readmissions, delivered in Power BI and Excel.',
            images: [
                {
                    src: '/images/projects/hcareledger/powerbi-cost-trend.png',
                    width: 2200, height: 1278,
                    caption: 'Power BI dashboard: Cost Trend page',
                    alt: 'Power BI Cost Trend page: medical PMPM by month with a rolling 12-month line, PMPM by service type and year, and the top 5% share of spend'
                },
                {
                    src: '/images/projects/hcareledger/powerbi-utilization.png',
                    width: 2200, height: 1278,
                    caption: 'Power BI dashboard: Utilization page',
                    alt: 'Power BI Utilization page: inpatient admits per 1,000 by year, outpatient visits and professional claims per 1,000, and the top 10 diagnosis categories by medical paid'
                },
                {
                    src: '/images/projects/hcareledger/powerbi-readmissions.png',
                    width: 2200, height: 1278,
                    caption: 'Power BI dashboard: Readmissions page',
                    alt: 'Power BI Readmissions page: 30-day readmission rate by discharge year, by age band and by index admission type'
                },
            ]
        },
        // To add a project: put it in data/master_profile.json first, then add an entry here with a new slug.
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
