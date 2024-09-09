import Image from "next/image";
import Login from '@/components/auth/loginbase'; 
import { getServerSession } from "next-auth";
import authOptions from '@/helpers/auth/main/options'; 
import SignOut from '@/components/auth/signout'; 

export default async function Home() {
  const session =  await getServerSession(authOptions);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
        {session ? (
              <Login showLogin={false} user={session.user} />
              ) : ( <Login showLogin={true}/>
            )}
          
        </div>
        <SignOut /> 
        <h1 className = "text-4xl font-bold">Diabeater</h1>
        <h2 className = "text-2xl font-semibold">Giving you the knowledge to manage your diabetes risk</h2>
      </div>
    </main>
  );
}
