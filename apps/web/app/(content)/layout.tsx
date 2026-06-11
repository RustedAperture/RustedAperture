import { ProfileCard } from "@/components/ProfileCard"

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row items-start justify-center gap-8 bg-muted p-4 md:p-8">
      <ProfileCard isHome={false} />
      {children}
    </div>
  )
}
