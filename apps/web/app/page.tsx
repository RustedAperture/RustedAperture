import { ProfileCard } from "@/components/ProfileCard"
import { PageTransition } from "@/components/PageTransition"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 md:p-8">
      <PageTransition className="w-full max-w-sm flex justify-center">
        <ProfileCard isHome={true} />
      </PageTransition>
    </div>
  )
}
