import { getMessages, type Locale } from "@/lib/i18n";

const resources = [
  {
    href: "https://www.netacad.com/content/itn/1.0/courses/content/m11/en-US/assets/11.6.6-lab---calculate-ipv4-subnets.pdf",
    title: "ciscoStudyTitle",
    description: "ciscoStudyDescription",
  },
  {
    href: "https://www.practicalnetworking.net/stand-alone/subnetting-mastery/",
    title: "practicalStudyTitle",
    description: "practicalStudyDescription",
  },
  {
    href: "https://gaia.cs.umass.edu/kurose_ross/interactive/subnet_addressing.php/index.php",
    title: "umassStudyTitle",
    description: "umassStudyDescription",
  },
  {
    href: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/ipv4-subnet-masks-n10-009/",
    title: "messerStudyTitle",
    description: "messerStudyDescription",
  },
  {
    href: "https://www.w3schools.com/tools/tool_subnet_calculator.php",
    title: "w3StudyTitle",
    description: "w3StudyDescription",
  },
  {
    href: "https://www.geeksforgeeks.org/computer-networks/introduction-to-subnetting/",
    title: "geeksStudyTitle",
    description: "geeksStudyDescription",
  },
  {
    href: "https://www.tutorialspoint.com/ipv4/ipv4_subnetting.htm",
    title: "tutorialStudyTitle",
    description: "tutorialStudyDescription",
  },
  {
    href: "https://networklessons.com/subnetting",
    title: "networkLessonsTitle",
    description: "networkLessonsDescription",
  },
] as const;

export function StudyResources({ locale = "en" }: { locale?: Locale }) {
  const copy = getMessages(locale);

  return (
    <section className="mt-8 border-t border-border pt-5">
      <h2 className="text-xl font-semibold tracking-tight">{copy.studyResources}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.studyResourcesIntro}</p>
      <ul className="mt-4 space-y-4">
        {resources.map((resource) => (
          <li key={resource.href}>
            <a className="text-sm font-medium text-primary underline-offset-4 hover:underline" href={resource.href}>
              {copy[resource.title]}
            </a>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy[resource.description]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
