///<reference types="@figma/plugin-typings" />
interface ResumeElement {
  figmaId?: string; // 存储 Figma 元素 ID
  children?: { [key: string]: ResumeElement }; // 存储子元素
}

const resume = {
  elements: new Map(),
  $schema:
    "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: "Richard Hendriks",
    label: "Programmer",
    image: "",
    email: "richard.hendriks@mail.com",
    phone: "(912) 555-4321",
    url: "http://richardhendricks.example.com",
    summary:
      "Richard hails from Tulsa. He has earned degrees from the University of Oklahoma and Stanford. (Go Sooners and Cardinal!) Before starting Pied Piper, he worked for Hooli as a part time software developer. While his work focuses on applied information theory, mostly optimizing lossless compression schema of both the length-limited and adaptive variants, his non-work interests range widely, everything from quantum computing to chaos theory. He could tell you about it, but THAT would NOT be a “length-limited” conversation!",
    location: {
      address: "2712 Broadway St",
      postalCode: "CA 94115",
      city: "San Francisco",
      countryCode: "US",
      region: "California",
    },
    profiles: [
      {
        network: "Twitter",
        username: "neutralthoughts",
        url: "https://www.twitter.com",
      },
      {
        network: "SoundCloud",
        username: "dandymusicnl",
        url: "https://soundcloud.example.com/dandymusicnl",
      },
    ],
  },
  work: [
    {
      name: "Pied Piper",
      location: "Palo Alto, CA",
      description: "Awesome compression company",
      position: "CEO/President",
      url: "http://piedpiper.example.com",
      startDate: "2013-12-01",
      endDate: "2014-12-01",
      summary:
        "Pied Piper is a multi-platform technology based on a proprietary universal compression algorithm that has consistently fielded high Weisman Scores™ that are not merely competitive, but approach the theoretical limit of lossless compression.",
      highlights: [
        "Build an algorithm for artist to detect if their music was violating copy right infringement laws",
        "Successfully won Techcrunch Disrupt",
        "Optimized an algorithm that holds the current world record for Weisman Scores",
      ],
    },
  ],
  volunteer: [
    {
      organization: "CoderDojo",
      position: "Teacher",
      url: "http://coderdojo.example.com/",
      startDate: "2012-01-01",
      endDate: "2013-01-01",
      summary: "Global movement of free coding clubs for young people.",
      highlights: ["Awarded 'Teacher of the Month'"],
    },
  ],
  education: [
    {
      institution: "University of Oklahoma",
      url: "https://www.ou.edu/",
      area: "Information Technology",
      studyType: "Bachelor",
      startDate: "2011-06-01",
      endDate: "2014-01-01",
      score: "4.0",
      courses: ["DB1101 - Basic SQL", "CS2011 - Java Introduction"],
    },
  ],
  awards: [
    {
      title: "Digital Compression Pioneer Award",
      date: "2014-11-01",
      awarder: "Techcrunch",
      summary: "There is no spoon.",
    },
  ],
  publications: [
    {
      name: "Video compression for 3d media",
      publisher: "Hooli",
      releaseDate: "2014-10-01",
      url: "http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)",
      summary:
        "Innovative middle-out compression algorithm that changes the way we store data.",
    },
  ],
  skills: [
    {
      name: "Web Development",
      level: "Master",
      keywords: ["HTML", "CSS", "Javascript"],
    },
    {
      name: "Compression",
      level: "Master",
      keywords: ["Mpeg", "MP4", "GIF"],
    },
  ],
  languages: [
    {
      language: "English",
      fluency: "Native speaker",
    },
  ],
  interests: [
    {
      name: "Wildlife",
      keywords: ["Ferrets", "Unicorns"],
    },
  ],
  references: [
    {
      name: "Erlich Bachman",
      reference:
        "It is my pleasure to recommend Richard, his performance working as a consultant for Main St. Company proved that he will be a valuable addition to any company.",
    },
  ],
  projects: [
    {
      name: "Miss Direction",
      description: "A mapping engine that misguides you",
      highlights: [
        "Won award at AIHacks 2016",
        "Built by all women team of newbie programmers",
        "Using modern technologies such as GoogleMaps, Chrome Extension and Javascript",
      ],
      keywords: ["GoogleMaps", "Chrome Extension", "Javascript"],
      startDate: "2016-08-24",
      endDate: "2016-08-24",
      url: "http://missdirection.example.com",
      roles: ["Team lead", "Designer"],
      entity: "Smoogle",
      type: "application",
    },
  ],
  meta: {
    canonical:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/sample.resume.json",
    version: "v1.0.0",
    lastModified: "2017-12-24T15:53:00",
  },
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 350, height: 450, themeColors: true });
const PAGE_WIDTH = 8.5 * 96; // Standard US Letter size width in pixels
const PAGE_HEIGHT = 11 * 96; // Standard US Letter size height in pixels

