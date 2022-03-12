import { recentlyPlayedState } from "@atoms/feedAtom";
import { useRecoilValue } from "recoil";

function RecentlyPlayed() {
  const recentlyPlayed = useRecoilValue(recentlyPlayedState);
  console.log(recentlyPlayed);
  
  return (
    <div>RecentlyPlayed</div>
  )
}

export default RecentlyPlayed