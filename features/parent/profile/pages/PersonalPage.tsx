import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditProfileForm from "@/features/parent/profile/forms/EditProfileForm";
import type { UpdateProfileFormValues } from "@/lib/validations/profile";

type PersonalInfoSectionProps = {
  profile: UpdateProfileFormValues;
};

export default function PersonalInfoSection({
  profile,
}: PersonalInfoSectionProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background sticky top-0 z-10 relative">
        <Link
          href="/profile"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </Link>

        <h1 className="text-[22px] leading-[32px] tracking-[-0.24px] font-bold text-btn-primary w-full text-center">
          Informasi Pribadi
        </h1>
      </div>

      <div className="px-6 pb-8 pt-2">
        <EditProfileForm defaultValues={profile} />
      </div>
    </div>
  );
}
