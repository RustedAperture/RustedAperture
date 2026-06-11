import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

export default function ResumePage() {
  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col">
      <Card className="min-h-[600px] w-full">
        <CardHeader>
          <CardTitle>Résumé</CardTitle>
          <CardDescription>
            A detailed look at my experience and qualifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Thunder Bay, Ontario</span>
              <span>•</span>
              <a
                href="mailto:cam.avarley@gmail.com"
                className="hover:text-primary transition-colors"
              >
                cam.avarley@gmail.com
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Results-oriented Full Stack Developer and technical operations specialist with a proven track record of success in end-to-end web application development and infrastructure automation. Specializes in building robust solutions using Java, TypeScript, and AI-assisted development workflows. Brings extensive experience in cross-functional collaboration, from establishing CI/CD pipelines and managing Terraform environments to leading high-profile technical event operations. Recognized for a strong work ethic, adaptability, and a commitment to continuous improvement.
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold tracking-tight">Skills</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Languages</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">HTML</Badge>
                  <Badge variant="secondary">CSS</Badge>
                  <Badge variant="secondary">Javascript</Badge>
                  <Badge variant="secondary">Typescript</Badge>
                  <Badge variant="secondary">Java</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Tools</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Agentic Development</Badge>
                  <Badge variant="secondary">AI-Assisted Development</Badge>
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">Jenkins</Badge>
                  <Badge variant="secondary">Terraform</Badge>
                  <Badge variant="secondary">Postman</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Platforms</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Github</Badge>
                  <Badge variant="secondary">Bitbucket</Badge>
                  <Badge variant="secondary">GCP</Badge>
                  <Badge variant="secondary">Monday</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold tracking-tight">Work Experience</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Junior Fullstack Developer</h4>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">Feb 2025 - Present</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">momoGood (formerly Givergy)</span>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Full Stack Developer building end-to-end applications with Java and TypeScript. I specialize in resolving complex bugs and building out new features, utilizing Claude Code to navigate codebases quickly and ensure my solutions are robust and well-tested.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                  <li>Shipped multiple high-impact, user-facing features.</li>
                  <li>Built GitHub CI/CD pipelines, driving the engineering team towards automated workflows.</li>
                  <li>Assisted with managing and provisioning the Terraform infrastructure environment.</li>
                  <li>Selected to participate in the interview and hiring process for the Senior Project Manager following the company acquisition.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Event and Product Support Specialist</h4>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">June 2022 - Feb 2025</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Givergy</span>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Event delivery and support for North American on-site staff, ensuring a smooth event process. Platform quality assurance through testing and bug coordination with the development team.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                  <li>Managed the internal Learning Management System (LMS) and facilitated training for client-facing staff across two external partner agencies.</li>
                  <li>Coordinated the logistics and delivery of technology hardware for live events.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Global Support Agent</h4>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">Aug 2021 - June 2022</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Givergy</span>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Provided global technical support for a SaaS product, managing and prioritizing customer cases and tickets from Hong Kong, Australia, North America, and the UK.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                  <li>Delivered omni-channel technical support (email, phone, and live chat) across multiple global regions and time zones.</li>
                  <li>Earned a promotion from a casual to a permanent role by consistently managing high-volume support queues with a strong work ethic.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Tech Manager</h4>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">May 2019 - June 2023</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Givergy</span>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Setting up and monitoring computer systems and networks that run a web-based application for silent auction events. Knowledge of how to setup a LAN/WLAN for use by a group of tablets for bidding.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1">
                  <li>Selected to travel and lead on-site technical operations for high-profile events across major cities, including New York and Boston.</li>
                  <li>Built strong relationships and trust, resulting in being repeatedly requested by clients to personally manage their technical event execution.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold tracking-tight">Education</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">George Brown College</h4>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">2018 - 2021</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Computer Systems Technology - Systems Specialization</span>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Advanced three-year diploma focused on enterprise network design, systems administration, and cloud infrastructure. Gained extensive hands-on experience deploying Windows and Linux server environments, implementing cybersecurity protocols, and developing full-stack applications. Coursework heavily emphasized industry-standard technologies and certification pathways including Cisco CCNA, AWS, and Microsoft Server Administration.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Mohawk College</h4>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">2015 - 2017</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Photography - Still & Motion</span>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Two-year diploma program providing comprehensive training in commercial photography and video production. Developed technical proficiency in studio lighting, composition, digital workflow, and advanced post-processing using Adobe Creative Cloud. Gained practical experience in visual storytelling and media production for both still and motion formats.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
