import { getProfile } from "@/services/auth.service";

export default async function TestProfile() {
  const profile = await getProfile<any>();
  return <pre>{JSON.stringify(profile, null, 2)}</pre>;
}