function createNewPage(pageNumber, xPosition) {
  const page = figma.createFrame();
  page.resize(PAGE_WIDTH, PAGE_HEIGHT);
  page.x = xPosition;
  page.y = 0;
  page.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.name = `Resume Page ${pageNumber}`;
  return page;
}
// 定义基础样式常量
const STYLES = {
  padding: 40,
  sectionGap: 30,
  itemGap: 20,
  titleSize: 24,
  subtitleSize: 18,
  textSize: 14,
  lineHeight: 1.5,
};

// 创建文本样式
function createText(content: string, size: number, bold: boolean = false) {
  const text = figma.createText();
  text.fontName = { family: "Inter", style: bold ? "Bold" : "Regular" };
  text.fontSize = size;
  text.characters = content;
  return text;
}

function createItemFrame() {
  const frame = figma.createFrame();
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 8;
  frame.fills = [];
  frame.layoutAlign = "STRETCH";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  return frame;
}

function renderDescription(parent: FrameNode, text: string) {
  const description = createText(text, STYLES.textSize);
  description.textAutoResize = "HEIGHT";
  description.layoutAlign = "STRETCH";
  parent.appendChild(description);
  return description;
}

function renderPeriod(parent: FrameNode, startDate: string, endDate: string) {
  const period = createText(`${startDate} - ${endDate}`, STYLES.textSize);
  period.textAutoResize = "HEIGHT";
  period.layoutAlign = "STRETCH";
  parent.appendChild(period);
  return period;
}

function renderHighlights(
  parent: FrameNode,
  highlights: string[],
  section?: string[],
  subSection?: string
) {
  if (!highlights.length) return;

  const highlightsFrame = createItemFrame();

  highlightsFrame.name = "Highlights";
  highlightsFrame.itemSpacing = 4;
  if (section && section.length)
    recordElementId(section, highlightsFrame, subSection);
  highlights.forEach((highlight, index) => {
    const bulletPoint = createText(`• ${highlight}`, STYLES.textSize);

    if (section && section.length && subSection) {
      recordElementId([...section, subSection], bulletPoint, `${index}`);
    }
    bulletPoint.textAutoResize = "HEIGHT";
    bulletPoint.layoutAlign = "STRETCH";
    highlightsFrame.appendChild(bulletPoint);
  });

  parent.appendChild(highlightsFrame);

  return highlightsFrame;
}
// 创建通用的渲染函数
function createSectionContainer(name: string) {
  const container = figma.createFrame();

  container.name = name;
  container.layoutMode = "VERTICAL";
  container.itemSpacing = STYLES.itemGap;
  container.fills = [];
  container.layoutAlign = "STRETCH";
  container.primaryAxisSizingMode = "AUTO";
  container.counterAxisSizingMode = "AUTO";

  return container;
}
// 渲染基本信息部分
async function renderBasicInfo(
  parent: FrameNode,
  basics: typeof resume.basics
) {
  const container = figma.createFrame();

  container.name = "Basic Info";
  container.layoutMode = "VERTICAL";
  container.itemSpacing = STYLES.itemGap;
  container.fills = [];
  container.layoutAlign = "STRETCH";
  container.primaryAxisSizingMode = "AUTO";
  container.counterAxisSizingMode = "AUTO";

  const name = createText(basics.name, STYLES.titleSize, true);
  const title = createText(basics.label, STYLES.subtitleSize);
  const summary = createText(basics.summary, STYLES.textSize);
  const contact = createText(
    `${basics.email} | ${basics.phone} | ${basics.location.city}, ${basics.location.region}`,
    STYLES.textSize
  );

  // 设置文本自动换行
  [name, title, summary, contact].forEach((text) => {
    text.textAutoResize = "HEIGHT";
    text.layoutAlign = "STRETCH";
  });

  container.appendChild(name);
  container.appendChild(title);
  container.appendChild(contact);
  container.appendChild(summary);

  // 添加社交档案
  if (basics.profiles.length > 0) {
    const profilesText = createText(
      basics.profiles.map((p) => `${p.network}: ${p.username}`).join(" | "),
      STYLES.textSize
    );
    profilesText.textAutoResize = "HEIGHT";
    profilesText.layoutAlign = "STRETCH";
    container.appendChild(profilesText);
  }
  recordElementId("basics", container);
  recordElementId("basics", name, "name");
  recordElementId("basics", title, "label");
  recordElementId("basics", summary, "summary");
  recordElementId("basics", contact, "contact");
  parent.appendChild(container);
  return container;
}

