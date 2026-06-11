import { ProfileCard } from "@/components/ProfileCard"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 md:p-8">
      <ProfileCard isHome={true} />
    </div>
  )
}
