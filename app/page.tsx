import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    return <Guest />;
  }

  return <div>HomePage</div>;
};

export default HomePage;
