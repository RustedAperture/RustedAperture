"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { FaDownload } from "react-icons/fa6"
import { PageTransition } from "@/components/PageTransition"

export default function ResumePage() {
  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col">
      {/* Scoped style block for professional PDF print layout */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Print-only CSS classes */
        .print-only {
          display: none !important;
        }
        .print-only-flex {
          display: none !important;
        }
        .print-footer {
          display: none !important;
        }

        @media print {
          @page {
            size: letter;
            margin: 0; /* Hides browser headers and footers (Firefox/Chrome URL, date, page numbers) */
          }
          body {
            margin: 0.5cm 0.9cm !important; /* Perfect margins to pull the footer onto page 1 */
            background: white !important;
            color: black !important;
            font-size: 9.4pt !important; /* Elegant, highly readable professional font size */
            line-height: 1.32 !important;
          }
          .print-hidden {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .print-only-flex {
            display: flex !important;
          }
          .print-card {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: 0 !important;
          }
          .print-layout {
            display: block !important;
            padding: 0 !important;
            background: transparent !important;
          }
          
          /* Balanced premium gaps to fill the page perfectly without overflowing the footer */
          .resume-content {
            padding: 0 !important;
            gap: 0.5rem !important;
          }
          .print-header {
            padding-bottom: 0.35rem !important;
            margin-bottom: 0.5rem !important;
          }
          .experience-list {
            gap: 0.35rem !important;
          }
          .experience-item {
            margin-bottom: 0.35rem !important;
            page-break-inside: avoid;
            page-break-after: auto;
          }
          h3 {
            margin-top: 0.6rem !important;
            margin-bottom: 0.15rem !important;
            font-size: 11.2pt !important;
            border-bottom: 1px solid #cbd5e1 !important;
            padding-bottom: 0.04rem !important;
          }
          h4 {
            font-size: 10pt !important;
          }
          p, .leading-relaxed {
            line-height: 1.32 !important;
          }
          p, ul {
            margin-top: 0.1rem !important;
            margin-bottom: 0.1rem !important;
          }
          ul {
            padding-left: 1rem !important;
          }
          li {
            margin-bottom: 0.02rem !important;
          }
          .print-footer {
            border-top: 1px solid #cbd5e1 !important;
            padding-top: 0.3rem !important;
            margin-top: 0.55rem !important;
            display: flex !important;
            justify-content: center !important;
          }
          /* Safety override to ensure the resume never prints blank or faded */
          .animate-fade-in {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}} />

      <Card className="min-h-[600px] w-full print-card">
        <PageTransition className="flex flex-col flex-1">
          <CardHeader className="print-hidden">
          <div className="flex flex-col gap-1">
            <CardTitle>Résumé</CardTitle>
            <CardDescription>
              A detailed look at my experience and qualifications.
            </CardDescription>
          </div>
          <CardAction className="print-hidden">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 cursor-pointer"
              onClick={() => window.print()}
            >
              <FaDownload />
              Download PDF
            </Button>
          </CardAction>
        </CardHeader>
        
        <CardContent className="flex flex-col gap-6 print:gap-2 print:p-0 resume-content">
          {/* Print-only Header & Contact Details */}
          <div className="print-only-flex justify-between items-start border-b pb-3 mb-3 print-header">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">CAMERON VARLEY</h1>
              <p className="text-sm font-medium text-muted-foreground">Fullstack Engineer • RustedAperture</p>
            </div>
            <div className="flex flex-col items-end text-xs text-muted-foreground space-y-0.5 text-right">
              <div>
                <span>Thunder Bay, Ontario</span>
                <span className="mx-1.5">•</span>
                <a
                  href="mailto:cam.avarley@gmail.com"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  cam.avarley@gmail.com
                </a>
              </div>
              <div>
                <a
                  href="https://github.com/RustedAperture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  github.com/RustedAperture
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/cameron-varley-687368136/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  linkedin.com/in/cameron-varley-687368136
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 print:gap-1">
            {/* Screen-only contact details */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground print-hidden">
              <span>Thunder Bay, Ontario</span>
              <span>•</span>
              <a
                href="mailto:cam.avarley@gmail.com"
                className="hover:text-primary transition-colors"
              >
                cam.avarley@gmail.com
              </a>
            </div>

            <p className="text-muted-foreground leading-relaxed print:text-foreground">
              Results-oriented Fullstack Engineer and technical operations specialist with a proven track record of success in end-to-end web application development and infrastructure automation. Specializes in building robust solutions using Java, TypeScript, and AI-assisted development workflows. Brings extensive experience in cross-functional collaboration, from establishing CI/CD pipelines and managing Terraform environments to leading high-profile technical event operations. Recognized for a strong work ethic, adaptability, and a commitment to continuous improvement.
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-4 experience-item print:gap-1">
            <h3 className="text-lg font-semibold tracking-tight">Skills</h3>
            
            {/* Screen-only Skills (Badges) */}
            <div className="flex flex-col gap-4 print-hidden">
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
                  <Badge variant="secondary">Datadog</Badge>
                  <Badge variant="secondary">Shortcut</Badge>
                  <Badge variant="secondary">Jira</Badge>
                </div>
              </div>
            </div>

            {/* Print-only Skills (Comma-separated list) */}
            <div className="print-only text-sm text-muted-foreground space-y-0.5 print:text-foreground">
              <p><strong>Languages:</strong> HTML, CSS, Javascript, Typescript, Java</p>
              <p><strong>Tools:</strong> Agentic Development, AI-Assisted Development, Git, Terraform, Postman</p>
              <p><strong>Platforms:</strong> Github, Bitbucket, GCP, Datadog, Shortcut, Jira</p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="flex flex-col gap-4 print:gap-1">
            <h3 className="text-lg font-semibold tracking-tight">Work Experience</h3>
            <div className="flex flex-col gap-4 print:gap-2 experience-list">
              
              <div className="flex flex-col gap-1 experience-item">
                {/* Screen Header */}
                <div className="print-hidden flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Fullstack Engineer</h4>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">Feb 2025 - Present</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">momoGood (formerly Givergy)</span>
                </div>
                {/* Print Header */}
                <div className="print-only-flex items-baseline gap-1.5 font-medium text-sm">
                  <span>Fullstack Engineer <span className="text-muted-foreground font-normal">@ momoGood (formerly Givergy)</span></span>
                  <span className="text-muted-foreground text-xs font-normal">•</span>
                  <span className="text-xs text-muted-foreground font-normal">Feb 2025 - Present</span>
                </div>
                
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed print-hidden">
                  Fullstack Engineer building end-to-end applications with Java and TypeScript. Promoted from Junior Fullstack Developer after one year of consistent, high-impact contributions. Specialize in resolving complex bugs and building out new features, utilizing Claude Code to navigate codebases quickly and ensure solutions are robust and well-tested.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1 print-hidden">
                  <li>Shipped multiple high-impact, user-facing features.</li>
                  <li>Built GitHub CI/CD pipelines, driving the engineering team towards automated workflows.</li>
                  <li>Assisted with managing and provisioning the Terraform infrastructure environment.</li>
                  <li>Selected to participate in the interview and hiring process for the Senior Project Manager following the company acquisition.</li>
                </ul>
                <p className="print-only mt-2 text-sm print:text-foreground leading-relaxed">
                  Fullstack Engineer building robust, end-to-end applications with Java and TypeScript, promoted from Junior Developer in recognition of consistent, high-impact contributions. Specializes in rapid bug resolution and shipping major user-facing features. Engineered automated GitHub CI/CD pipelines to streamline engineering workflows, assisted in managing and provisioning cloud infrastructure via Terraform, and selected to represent the engineering team on the post-acquisition Senior Project Manager hiring panel.
                </p>
              </div>

              <div className="flex flex-col gap-1 experience-item">
                {/* Screen Header */}
                <div className="print-hidden flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Event and Product Support Specialist</h4>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">June 2022 - Feb 2025</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Givergy</span>
                </div>
                {/* Print Header */}
                <div className="print-only-flex items-baseline gap-1.5 font-medium text-sm">
                  <span>Event and Product Support Specialist <span className="text-muted-foreground font-normal">@ Givergy</span></span>
                  <span className="text-muted-foreground text-xs font-normal">•</span>
                  <span className="text-xs text-muted-foreground font-normal">June 2022 - Feb 2025</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed print-hidden">
                  Event delivery and support for North American on-site staff, ensuring a smooth event process. Platform quality assurance through testing and bug coordination with the development team.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1 print-hidden">
                  <li>Managed the internal Learning Management System (LMS) and facilitated training for client-facing staff across two external partner agencies.</li>
                  <li>Coordinated the logistics and delivery of technology hardware for live events.</li>
                </ul>
                <p className="print-only mt-2 text-sm print:text-foreground leading-relaxed">
                  Led event technology delivery and support for North American staff to ensure seamless execution. Conducted rigorous platform quality assurance, coordinating directly with the development team for bug resolution. Managed the internal Learning Management System (LMS) to train client-facing teams across two external partner agencies, and supervised the complex logistics and distribution of hardware for live events.
                </p>
              </div>

              <div className="flex flex-col gap-1 experience-item">
                {/* Screen Header */}
                <div className="print-hidden flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Global Support Agent</h4>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">Aug 2021 - June 2022</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Givergy</span>
                </div>
                {/* Print Header */}
                <div className="print-only-flex items-baseline gap-1.5 font-medium text-sm">
                  <span>Global Support Agent <span className="text-muted-foreground font-normal">@ Givergy</span></span>
                  <span className="text-muted-foreground text-xs font-normal">•</span>
                  <span className="text-xs text-muted-foreground font-normal">Aug 2021 - June 2022</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed print-hidden">
                  Provided global technical support for a SaaS product, managing and prioritizing customer cases and tickets from Hong Kong, Australia, North America, and the UK.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1 print-hidden">
                  <li>Delivered omni-channel technical support (email, phone, and live chat) across multiple global regions and time zones.</li>
                  <li>Earned a promotion from a casual to a permanent role by consistently managing high-volume support queues with a strong work ethic.</li>
                </ul>
                <p className="print-only mt-2 text-sm print:text-foreground leading-relaxed">
                  Provided high-volume global technical support for a SaaS product, managing omni-channel customer cases (email, phone, live chat) across Hong Kong, Australia, North America, and the UK. Consistently met rigorous queue response metrics, earning a rapid promotion from a casual to a permanent position by demonstrating exceptional adaptability and a strong work ethic.
                </p>
              </div>

              <div className="flex flex-col gap-1 experience-item">
                {/* Screen Header */}
                <div className="print-hidden flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Tech Manager</h4>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">May 2019 - June 2023</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Givergy</span>
                </div>
                {/* Print Header */}
                <div className="print-only-flex items-baseline gap-1.5 font-medium text-sm">
                  <span>Tech Manager <span className="text-muted-foreground font-normal">@ Givergy</span></span>
                  <span className="text-muted-foreground text-xs font-normal">•</span>
                  <span className="text-xs text-muted-foreground font-normal">May 2019 - June 2023</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed print-hidden">
                  Setting up and monitoring computer systems and networks that run a web-based application for silent auction events. Knowledge of how to setup a LAN/WLAN for use by a group of tablets for bidding.
                </p>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground space-y-1 print-hidden">
                  <li>Selected to travel and lead on-site technical operations for high-profile events across major cities, including New York and Boston.</li>
                  <li>Built strong relationships and trust, resulting in being repeatedly requested by clients to personally manage their technical event execution.</li>
                </ul>
                <p className="print-only mt-2 text-sm print:text-foreground leading-relaxed">
                  Supervised the deployment and monitoring of complex local networks (LAN/WLAN) and computer systems hosting web-based applications for live silent auctions. Selected to travel and lead on-site technical operations for high-profile events in major cities including New York and Boston, building deep client trust that resulted in repeated requests for personal event execution.
                </p>
              </div>

            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-4 print:gap-1">
            <h3 className="text-lg font-semibold tracking-tight">Education</h3>
            <div className="flex flex-col gap-4 print:gap-2 experience-list">
              
              <div className="flex flex-col gap-1 experience-item">
                {/* Screen Header */}
                <div className="print-hidden flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">George Brown College</h4>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">2018 - 2021</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Computer Systems Technology - Systems Specialization</span>
                </div>
                {/* Print Header */}
                <div className="print-only-flex items-baseline gap-1.5 font-medium text-sm">
                  <span>Computer Systems Technology <span className="text-muted-foreground font-normal">@ George Brown College</span></span>
                  <span className="text-muted-foreground text-xs font-normal">•</span>
                  <span className="text-xs text-muted-foreground font-normal">2018 - 2021</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed print:text-foreground">
                  Advanced three-year diploma focused on enterprise network design, systems administration, and cloud infrastructure. Gained extensive hands-on experience deploying Windows and Linux server environments, implementing cybersecurity protocols, and developing full-stack applications. Coursework heavily emphasized industry-standard technologies and certification pathways including Cisco CCNA, AWS, and Microsoft Server Administration.
                </p>
              </div>

              <div className="flex flex-col gap-1 experience-item print-hidden">
                {/* Screen Header */}
                <div className="print-hidden flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Mohawk College</h4>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">2015 - 2017</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Photography - Still & Motion</span>
                </div>
                {/* Print Header */}
                <div className="print-only-flex items-baseline gap-1.5 font-medium text-sm">
                  <span>Photography - Still & Motion <span className="text-muted-foreground font-normal">@ Mohawk College</span></span>
                  <span className="text-muted-foreground text-xs font-normal">•</span>
                  <span className="text-xs text-muted-foreground font-normal">2015 - 2017</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed print:text-foreground">
                  Two-year diploma program providing comprehensive training in commercial photography and video production. Developed technical proficiency in studio lighting, composition, digital workflow, and advanced post-processing using Adobe Creative Cloud. Gained practical experience in visual storytelling and media production for both still and motion formats.
                </p>
              </div>

            </div>
          </div>

          {/* Footer Link */}
          <div className="flex justify-center border-t pt-4 mt-2 print-footer">
            <p className="text-xs text-muted-foreground print:text-foreground text-center">
              Read more about me at{" "}
              <a
                href="https://camvarley.xyz/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline print:text-foreground print:underline"
              >
                camvarley.xyz/resume
              </a>
            </p>
          </div>
        </CardContent>
      </PageTransition>
    </Card>
  </div>
  )
}