// 渲染工作经验部分
async function renderWorkExperience(
  parent: FrameNode,
  work: typeof resume.work
) {
  const container = createSectionContainer("Work Experience");
  const title = createText("Work Experience", STYLES.subtitleSize, true);
  container.appendChild(title);
  recordElementId("work", container);
  for (const [index, job] of work.entries()) {
    const jobFrame = createItemFrame();
    recordElementId("work", jobFrame, `job_${index}`);

    const jobTitle = createText(
      `${job.position} at ${job.name}`,
      STYLES.textSize,
      true
    );
    recordElementId("work", jobTitle, `job_${index}_title`);
    jobTitle.textAutoResize = "HEIGHT";
    jobTitle.layoutAlign = "STRETCH";

    jobFrame.appendChild(jobTitle);
    const period = renderPeriod(jobFrame, job.startDate, job.endDate);
    const description = renderDescription(jobFrame, job.summary);
    const highlights = renderHighlights(
      jobFrame,
      job.highlights,
      ["work"],
      `job_${index}_highlights`
    );

    recordElementId("work", period, `job_${index}_period`);
    recordElementId("work", description, `job_${index}_description`);
    // if (highlights)
    //   recordElementId("work", highlights, `job_${index}_highlights`);
    container.appendChild(jobFrame);
  }

  parent.appendChild(container);
  return container;
}

// 渲染教育经历部分
async function renderEducation(
  parent: FrameNode,
  education: typeof resume.education
) {
  const container = figma.createFrame();
  container.name = "Education";
  container.layoutMode = "VERTICAL";
  container.itemSpacing = STYLES.itemGap;
  container.fills = [];
  container.layoutAlign = "STRETCH";
  container.primaryAxisSizingMode = "AUTO";
  container.counterAxisSizingMode = "AUTO";

  const title = createText("Education", STYLES.subtitleSize, true);
  container.appendChild(title);

  for (const edu of education) {
    const eduFrame = figma.createFrame();
    eduFrame.layoutMode = "VERTICAL";
    eduFrame.itemSpacing = 8;
    eduFrame.fills = [];
    eduFrame.layoutAlign = "STRETCH";
    eduFrame.primaryAxisSizingMode = "AUTO";
    eduFrame.counterAxisSizingMode = "AUTO";

    const schoolTitle = createText(
      `${edu.studyType} in ${edu.area}`,
      STYLES.textSize,
      true
    );
    const school = createText(edu.institution, STYLES.textSize);
    const period = createText(
      `${edu.startDate} - ${edu.endDate} | GPA: ${edu.score}`,
      STYLES.textSize
    );
    const courses = createText(
      `Courses: ${edu.courses.join(", ")}`,
      STYLES.textSize
    );

    [schoolTitle, school, period, courses].forEach((text) => {
      text.textAutoResize = "HEIGHT";
      text.layoutAlign = "STRETCH";
    });

    eduFrame.appendChild(schoolTitle);
    eduFrame.appendChild(school);
    eduFrame.appendChild(period);
    eduFrame.appendChild(courses);

    container.appendChild(eduFrame);
  }

  parent.appendChild(container);
  return container;
}

// 渲染技能部分
async function renderSkills(parent: FrameNode, skills: typeof resume.skills) {
  const container = figma.createFrame();
  container.name = "Skills";
  container.layoutMode = "VERTICAL";
  container.itemSpacing = STYLES.itemGap;
  container.fills = [];
  container.layoutAlign = "STRETCH";
  container.primaryAxisSizingMode = "AUTO";
  container.counterAxisSizingMode = "AUTO";

  const title = createText("Skills", STYLES.subtitleSize, true);
  container.appendChild(title);

  for (const skill of skills) {
    const skillFrame = figma.createFrame();
    skillFrame.layoutMode = "VERTICAL";
    skillFrame.itemSpacing = 4;
    skillFrame.fills = [];
    skillFrame.layoutAlign = "STRETCH";
    skillFrame.primaryAxisSizingMode = "AUTO";
    skillFrame.counterAxisSizingMode = "AUTO";

    const skillTitle = createText(
      `${skill.name} (${skill.level})`,
      STYLES.textSize,
      true
    );
    const keywords = createText(skill.keywords.join(" • "), STYLES.textSize);

    [skillTitle, keywords].forEach((text) => {
      text.textAutoResize = "HEIGHT";
      text.layoutAlign = "STRETCH";
    });

    skillFrame.appendChild(skillTitle);
    skillFrame.appendChild(keywords);

    container.appendChild(skillFrame);
  }

  parent.appendChild(container);
  return container;
}

// 渲染项目经历部分
async function renderProjects(
  parent: FrameNode,
  projects: typeof resume.projects
) {
  const container = createSectionContainer("Projects");
  const title = createText("Projects", STYLES.subtitleSize, true);
  container.appendChild(title);

  for (const project of projects) {
    const projectFrame = createItemFrame();

    // 项目标题
    const projectTitle = createText(
      `${project.name} - ${project.type}`,
      STYLES.textSize,
      true
    );
    projectTitle.textAutoResize = "HEIGHT";
    projectTitle.layoutAlign = "STRETCH";
    projectFrame.appendChild(projectTitle);

    // 项目时间段
    renderPeriod(projectFrame, project.startDate, project.endDate);

    // 项目描述
    renderDescription(projectFrame, project.description);

    // 项目角色
    if (project.roles.length > 0) {
      const roles = createText(
        `Role: ${project.roles.join(" & ")}`,
        STYLES.textSize
      );
      roles.textAutoResize = "HEIGHT";
      roles.layoutAlign = "STRETCH";
      projectFrame.appendChild(roles);
    }

    // 项目亮点
    renderHighlights(projectFrame, project.highlights);

    // 技术关键词
    if (project.keywords.length > 0) {
      const techStack = createText(
        `Technologies: ${project.keywords.join(" • ")}`,
        STYLES.textSize
      );
      techStack.textAutoResize = "HEIGHT";
      techStack.layoutAlign = "STRETCH";
      projectFrame.appendChild(techStack);
    }

    container.appendChild(projectFrame);
  }

  parent.appendChild(container);
  return container;
}

// 在 renderResume 函数中添加新的渲染部分
async function renderResume() {
  const pageNumber = 1;
  let currentPage = createNewPage(pageNumber, 0);
  console.log("render resume!!!!");
  // 设置页面布局
  currentPage.layoutMode = "VERTICAL";
  currentPage.paddingLeft = STYLES.padding;
  currentPage.paddingRight = STYLES.padding;
  currentPage.paddingTop = STYLES.padding;
  currentPage.paddingBottom = STYLES.padding;
  currentPage.itemSpacing = STYLES.sectionGap;

  // 渲染各个部分
  await renderBasicInfo(currentPage, resume.basics);
  await renderWorkExperience(currentPage, resume.work);
  await renderEducation(currentPage, resume.education);
  await renderSkills(currentPage, resume.skills);
  await renderProjects(currentPage, resume.projects); // 添加项目渲染

  // 自动调整布局
  figma.viewport.scrollAndZoomIntoView([currentPage]);
}

// 修改消息处理函数
figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type === "create-resume") {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await renderResume();
  }

  // figma.closePlugin();
};

// 添加选择监听
figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 1) {
    const selectedElement = selection[0];
    const elementId = selectedElement.id;

    // 查找选中元素对应的数据
    const elementData = findResumeDataByFigmaId(elementId);
    if (elementData) {
      const { section, subSection, data } = elementData;
      if (subSection) {
        figma.notify(`Selected: ${section} > ${subSection}`);
        console.log("Selected data:", data);
      } else {
        figma.notify(`Selected section: ${section}`);
        console.log("Selected section data:", data);
      }
    }
  }
});

function recordElementId(
  section: string | string[],
  element: BaseNode,
  subSection?: string
) {
  const sectionPath = Array.isArray(section) ? section : [section];
  let path = sectionPath.join("_");

  if (subSection) {
    path = `${path}_${subSection}`;
  }

  resume.elements.set(element.id, path);
}

// ... rest of the code remains the same until findResumeDataByFigmaId function

// Find resume data by Figma ID
function findResumeDataByFigmaId(figmaId: string) {
  const path = resume.elements.get(figmaId);
  let _a: any[] = [];
  for (const [key, value] of resume.elements.entries()) {
    _a.push([key, value]);
  }
  console.log(_a);
  if (!path) return null;

  const pathParts = path.split("_");
  const section = pathParts[0];
  const sectionData = resume[section as keyof typeof resume];

  if (pathParts.length === 1) {
    return {
      section,
      data: sectionData,
    };
  }

  // Handle nested data
  let specificData: any = sectionData;
  if (Array.isArray(sectionData)) {
    const index = parseInt(pathParts[2]); // For paths like work_job_0
    specificData = sectionData[index];
  } else if (typeof sectionData === "object") {
    const subSection = pathParts[1];
    specificData = (sectionData as any)[subSection];
  }

  return {
    section,
    subSection: pathParts.slice(1).join("_"),
    data: specificData,
  };
}
